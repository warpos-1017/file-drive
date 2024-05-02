'use server'

import db from '@/lib/db'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
import { emit } from 'process'

export const upsertAgency = async (
  agency: Prisma.AgencyUncheckedCreateInput
) => {
  const user = await currentUser()
  if (!user) return { error: 'Not authorized!' }

  try {
    await db.user.update({
      where: { clerk_id: user.id },
      data: { role: 'AGENCY_OWNER' },
    })

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        role: 'AGENCY_OWNER',
      },
    })

    const agencyDetails = await db.agency.upsert({
      where: { id: agency.id },
      update: { ...agency },
      create: {
        users: {
          connect: { email: agency.companyEmail },
        },
        ...agency,
      },
    })
    if (agencyDetails) return { success: 'Agency Created!' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong!' }
  }
}
