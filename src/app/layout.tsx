import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/toaster'

const IBMPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
})

export const metadata: Metadata = {
  title: 'Ur Fleet',
  description: 'Boost your fleet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <ClerkProvider appearance={{ baseTheme: dark }}>
    <html lang='en' suppressHydrationWarning>
      <body className={cn('font-IBMPlex antialiased', IBMPlex.variable)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>{children}</ModalProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
    // </ClerkProvider>
  )
}
