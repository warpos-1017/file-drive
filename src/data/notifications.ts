'use server'

import db from '@/lib/db'

export const getNotificationsAndUser = async (agencyId: string) => {
  try {
    const notificaions = await db.notification.findMany({
      where: { agencyId },
      include: { User: true },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return notificaions
  } catch (error) {
    console.log(error)
    return null
  }
}
