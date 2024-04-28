import Header from '@/components/shared/header'
import React from 'react'
import Sidebar from './_components/sidebar'
import MobileNav from './_components/mobile-nav'
import ProfileForm from '@/components/forms/profile'

const ProfilePage = () => {
  return (
    <>
      <Header
        title='⚙️ Settings'
        // title='Settings'
        description='Manage your account settings and set e-mail preferences.'
        separateor
      />
      <section className='h-full flex flex-col xl:flex-row mt-4 gap-y-4'>
        <Sidebar />
        <MobileNav />
        <div className='w-full'>
          <ProfileForm />
        </div>
        {/* <div className='flex-1 lg:ml-4'>
          <Header
            title='Profile'
            description='Company profile information'
            size='sm'
            separateor
          />
        </div> */}
      </section>
    </>
  )
}

export default ProfilePage
