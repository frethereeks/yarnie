"use client"

import { appRoutePaths } from '@/routes/paths'
import { Menu } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
// import { Header5, Para3 } from './ui/Typography'
// import toast from 'react-hot-toast'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { ASSETS_URL } from '@/constants'
import Image from 'next/image'
import { useAppDispatch } from '@/lib/features/hooks'
import { addToCart } from '@/lib/features/reducers/cartSlice'

export default function MenuCard(food: Menu) {
    console.log('description', food?.description)
    const dispatch = useAppDispatch()
    const handleAddToCart = (food: Menu) => {
        dispatch(addToCart({id: food.id, image: food.image, name: food.name, price: food.price, qty: 1}))
    }

  return (
      <>
          <aside key={food.id} className="shadow-md shadow-primary/20 relative flex flex-col gap-2 w-full max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden flex-shrink-0">
              <Link href={`${appRoutePaths.menu}/${food.slug}`} className="min-h-48 flex-shrink-0 relative bg-primary">
                  {food.image !== "undefined" && <Image src={food?.image ?? ASSETS_URL['pepper_assorted']} alt={food.name} className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} fill />}
              </Link>
              <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4 pt-1.5">
                  <Link href={`${appRoutePaths.menu}/${food.slug}`} className="flex-1 flex flex-col gap-1">
                      <h3 className='text-primary text-base md:text-lg font-medium font-eugusto'>{food.name}</h3>
                      <p className="font-urbanist text-text text-left sm:text-justify text-sm md:text-base line-clamp-3">{food.description !== "undefined" ? food.description : `Our ${food.name} will bring out the best in you. For an experience of what cloud this combination can take you, try it out with us today.`}</p>
                  </Link>
                  <div className="flex justify-between items-center gap-3 py-2">
                      <p className='text-secondary text-sm md:text-base font-sans'>&#8358;{food.price.toLocaleString()}</p>
                      <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-base md:text-lg lg:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                  </div>
              </div>
          </aside>
      </>
  )
}
