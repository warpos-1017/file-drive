// import Navigation from '@/components/site/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
import Navigation from './_components/navgtion'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='h-screen'>
        <Navigation />
        {children}
      </main>
    </ClerkProvider>
  )
}

export default layout
