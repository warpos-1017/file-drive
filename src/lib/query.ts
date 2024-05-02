'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'

import db from '@/lib/db'
import { handleError } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'

export const getAuthUserDetails = async () => {
  const user = await currentUser()
  if (!user) return

  try {
    const userData = await db.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      include: {
        Agency: {
          include: {
            sidebarOptions: true,
            subaccounts: {
              include: {
                sidebarOptions: true,
              },
            },
          },
        },
        permissions: true,
      },
    })

    return userData
  } catch (error) {
    handleError(error)
  }
}

export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subaccountId,
}: {
  agencyId?: string
  description: string
  subaccountId?: string
}) => {
  const authUser = await currentUser()
  try {
    let userData
    if (!authUser) {
      const someUser = await db.user.findFirst({
        where: {
          Agency: {
            subaccounts: {
              some: { id: subaccountId },
            },
          },
        },
      })
      if (someUser) {
        userData = someUser
      }
    } else {
      userData = await db.user.findUnique({
        where: { clerk_id: authUser.id },
      })
    }
    if (!userData) {
      console.log('Cannot find a user')
      return
    }

    let foundAgencyId = agencyId
    if (!foundAgencyId) {
      if (!subaccountId) {
        throw new Error(
          'You need to provide atleast an agency Id or subaccount Id'
        )
      }
      const foundSubaccount = await db.subaccount.findUnique({
        where: { id: subaccountId },
      })
      if (foundSubaccount) {
        foundAgencyId = foundSubaccount.agencyId
      }
    }
    if (subaccountId) {
      await db.notification.create({
        data: {
          notification: `${userData.name} | ${description}`,
          User: {
            connect: {
              id: userData.id,
            },
          },
          Agency: {
            connect: {
              id: foundAgencyId,
            },
          },
          Subaccount: {
            connect: {
              id: subaccountId,
            },
          },
        },
      })
    } else {
      await db.notification.create({
        data: {
          notification: `${userData.name} | ${description}`,
          User: {
            connect: {
              id: userData.id,
            },
          },
          Agency: {
            connect: {
              id: foundAgencyId,
            },
          },
        },
      })
    }
  } catch (error) {
    handleError(error)
  }
}

export const createTeamUser = async (
  agencyId: string,
  user: Prisma.UserUncheckedCreateInput
) => {
  if (user.role === 'AGENCY_OWNER') return null
  const upsertUser = await db.user.upsert({
    where: { email: user.email },
    update: { role: user.role, agencyId: user.agencyId },
    create: { ...user },
  })
  return upsertUser
}

export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  try {
    const invitationExists = await db.invitation.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
        status: 'PENDING',
      },
    })
    if (invitationExists) {
      // WIP: 'user' should be created by clerk webhook...
      const userDetails = await createTeamUser(invitationExists.agencyId, {
        clerk_id: user.id,
        email: invitationExists.email,
        photo: user.imageUrl,
        name: `${user.firstName} ${user.lastName}`,
        // WIP: 'username' comes from clerk, is it necessary for local database??
        username: user.username!,
        role: invitationExists.role,
        agencyId: invitationExists.agencyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Send notification to Agency that some user accept invitation and joined
      await saveActivityLogsNotification({
        agencyId: invitationExists.agencyId,
        description: 'Joined',
        subaccountId: undefined,
      })

      // Save role data to clerk, possible for quick user role verification
      if (userDetails) {
        await clerkClient.users.updateUserMetadata(user.id, {
          privateMetadata: {
            role: userDetails.role || 'SUBACCOUNT_USER',
          },
        })
        await db.invitation.delete({
          where: {
            email: userDetails.email,
          },
        })
        return userDetails?.agencyId
      } else return null
    } else {
      const agency = await db.user.findUnique({
        where: {
          clerk_id: user.id,
          // email: user.emailAddresses[0].emailAddress,
        },
      })
      return agency ? agency.agencyId : null
    }
  } catch (error) {
    handleError(error)
  }
}
