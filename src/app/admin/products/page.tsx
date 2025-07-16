import { fetchProducts } from '@/action'
import ProductsContainer from '@/modules/admin/products/ProductsContainer'
import React from 'react'

export default async function AdminProductPage() {
  const { data, } = await fetchProducts({showHidden: true})
  return (
    <main>
      <ProductsContainer data={data?.products} category={data?.category} role={"Owner"} />
    </main>
  )
}
