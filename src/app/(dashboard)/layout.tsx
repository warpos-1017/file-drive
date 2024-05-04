import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { currentUser } from '@clerk/nextjs/server'

import MobileNav from '@/components/shared/mobile-nav'
import Sidebar from '@/components/shared/sidebar'

const Layout = async ({ children }: PropsWithChildren) => {
  // const user = await currentUser()
  // if (!user) return redirect('/sign-in')

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='root'>
        {/* <Sidebar /> */}
        <MobileNav />
        <div className='root-container'>
          <div className='wrapper'>{children}</div>
        </div>
      </main>
    </ClerkProvider>
  )
}

export default Layout
