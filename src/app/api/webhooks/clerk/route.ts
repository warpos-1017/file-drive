import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { emailAddresses } from '@clerk/nextjs/api'
import { use } from 'react'
import { clerkClient } from '@clerk/nextjs'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  //get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  const payload = req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      svix_timestamp: svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Get event ID and type
  const { id } = evt.data
  const evtType = evt.type

  if (!id) {
    console.log('Cannot receive correct data from clerk webhook')
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Create
  if (evtType === 'user.created') {
    const { email_addresses, image_url, first_name, last_name, username } =
      evt.data

    const newUser = await createUser({
      clerk_id: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    })

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id,
        },
      })
    }
    return NextResponse.json({ message: 'OK', user: newUser })
  }

  if (evtType === 'user.updated') {
    const { image_url, first_name, last_name, username } = evt.data

    const updatedUser = await updateUser(id, {
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    })
    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (evtType === 'user.deleted') {
    const deletedUser = await deleteUser(id)

    return NextResponse.json({ message: 'OK', user: deletedUser })
  }

  // Nothing happened while other webhooks
  console.log(`Webhook with and ID of ${id} and type of ${evtType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}
