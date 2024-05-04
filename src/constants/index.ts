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

export const agencySidebarOptions = [
  {
    name: 'Dashboard',
    icon: 'category',
    link: ``,
  },
  {
    name: 'Launchpad',
    icon: 'clipboardIcon',
    link: `/launchpad`,
  },
  {
    name: 'Billing',
    icon: 'payment',
    link: `/billing`,
  },
  {
    name: 'Settings',
    icon: 'settings',
    link: `/settings`,
  },
  {
    name: 'Sub Accounts',
    icon: 'person',
    link: `/all-subaccounts`,
  },
  {
    name: 'Team',
    icon: 'shield',
    link: `/team`,
  },
]
