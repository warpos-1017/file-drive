import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='root'>
        <div className=''>{children}</div>
      </main>
    </ClerkProvider>
  )
}

export default Layout
