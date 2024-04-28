import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const MobileNav = () => {
  const isActive = true
  return (
    <ul className='xl:hidden w-full flex font-medium space-x-1.5'>
      <li
        className={cn(`cursor-pointer py-1 px-2.5 group text-gray-700`, {
          'bg-purple-400 text-white shadow-sm rounded-sm': isActive,
        })}
      >
        <Link href=''>Profile</Link>
      </li>
      <li
        className={cn(`cursor-pointer py-1 px-2.5 group text-gray-700`, {
          'bg-purple-gradient text-white shadow-md rounded-lg': false,
        })}
      >
        Account
      </li>
      <li
        className={cn(`cursor-pointer py-1 px-2.5 group text-gray-700`, {
          'bg-purple-gradient text-white shadow-md rounded-lg': false,
        })}
      >
        Subaccount
      </li>
    </ul>
  )
}

export default MobileNav
