'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

import { navLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Props = {}

const Sidebar = (props: Props) => {
  const pathname = usePathname()
  return (
    <aside className='sidebar'>
      <div className='flex flex-col size-full gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image
            src='/images/logo-hz.png'
            alt='Ur Very Fleet'
            width={180}
            height={72}
          />
        </Link>
        <nav className='sidebar-nav'>
          <ul className='sidebar-nav_elements'>
            {navLinks.slice(0, 4).map((link) => {
              const isActive = pathname === link.route
              return (
                <li
                  key={link.route}
                  className={cn(`sidebar-nav_element group text-gray-700`, {
                    'bg-purple-gradient text-white': isActive,
                  })}
                >
                  <Link href={link.route} className='sidebar-link items-center'>
                    {link.iconType === 'svg' ? (
                      <Image
                        src={link.icon as string}
                        alt='logo'
                        width={25}
                        height={25}
                        className={`${isActive && 'brightness-200'}`}
                      />
                    ) : (
                      // <div className='rounded-lg bg-purple-100 border-none'>
                      <link.icon className='w-5 h-5' />
                      // </div>
                    )}
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <ul className='sidebar-nav_elements'>
            {navLinks.slice(4).map((link) => {
              const isActive = pathname === link.route
              return (
                <li
                  key={link.route}
                  className={cn(`sidebar-nav_element group text-gray-700`, {
                    'bg-purple-gradient text-white': isActive,
                  })}
                >
                  <Link href={link.route} className='sidebar-link items-center'>
                    {link.iconType === 'svg' ? (
                      <Image
                        src={link.icon as string}
                        alt='logo'
                        width={25}
                        height={25}
                        className={`${isActive && 'brightness-200'}`}
                      />
                    ) : (
                      // <div className='rounded-lg p-1 bg-rose-100 border-none'>
                      <link.icon className='w-5 h-5' fill='#80fe00' />
                      // </div>
                    )}
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className='px-4 py-2.5 cursor-pointer flex-center gap-2'>
              <UserButton afterSignOutUrl='/' showName />
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
