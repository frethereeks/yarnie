"use client"
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { addToCart, changeInCart } from '@/lib/features/reducers/cartSlice'
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TShopDataProps } from '@/data/shopData'
import { CartProp } from '@/types';
import { HiOutlineTrash } from 'react-icons/hi';

export default function SlugAddBtn({ id, name, image, price }: Pick<TShopDataProps, "id" | "name" | "image" | "price">) {
    const dispatch = useAppDispatch()
    const cartContents: CartProp[] = useAppSelector(state => state.cart)
    const data = cartContents.find(el => el.id === id)

    const handleAddToCart = () => {
        dispatch(addToCart({ id, image: image as string, name, price, qty: 1 }))
    }

    const handleChangeInCart = ({ id, qty }: {id: string, qty: number}) => {
        dispatch(changeInCart({ id, qty}))
    }

    return (
        <>
            {
                data ?
                    <>
                        <div className="flex h-12 w-max border-2 border-text divide-x-2 divide-text">
                            <div onClick={() => handleChangeInCart({ id: data.id, qty: (data.qty - 1) })} className="select-none w-10 cursor-pointer flex-shrink-0 px-2 grid place-items-center font-bold text-lg text-text hover:bg-primary hover:text-white">-</div>
                            <div className="w-14 flex-shrink-0 px-2 grid place-items-center text-text font-medium text-lg">{data.qty}</div>
                            <div onClick={() => handleChangeInCart({ id: data.id, qty: (data.qty + 1) })} className="select-none w-10 cursor-pointer flex-shrink-0 px-2 grid place-items-center font-bold text-lg text-text hover:bg-primary hover:text-white">+</div>
                        </div>
                        <button onClick={() => handleChangeInCart({ id: data.id, qty: 0 })} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 rounded-sm md:rounded-md bg-pink-600 text-white text-sm md:text-base cursor-pointer font-urbanist"><HiOutlineTrash className='flex-shrink-0 text-xl' /> Remove</button>
                    </>
                    :
                    <button onClick={handleAddToCart} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 rounded-sm md:rounded-md bg-slate-800 text-white text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag className="text-xl md:text-2xl group-hover:-translate-x-1.5 -mt-0.5" /> Add to Cart </button>
            }
        </>
    )
}
