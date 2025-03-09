/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from 'react'
import { Header1 } from './ui/Typography'
import { Menu } from '@prisma/client'
import MenuCard from './MenuCard'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { TCategoryProps } from '@/types'

type TPageProps = {
    data: Menu[] | undefined
    categories: TCategoryProps[] | undefined
}

export default function ProductSection({ data: popularFoods, categories }: TPageProps) {
    const [data, setData] = useState(popularFoods)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [category, setCategory] = useState<string>("All")

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setData(prev => prev)
    }

    const handleChangeCategory = (value: { name: string, id: string }) => {
        setCategory(value.name)
        if (value.name === "All") setData(popularFoods)
        else setData(popularFoods?.filter(prev => prev.categoryId === value.id))
        setCurrentPage(0) // Reset page to 0 when changing category
    }

    return (
        <>
            <section className="py-10 md:py-10 lg:py-20 px-2">
                <aside className="container mx-auto flex flex-col gap-4">
                    {/* <Header1 className="text-primary text-center py-4 font-medium">Popular Dishes</Header1>
                    <div className="px-4 md:px-8 lg:px-10">
                        <AppSlider
                            key={"8256015asdkjlvcqa0p25"}
                            breakpoints={{
                                360: { slidesPerView: 1, spaceBetween: 10 },
                                650: { slidesPerView: 2, spaceBetween: 20 },
                                1042: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            items={data?.length ? data?.filter(el => el.popular === true).map(food => (
                                <aside key={food.id} className="relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
                                    <Link href={`${appRoutePaths.menu}/${food.id}`} className="min-h-40 flex-shrink-0 relative bg-primary">
                                        <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                    </Link>
                                    <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4">
                                        <Link href={`${appRoutePaths.menu}/${food.id}`} className="flex-1 flex flex-col">
                                            <Header4 className='text-primary font-medium font-eugusto'>{food.name}</Header4>
                                            <Para2 className="font-urbanist text-text text-balance line-clamp-3">{food.description}</Para2>
                                        </Link>
                                        <div className="flex justify-between items-center gap-3 py-2">
                                            <Header5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</Header5>
                                            <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                                        </div>
                                    </div>
                                </aside>
                            )) : []
                            }
                        />
                    </div> */}
                    <Header1 className="text-secondary text-center py-4 font-medium">Explore Our Food Menu</Header1>
                    <div className="flex justify-center items-center gap-x-4 flex-wrap my-2">
                        <button onClick={() => handleChangeCategory({ id: "0", name: "All" })} className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white text-center w-40 p-4 shadow-lg shadow-text/40 rounded-md py-1 font-medium flex justify-center items-center gap-2">All <span className='font-urbanist font-semibold text-xs md:text-sm'></span></button>
                        {
                            categories?.filter(el => el.menu.length > 0)?.map(category => (
                                <button onClick={() => handleChangeCategory({ id: category.id, name: category.name })} key={category.id} className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white text-center w-40 p-4 shadow-lg shadow-text/40 rounded-md py-1 font-medium flex justify-center items-center gap-2">{category.name} <span className='font-urbanist font-semibold text-xs md:text-sm'></span></button>
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 gap-y-6 justify-center">
                        {
                            data?.slice((currentPage * DEFAULT_PAGE_SIZE), (DEFAULT_PAGE_SIZE + ((currentPage * DEFAULT_PAGE_SIZE)))).map(food => (
                                <MenuCard key={food.id} {...food} />
                            ))
                        }
                    </div>
                    <div className="flex justify-end gap-2">
                        {
                            data && data?.length > 12 &&
                            Array.from({ length: Math.ceil((data?.length || 0) / DEFAULT_PAGE_SIZE) }).map((
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index)}
                                        className={`border border-primary py-2 cursor-pointer ${currentPage === index ? 'bg-primary text-white' : 'bg-white text-primary'} rounded button`}> {index + 1}
                                    </button>
                                )))
                        }
                    </div>
                    {
                        /* categories?.map(category => {
                            const menu = data?.filter(el => el.categoryId === category.id)
                            if (menu?.length)
                                return (
                                    <>
                                        <Header4 className="bg-primary w-40 p-4 mt-10 mb-2 shadow-lg shadow-text/40 text-left text-white rounded-md py-1 font-medium flex items-center gap-2">{category.name} <span className='font-urbanist font-semibold text-xs md:text-sm'>({menu?.length})</span></Header4>
                                        <aside className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                                            {
                                                menu?.map(food => (
                                                    <MenuCard key={food.id} {...food} />
                                                ))
                                            }
                                        </aside>
                                    </>

                                )
                        }) */
                    }
                </aside>
            </section>
        </>
    )
}
