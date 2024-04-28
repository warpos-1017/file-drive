import { cn } from '@/lib/utils'
import Link from 'next/link'

const Sidebar = () => {
  const isActive = true
  return (
    <ul className='hidden xl:block h-full w-[240px] font-medium space-y-1'>
      <li
        className={cn(`cursor-pointer setting-nav_element`, {
          'bg-slate-200 text-slate-600 hover:bg-slate-300': isActive,
        })}
      >
        <Link href=''>Profile</Link>
      </li>
      <li
        className={cn(`setting-nav_element`, {
          'bg-purple-gradient text-white': false,
        })}
      >
        Account
      </li>
      <li
        className={cn(`setting-nav_element`, {
          'bg-purple-gradient text-white': false,
        })}
      >
        Subaccount
      </li>
    </ul>
  )
}

export default Sidebar
