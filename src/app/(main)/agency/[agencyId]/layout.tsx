import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { verifyAndAcceptInvitation } from '@/lib/query'
import Unauthorized from '@/components/shared/unauthorized'
import Sidebar from '@/components/shared/sidebar'
import { getNotificationsAndUser } from '@/data/notifications'

type Props = {
  params: { agencyId: string }
}

const layout = async ({ params }: Props) => {
  const user = await currentUser()
  if (!user) return redirect('/')

  const agencyId = await verifyAndAcceptInvitation()
  if (!agencyId) return redirect('/')

  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  )
    return <Unauthorized />

  const allNotis = (await getNotificationsAndUser(params.agencyId)) || []
  return (
    <main className='h-screen flex'>
      <Sidebar id={params.agencyId} type='agency' />
      <div className='md:ml-[300px]'>Infobar & Content</div>
    </main>
  )
}

export default layout
