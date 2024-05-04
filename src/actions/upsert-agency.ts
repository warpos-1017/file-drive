'use server'

import { currentUser } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

import { upsertUser } from '@/actions/shared'
import db from '@/lib/db'

export const upsertAgency = async (
  agency: Prisma.AgencyUncheckedCreateInput
) => {
  const user = await currentUser()
  if (!user) return { error: 'Not authorized!' }

  const userData = await upsertUser({
    clerk_id: user.id,
    photo: user.imageUrl,
    username: user.username!,
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName} ${user.lastName}`,
    role: 'AGENCY_OWNER',
  })
  if (!userData) return { error: 'Can not update user' }

  if (!agency.companyEmail || agency.companyEmail !== userData.email) {
    return { error: 'Not a legal company email' }
  }

  try {
    const agencyDetails = await db.agency.upsert({
      where: { id: agency.id },
      update: { ...agency },
      create: {
        users: {
          connect: { email: agency.companyEmail },
        },
        ...agency,
        sidebarOptions: {
          create: [
            {
              name: 'Dashboard',
              icon: 'category',
              link: `/agency/${agency.id}`,
            },
            {
              name: 'Launchpad',
              icon: 'clipboardIcon',
              link: `/agency/${agency.id}/launchpad`,
            },
            {
              name: 'Billing',
              icon: 'payment',
              link: `/agency/${agency.id}/billing`,
            },
            {
              name: 'Settings',
              icon: 'settings',
              link: `/agency/${agency.id}/settings`,
            },
            {
              name: 'Sub Accounts',
              icon: 'person',
              link: `/agency/${agency.id}/all-subaccounts`,
            },
            {
              name: 'Team',
              icon: 'shield',
              link: `/agency/${agency.id}/team`,
            },
          ],
        },
      },
    })
    if (agencyDetails) return { success: 'Agency Upserted!' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong!' }
  }
}
