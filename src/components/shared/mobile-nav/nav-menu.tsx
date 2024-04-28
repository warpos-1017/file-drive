'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navLinks } from '@/constants'
import { cn } from '@/lib/utils'

const NavMenu = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className='h-screen w-72'>
        <SheetClose>
          <Image src='/images/logo-hz.png' alt='logo' width='152' height='24' />
          <ul className='mt-8'>
            {navLinks.map((link) => {
              const isActive = pathname === link.route
              return (
                <li
                  key={link.route}
                  className={cn(`p-18`, {
                    'gradient-text': isActive,
                  })}
                >
                  <Link href={link.route} className='sidebar-link items-center'>
                    {link.iconType === 'svg' ? (
                      <Image
                        src={link.icon as string}
                        alt='logo'
                        width={25}
                        height={25}
                        className={``}
                      />
                    ) : (
                      // <div className='rounded-lg bg-purple-100 border-none'>
                      <link.icon className='w-5 h-5 text-gray-700' />
                      // </div>
                    )}
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default NavMenu
