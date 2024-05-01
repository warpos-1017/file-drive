import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const AgencyPage = async () => {
  const authUser = await currentUser()
  if (!authUser) redirect('/sign-in')
  return <div>Agency</div>
}

export default AgencyPage
