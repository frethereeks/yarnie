import React from 'react'
import OrdersContainer from '@/modules/admin/order/OrdersContainer'
import { fetchOrders } from "@/action";
import { $Enums } from '@prisma/client';

export default async function adminordersPage() {
  const res = await fetchOrders()
  const data = res.data, role = res.role;
  
  return (
    <>
      <OrdersContainer data={data!} role={role as $Enums.Role} />
    </>
  )
}
