import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Input } from '@/components/ui/input'
import { Filter, Search } from 'lucide-react'

const OrdersList = () => {
  return (
    <aside className='hidden lg:block lg:h-screen w-[360px] p-4 bg-stone-50'>
      <div className='flex flex-col gap-3 mt-4'>
        <div className='flex items-center text-lg font-semibold'>
          <div className=''>Active Orders</div>
          <span className='ml-2'>45</span>
        </div>
        <div className='flex items-center'>
          {/* <div className='relative'>
            <Search className='absolute top-[50%] transform translate-y-[-50%] left-2 w-4 h-4 text-muted-foreground' />
            <Input className='h-9 w-60 pl-7' placeholder='Search...' />
          </div> */}
          <Command className='bg-transparent w-full'>
            <div className='flex items-center'>
              <CommandInput placeholder='Search' className='h-9' />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size='sm'
                    variant='secondary'
                    className='ml-2 text-muted-forground shirnk-0'
                  >
                    <Filter className='mr-1 w-4 h-4 text-muted-foreground' />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter keys</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>Yesterday</DropdownMenuItem>
                  <DropdownMenuItem>past 3 days</DropdownMenuItem>
                  <DropdownMenuItem>past 7 days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CommandList>
              <CommandEmpty>No Results Found</CommandEmpty>
              <CommandGroup></CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </aside>
  )
}

export default OrdersList
