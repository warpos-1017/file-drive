'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

import db from '@/lib/db'

export const upsertUser = async (newUser: Prisma.UserUncheckedCreateInput) => {
  const user = await db.user.upsert({
    where: {
      clerk_id: newUser.clerk_id,
    },
    update: newUser,
    create: {
      ...newUser,
      role: newUser.role || 'SUBACCOUNT_USER',
    },
  })

  await clerkClient.users.updateUserMetadata(user.clerk_id, {
    privateMetadata: {
      role: user.role || 'SUBACCOUNT_USER',
    },
  })

  return user
}
