'use server'

import { v4 as uuidv4 } from 'uuid'

import db from '@/lib/db'
import { Prisma, Subaccount } from '@prisma/client'

export const upsertSubaccount = async (
  subaccount: Prisma.SubaccountUncheckedCreateInput
  // subaccount: Subaccount
) => {
  if (!subaccount.companyEmail) {
    return { error: 'Require a legal company email' }
  }

  const agencyOwner = await db.user.findFirst({
    where: {
      Agency: {
        id: subaccount.agencyId,
      },
      role: 'AGENCY_OWNER',
    },
  })
  if (!agencyOwner) {
    return { error: 'No Agency owner found' }
  }

  try {
    const permissionId = uuidv4()
    const newSubaccount = await db.subaccount.upsert({
      where: { id: subaccount.id },
      update: subaccount,
      create: {
        ...subaccount,
        permissions: {
          create: {
            access: true,
            email: agencyOwner.email,
            id: permissionId,
          },
          connect: {
            subaccountId: subaccount.id,
            id: permissionId,
          },
        },
        sidebarOptions: {
          create: [
            {
              name: 'Launchpad',
              icon: 'clipboardIcon',
              link: `/subaccount/${subaccount.id}/launchpad`,
            },
            {
              name: 'Settings',
              icon: 'settings',
              link: `/subaccount/${subaccount.id}/settings`,
            },
            {
              name: 'Funnels',
              icon: 'pipelines',
              link: `/subaccount/${subaccount.id}/funnels`,
            },
            {
              name: 'Media',
              icon: 'database',
              link: `/subaccount/${subaccount.id}/media`,
            },
            {
              name: 'Automations',
              icon: 'chip',
              link: `/subaccount/${subaccount.id}/automations`,
            },
            {
              name: 'Pipelines',
              icon: 'flag',
              link: `/subaccount/${subaccount.id}/pipelines`,
            },
            {
              name: 'Contacts',
              icon: 'person',
              link: `/subaccount/${subaccount.id}/contacts`,
            },
            {
              name: 'Dashboard',
              icon: 'category',
              link: `/subaccount/${subaccount.id}`,
            },
          ],
        },
      },
    })
    if (!newSubaccount) return { error: 'Subaccount cannot create!' }
    return { success: 'Subaccount created!', subaccount: newSubaccount }
  } catch (error) {
    console.log(error)
    throw error
  }
}
