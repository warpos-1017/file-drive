'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'

import { ChevronsUpDown, Compass, Menu, PlusCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Agency,
  AgencySidebarOption,
  Subaccount,
  SubaccountSidebarOption,
  User,
} from '@prisma/client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useModal } from '@/providers/modal-provider'
import CustomModal from '@/components/shared/custom-modal'
import SubaccountDetails from '@/components/forms/subaccount-details'
import { Separator } from '@/components/ui/separator'
import { icons } from '@/lib/constants'

type MenuOptionsProps = {
  defaultOpen?: boolean
  subAccounts: Subaccount[]
  sidebarOpts: AgencySidebarOption[] | SubaccountSidebarOption[]
  sidebarLogo: string
  details: Agency | Subaccount
  user: any
  id: string
}

const MenuOptions = ({
  defaultOpen,
  user,
  id,
  details,
  sidebarLogo,
  sidebarOpts,
  subAccounts,
}: MenuOptionsProps) => {
  const { setOpen } = useModal()
  const openState = useMemo(() => {
    return defaultOpen ? { open: true } : {}
  }, [defaultOpen])

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className='absolute top-4 left-4 z-[100] md:!hidden'
      >
        <Button variant='outline' size='icon'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side='left'
        className={cn(
          'bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6',
          {
            'hidden md:inline-block z-0 w-[300px]': defaultOpen,
            'inline-block md:hidden z-[100] w-full': !defaultOpen,
          }
        )}
      >
        <AspectRatio ratio={16 / 5}>
          <Image
            src={sidebarLogo}
            alt='Sidebar Logo'
            fill
            className='rounded-md object-contain'
          />
        </AspectRatio>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              className='w-full flex items-center justify-between my-4 py-8 rounded-sm'
            >
              <div className='flex items-center text-left gap-2'>
                <Compass />
                <div className='flex flex-col'>
                  {details.name}
                  <span className='text-xs text-muted-foreground'>
                    {details.address}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className='w-4 h-4 text-muted-foreground' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-80 h-80 mt-4 z-[200]'>
            {
              <Command>
                <CommandInput placeholder='Search Accounts' />
                <CommandList>
                  <CommandEmpty>No accounts found!</CommandEmpty>
                  {(user?.role === 'AGENCY_OWNER' ||
                    user?.role === 'AGNECY_ADMIN') &&
                    user.Agency && (
                      <CommandGroup heading='Agency'>
                        <CommandItem className='!bg-transparent my-2 border-border p-2 rounded-md hover:!bg-muted transition-all'>
                          {defaultOpen ? (
                            <Link
                              href={`/agency/${user.Agency.id}`}
                              className='flex gap-4 w-full h-full'
                            >
                              <div className='relative w-16'>
                                <Image
                                  src={`${user?.Agency?.agencyLogo}`}
                                  alt='Agency Logo'
                                  fill
                                  className='rounded-md object-contain'
                                />
                              </div>
                              <div className='flex flex-col flex-1'>
                                {user?.Agency?.name}
                                <span className='text-muted-foreground'>
                                  {user?.Agency?.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/agency/${user.Agency.id}`}
                                className='flex gap-4 w-full h-full'
                              >
                                <div className='relative w-16'>
                                  <Image
                                    src={`${user?.Agency?.agencyLogo}`}
                                    alt='Agency Logo'
                                    fill
                                    className='rounded-md object-contain'
                                  />
                                </div>
                                <div className='flex flex-col flex-1'>
                                  {user?.Agency?.name}
                                  <span className='text-muted-foreground'>
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      </CommandGroup>
                    )}
                  <CommandGroup heading='Accounts'>
                    {!!subAccounts
                      ? subAccounts.map((subaccount) => (
                          <CommandItem key={subaccount.id} className=''>
                            {defaultOpen ? (
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className='flex gap-4 w-full h-full'
                              >
                                <div className='relative w-16'>
                                  <Image
                                    src={`${subaccount.subAccountLogo}`}
                                    alt='Subaccount Logo'
                                    fill
                                    className='rounded-md object-contain'
                                  />
                                </div>
                                <div className='flex flex-col flex-1'>
                                  {subaccount.name}
                                  <span className='text-muted-foreground'>
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className='flex gap-4 w-full h-full'
                                >
                                  <div className='relative w-16'>
                                    <Image
                                      src={`${subaccount.subAccountLogo}`}
                                      alt='Agency Logo'
                                      fill
                                      className='rounded-md object-contain'
                                    />
                                  </div>
                                  <div className='flex flex-col flex-1'>
                                    {subaccount.name}
                                    <span className='text-muted-foreground'>
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        ))
                      : 'No Account'}
                  </CommandGroup>
                </CommandList>
                {(user?.role === 'AGENCY_OWNER' ||
                  user?.role === 'AGENCY_ADMIN') && (
                  <SheetClose>
                    <Button
                      className='w-full flex gap-2'
                      onClick={() => {
                        setOpen(
                          <CustomModal
                            title='Create A Subaccount'
                            subtitle='You can switch between your agency account and the subaccount from the sidebar'
                          >
                            <SubaccountDetails
                              agencyDetails={user?.Agency as Agency}
                              userName={user?.name}
                              userId={user?.id}
                            />
                          </CustomModal>
                        )
                      }}
                    >
                      <PlusCircle size={16} />
                      Create Sub Account
                    </Button>
                  </SheetClose>
                )}
              </Command>
            }
          </PopoverContent>
        </Popover>
        <p className='text-muted-foreground text-xs mb-2'>MENU LINKS</p>
        <Separator className='mb-4' />
        <nav className='relative'>
          <Command className='rounded-lg overflow-visible bg-transparent'>
            <CommandInput placeholder='Search...' />
            <CommandList className='py-4 overflow-visible'>
              <CommandEmpty>No Results found</CommandEmpty>
              <CommandGroup className='overflow-visible'>
                {sidebarOpts.map((sidebarOption) => {
                  let val
                  const result = icons.find(
                    (icon) => icon.value === sidebarOption.icon
                  )
                  if (result) {
                    val = <result.path />
                  }
                  return (
                    <CommandItem
                      key={sidebarOption.id}
                      className='md:w-[320px] w-full'
                    >
                      <Link
                        href={sidebarOption.link}
                        className='flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]'
                      >
                        {val}
                        <span className=''>{sidebarOption.name}</span>
                      </Link>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions
