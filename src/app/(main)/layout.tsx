import MobileNav from '@/components/shared/mobile-nav'
import Sidebar from '@/components/shared/sidebar'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
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
