import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/query'
import AgencyDetails from '@/components/forms/agency-details'

type Plan = 'price_1OYxkqFj9oKEERu1NbKUxXxN' | 'price_1OYxkqFj9oKEERu1KfJGWxgN'

type AgencyPageProps = {
  searchParams: {
    plan: Plan
    state: string
    code: string
  }
}

const AgencyPage = async ({ searchParams }: AgencyPageProps) => {
  const agencyId = await verifyAndAcceptInvitation()
  console.log(agencyId)

  const user = await getAuthUserDetails()
  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') {
      return redirect('/subaccount')
    } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split('___')[0]
        const stateAgencyId = searchParams.state.split('___')[1]
        if (!stateAgencyId) return <div>Not authorized</div>
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        )
      } else return redirect(`/agency/${agencyId}`)
    } else {
      return <div>Not authorized</div>
    }
  }
  const authUser = await currentUser()

  return (
    <main className='min-h-screen flex justify-center items-center mt-4'>
      <div className='max-w-[850px] border-[1px] p-4 rounded-xl'>
        <h1 className='text-4xl'> Create An Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </main>
  )
}

export default AgencyPage
