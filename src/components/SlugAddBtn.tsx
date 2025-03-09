"use client"
import React from 'react'
import { useAppDispatch } from '@/lib/features/hooks'
import { addToCart } from '@/lib/features/reducers/cartSlice'
import { Menu } from '@prisma/client'
import { HiOutlineShoppingBag } from 'react-icons/hi2';

export default function SlugAddBtn({id, name, image, price}: Menu) {
    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart({ id, image, name, price, qty: 1 }))
    }
    
    return (
        <button onClick={handleAddToCart} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 mt-2 rounded-[2rem] bg-secondary text-white text-lg md:text-xl cursor-pointer font-urbanist">Add to Cart <HiOutlineShoppingBag className="text-xl md:text-2xl group-hover:-translate-x-1" /></button>
    )
}
