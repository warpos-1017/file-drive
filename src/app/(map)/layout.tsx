import { PropsWithChildren } from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import MobileNav from '@/components/shared/mobile-nav'
import Sidebar from '@/components/shared/sidebar'
import OrdersList from './_components/orders-list'

const Layout = async ({ children }: PropsWithChildren) => {
  // const user = await currentUser()
  // if (!user) return redirect('/sign-in')

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='root'>
        <Sidebar />
        <MobileNav />
        <div className='map-container flex-1'>
          <OrdersList />
          <div className='map border-border border flex-center flex-1'>
            {children}
          </div>
        </div>
      </main>
    </ClerkProvider>
  )
}

export default Layout
