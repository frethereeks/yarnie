"use client"
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { addToCart, changeInCart } from '@/lib/features/reducers/cartSlice'
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CartProp, TProductProps } from '@/types';
import { HiOutlineTrash } from 'react-icons/hi';

export default function SlugAddBtn({ id, name, image, price, qtyAvailable }: Pick<TProductProps, "id" | "name" | "image" | "price" | "qtyAvailable">) {
    const dispatch = useAppDispatch()
    const cartContents: CartProp[] = useAppSelector(state => state.cart)
    const data = cartContents.find(el => el.id === id)

    const handleAddToCart = () => {
        dispatch(addToCart({ id, image: image as string, name, price, quantity: 1 }))
    }

    const handleChangeInCart = ({ id, quantity }: {id: string, quantity: number}) => {
        dispatch(changeInCart({ id, quantity}))
    }

    return (
        <>
            {
                data ?
                    <>
                        <div className="flex h-12 w-max border-2 border-text divide-x-2 divide-text">
                            <div onClick={() => handleChangeInCart({ id: data.id, quantity: (data.quantity - 1) })} className="select-none w-10 cursor-pointer flex-shrink-0 px-2 grid place-items-center font-bold text-lg text-text hover:bg-primary hover:text-white">-</div>
                            <div className="w-14 flex-shrink-0 px-2 grid place-items-center text-text font-medium text-lg">{data.quantity}</div>
                            <div onClick={() => handleChangeInCart({ id: data.id, quantity: (data.quantity + 1) })} className="select-none w-10 cursor-pointer flex-shrink-0 px-2 grid place-items-center font-bold text-lg text-text hover:bg-primary hover:text-white">+</div>
                        </div>
                        <button onClick={() => handleChangeInCart({ id: data.id, quantity: 0 })} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 rounded-sm md:rounded-md bg-pink-600 text-white text-sm md:text-base cursor-pointer font-play"><HiOutlineTrash className='flex-shrink-0 text-xl' /> Remove</button>
                    </>
                    :
                    <button disabled={qtyAvailable === 0} onClick={handleAddToCart} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 rounded-sm md:rounded-md bg-slate-800 text-white text-lg md:text-xl cursor-pointer disabled:hover:cursor-not-allowed font-play"><HiOutlineShoppingBag className="text-xl md:text-2xl group-hover:-translate-x-1.5 -mt-0.5" /> {qtyAvailable === 0 ? "Out of Stock" : "Add to Cart" } </button>
            }
        </>
    )
}
