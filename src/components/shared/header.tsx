import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

type HeaderProps = {
  title: string
  description?: string
  size?: 'regular' | 'sm'
  separateor?: boolean
}

const Header = ({
  title,
  description,
  size = 'regular',
  separateor,
}: HeaderProps) => {
  return (
    <div
      className={cn('flex flex-col space-y-4 md:space-y-6 w-full', {
        'space-y-3 md:space-y-4': size === 'sm',
      })}
    >
      <div className={`${size === 'regular' ? 'space-y-1.5' : ''}`}>
        <h1
          className={cn('text-2xl font-bold text-black', {
            'text-lg font-medium text-gray-800': size === 'sm',
          })}
        >
          {title}
        </h1>
        {!!description && (
          <p
            className={cn(
              'truncate max-w-[240px] md:max-w-[600px] text-muted-foreground',
              {
                'text-sm': size === 'sm',
              }
            )}
          >
            {description}
          </p>
        )}
      </div>

      {!!separateor && <Separator />}
      {/* </div> */}
    </div>
  )
}

export default Header
