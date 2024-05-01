'use server'

import { Prisma } from '@prisma/client'

import db from '@/lib/db'
import { handleError } from '@/lib/utils'

export async function createUser(user: Prisma.UserUncheckedCreateInput) {
  try {
    const newUser = await db.user.create({
      data: user,
    })
    return newUser
  } catch (error) {
    handleError(error)
  }
}

export async function getUserByClerkId(clerkid: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerk_id: clerkid,
      },
    })

    if (!user) throw new Error('User not found!!')
    return user
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(
  clerkid: string,
  user: Prisma.UserUncheckedUpdateInput
) {
  try {
    const updatedUser = await db.user.update({
      where: {
        clerk_id: clerkid,
      },
      data: user,
    })
    if (!updatedUser) throw new Error('User update failed')
    return updatedUser
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkid: string) {
  try {
    const userToDelete = await db.user.findUnique({
      where: {
        clerk_id: clerkid,
      },
    })
    if (!userToDelete) throw new Error('No User Found')

    const deletedUser = await db.user.delete({
      where: {
        clerk_id: clerkid,
      },
    })
  } catch (error) {
    handleError(error)
  }
}
