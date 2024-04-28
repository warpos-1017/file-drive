import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'

import MobileNav from '@/components/shared/mobile-nav'
import Sidebar from '@/components/shared/sidebar'

const Layout = async ({ children }: PropsWithChildren) => {
  // const user = await currentUser()
  // if (!user) return redirect('/sign-in')

  return (
    <main className='root'>
      <Sidebar />
      <MobileNav />
      <div className='root-container'>
        <div className='wrapper'>{children}</div>
      </div>
    </main>
  )
}

export default Layout
