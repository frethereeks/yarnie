"use client"
import { TShopDataProps } from '@/data/shopData'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { addToCart, changeInCart } from '@/lib/features/reducers/cartSlice'
import { appRoutePaths } from '@/routes/paths'
import { CartProp } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineShoppingBag, HiOutlineTrash } from 'react-icons/hi2'

export default function ProductCard(item: TShopDataProps) {
    const { id, name, price, slug, image, } = item;
    const cartContents: CartProp[] = useAppSelector(state => state.cart)
    const data = cartContents.find(el => el.id === id)
    const dispatch = useAppDispatch()

    const handleAddToCart = (item: TShopDataProps) => {
        dispatch(addToCart({ id: item.id, image: item.image as string, name: item.name, price: item.price, qty: 1 }))
        return false;
    }

    const handleChangeInCart = ({ id, qty }: {id: string, qty: number}) => {
        dispatch(changeInCart({ id, qty}))
    }

    return (
        <figure className="shadow-[0_0_15px_4px_#0001] flex flex-col gap-2 group bg-white p-4 pt-3 rounded-sm md:rounded-md">
            <Link href={`${appRoutePaths.shop}/${slug}`} className="relative h-40 md:h-60 bg-border overflow-hidden rounded-md md:rounded-lg">
                <Image src={image} alt={name} className="object-center object-cover z-20 group-hover:scale-110" fill />
            </Link>
            <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-base md:text-lg text-primary leading-tight font-sofia font-bold">{name}</h4>
                <div className="flex justify-between items-center gap-4">
                    <p className="flex-1 text-sm md:text-base text-primary font-semibold">&#8358;{price.toLocaleString()}</p>
                    {
                        data ?
                            <span onClick={() => handleChangeInCart({ id: data.id, qty: 0 })} className="flex-shrink-0 grid place-items-center p-2">
                                <HiOutlineTrash className="text-xl text-pink-600 cursor-pointer" />
                            </span>
                            :
                            <span onClick={() => handleAddToCart(item)} className="flex-shrink-0 grid place-items-center p-2">
                                <HiOutlineShoppingBag className="text-xl text-primary cursor-pointer" />
                            </span>
                    }
                </div>
            </div>
        </figure>
    )
}
