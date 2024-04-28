import {
  Coins,
  DollarSign,
  LucideIcon,
  Settings,
  User,
  Users,
} from 'lucide-react'

export const navLinks: Array<{
  label: string
  route: string
  iconType: 'svg' | 'icon'
  icon: string | LucideIcon
}> = [
  {
    label: 'Home',
    route: '/',
    iconType: 'svg',
    icon: '/icons/home.svg',
  },
  {
    label: 'Tracking Orders',
    route: '/orders',
    iconType: 'svg',
    icon: '/icons/coins.svg',
  },
  {
    label: 'Assets Monitoring',
    route: '/assets',
    iconType: 'svg',
    icon: '/icons/bag.svg',
  },
  {
    label: 'Team Management',
    route: '/team',
    iconType: 'icon',
    // icon: '/icons/stars.svg',
    icon: Users,
  },
  {
    label: 'Settings',
    route: '/settings',
    iconType: 'icon',
    // icon: '/icons/profile.svg',
    icon: Settings,
  },
  {
    label: 'Billing',
    route: '/billing',
    iconType: 'icon',
    icon: DollarSign,
  },
]
