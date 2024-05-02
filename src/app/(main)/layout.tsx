import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
  )
}

export default Layout
