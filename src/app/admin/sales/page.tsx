import React from 'react'
import SalesContainer from '@/modules/admin/sales/SalesContainer'
import { fetchSales } from "@/action";

export default async function AdminSalesPage() {
  const {data, role} = await fetchSales()
  return (
    <>
      <SalesContainer data={data!} role={role!} />
    </>
  )
}
