'use client'

import { v4 as uuidv4 } from 'uuid'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Agency } from '@prisma/client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { agencyDetailSchema } from '@/schema'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import Loading from '@/components/shared/loading'
import { upsertAgency } from '@/actions/upsert-agency'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@clerk/nextjs'
import FileUpload from '../shared/file-upload'

type Props = {
  data?: Partial<Agency>
}

const AgencyDetails = ({ data }: Props) => {
  const { user } = useUser()
  const { toast } = useToast()
  const route = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deletingAgency, setDeletingAgency] = useState(false)

  const form = useForm<z.infer<typeof agencyDetailSchema>>({
    // mode: 'onChange',
    resolver: zodResolver(agencyDetailSchema),
    defaultValues: {
      name: data?.name,
      // WIP: set default email address of current user necessary ??
      companyEmail: user?.emailAddresses[0].emailAddress || data?.companyEmail,
      companyPhone: data?.companyPhone,
      whiteLabel: data?.whiteLabel || false,
      address: data?.address,
      city: data?.city,
      zipCode: data?.zipCode,
      state: data?.state,
      country: data?.country,
      agencyLogo: data?.agencyLogo,
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof agencyDetailSchema>) => {
    // WIP: handle stripe customer creation

    let custId = ''
    try {
      const response = await upsertAgency({
        id: data?.id || uuidv4(),
        customerId: data?.customerId || custId || '',
        address: values.address,
        agencyLogo: values.agencyLogo,
        city: values.city,
        companyPhone: values.companyPhone,
        country: values.country,
        name: values.name,
        state: values.state,
        whiteLabel: values.whiteLabel,
        zipCode: values.zipCode,
        companyEmail: values.companyEmail,
        connectAccountId: '',
      })
      if (response?.success) {
        toast({
          title: 'Success!',
          description: data?.id ? 'Agency udpated' : 'Agency created',
        })
        route.refresh()
        // setSuccess(data?.success)
      }
      if (response?.error) {
        toast({
          title: 'Oppse!',
          description: response.error,
          variant: 'destructive',
        })
        // setError(data?.error)
      }
    } catch (error: unknown) {
      toast({
        title: 'Oppse!',
        description: `SERVER ERROR - ${(error as Error).message}`,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data, form])

  return (
    <AlertDialog>
      <Card className='w-full mt-4'>
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                disabled={isLoading}
                control={form.control}
                name='agencyLogo'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Agency Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        apiEndpoint='agencyLogo'
                        onChange={field.onChange}
                        value={field.value}
                      />
                      {/* <Input placeholder='Your agency Logo' {...field} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-2 md:gap-4'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Your agency name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='companyEmail'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='john.doe@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name='companyPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='+1-123-45678' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name='whiteLabel'
                render={({ field }) => {
                  return (
                    <FormItem className='flex items-center justify-between rounded-lg border gap-4 md:gap-6 p-4'>
                      <div className=''>
                        <FormLabel>Whitelabel Agency</FormLabel>
                        <FormDescription>
                          Turning on whilelabel mode will show your agency logo
                          to all sub accounts by default. You can overwrite this
                          functionality through sub account settings.
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='123 st...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-4'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Los Angles' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='CA' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='zipCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>zip Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='zip code' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='United States' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isLoading}
                className='cursor-pointer'
              >
                {isLoading ? <Loading /> : 'Save Agency Information'}
              </Button>
            </form>
          </Form>
          {data?.id && (
            <div className='flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-4'>
              <div>Danger Zone</div>
              <div className='text-muted-foreground'>
                Deleting your agency cannpt be undone. This will also delete all
                sub accounts and all data related to your sub accounts. Sub
                accounts will no longer have access to funnels, contacts etc.
              </div>
              <AlertDialogTrigger
                disabled={isLoading || deletingAgency}
                className='text-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-white whitespace-nowrap'
              >
                {deletingAgency ? 'Deleting...' : 'Delete Agency'}
              </AlertDialogTrigger>
            </div>
          )}
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default AgencyDetails
