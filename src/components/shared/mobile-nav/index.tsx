import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import NavMenu from './nav-menu'
import { Button } from '@/components/ui/button'

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
