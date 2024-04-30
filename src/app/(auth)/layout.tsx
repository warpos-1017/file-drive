import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return <main className='auth bg-gradient'>{children}</main>
}

export default Layout
