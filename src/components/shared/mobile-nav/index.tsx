import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/shared/mode-toggle'

import NavMenu from './nav-menu'

const MobileNav = () => {
  return (
    <header className='header'>
      <Link href='' className='flex items-center px-2'>
        <Image src='/images/logo-hz.png' alt='logo' width={180} height={28} />
      </Link>
      <nav className='flex gap-2'>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
          <NavMenu />
          <ModeToggle />
        </SignedIn>
        <SignedOut>
          <Button asChild className='button bg-purple-gradient bg-cover'>
            <Link href='/sign-in'>Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav
