import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='auth bg-gradient'>{children}</main>
    </ClerkProvider>
  )
}

export default Layout
