import { fetchMenu } from '@/action'
import MenuContainer from '@/modules/admin/shop/MenuContainer'
import React from 'react'

export default async function AdminMenuPage() {
  const {data, role} = await fetchMenu()
  return (
    <main>
      <MenuContainer data={data?.data} category={data?.category} role={role!} />
    </main>
  )
}
