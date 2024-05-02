import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='auth bg-gradient'>{children}</main>
    </ClerkProvider>
  )
}

export default Layout
