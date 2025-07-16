import React from 'react'
import SettingsForm from './components/SettingsForm'
import { fetchUser } from '@/action'

export default async function SettingsContainer() {
  const data = await fetchUser()
  return (
    <section className='flex flex-col gap-4'>
      <SettingsForm data={data} />
    </section>
  )
}
