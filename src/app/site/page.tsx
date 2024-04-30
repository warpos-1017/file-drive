import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

import { pricingCards } from '@/lib/constants'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <>
      <section className='h-screen w-full pt-40 relative flex items-center justify-center flex-col'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#3a3a3a2e_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a2e_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10' />
        <p className='text-center'>Run your Fleet Mgmt. biz, in one place</p>
        <div className='bg-gradient-to-r from-sky-500 to-secondary-foreground text-transparent bg-clip-text relative'>
          <h1 className='text-9xl font-bold text-center md:text-[240px] xl:text-[300px]'>
            iGeers!
          </h1>
        </div>
        <div className='flex items-center justify-center relative md:mt-[-70px]'>
          <Image
            alt='Logo'
            src='/images/preview.png'
            width={1200}
            height={1200}
            className='rounded-t-2xl border-2 border-muted'
          />
          <div className='bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10'></div>
        </div>
      </section>
      <section className='flex justify-center items-center flex-col gap-4 md:!mt-20 mt-10'>
        <h2 className='text-4xl text-center'> Choose what fits you right</h2>
        <p className='text-muted-foreground text-center'>
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className='flex flex-wrap items-center justify-center gap-4 mt-6'>
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={cn(
                'w-[300px] flex flex-col justify-between h-[335px]',
                {
                  'border-2 border-primary': card.title === 'Unlimited Saas',
                }
              )}
            >
              <CardHeader>
                <CardTitle
                  className={cn({
                    'text-muted-foreground': card.title !== 'Unlimited Saas',
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className='text-4xl font-bold'>{card.price}</span>
                <span className='text-muted-foreground'>/m</span>
              </CardContent>
              <CardFooter className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  {card.features.map((value) => (
                    <div key={value} className='flex gap-2'>
                      <Check className='text-muted-foreground' />
                      <p> {value} </p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={cn(
                    'w-full text-center p-2 rounded-md text-white',
                    { '!bg-muted-foreground': card.title === 'Unlimited Saas' }
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
