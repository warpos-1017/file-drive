'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Header from '@/components/shared/header'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ProfileForm = () => {
  const form = useForm()
  const onSubmit = () => {}
  return (
    <Card className='xl:border-0 xl:shadow-none xl:ml-2'>
      <CardHeader className='xl:pt-2'>
        <Header
          title='Profile'
          description='Essential information regarding your business'
          size='sm'
          separateor
        />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name=''
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl className=''>
                    <Input {...field} placeholder='ABC.Com Ltd. CO' />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Manager</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='John Doe' />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Representative Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      readOnly
                      placeholder='john.doe@example.com'
                      className='focus-visible:ring-rose-800'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name=''
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offical Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='No. 121, Main street, 2nd Dist., CA.'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit'>Update Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm
