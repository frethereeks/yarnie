import React from 'react'
import ProfileForm from './components/ProfileForm'
import { fetchUser } from '@/action'

export default async function ProfileContainer() {
  const data = await fetchUser()

  return (
    <section className='flex flex-col gap-4'>
      <ProfileForm data={data} />
    </section>
  )
}
