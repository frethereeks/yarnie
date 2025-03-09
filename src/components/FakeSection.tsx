"use client"
import { popularFoods } from '@/data'
import React, { useState } from 'react'
import { appRoutePaths } from '@/routes/paths'
import Link from 'next/link'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

const PAGE_SIZE = 6
export default function FakeSection() {
    const [data, setData] = useState(popularFoods)
    const [currentPage, setCurrentPage] = useState<number>(0)


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setData(prev => prev)
    }

    return (
        <main className='flex flex-col gap-4'>
            <section className="relative py-10 px-4 flex flex-col gap-4">
                <div className="container mx-auto grid grid-cols-3 justify-center gap-4">
                    <div className="col-span-3 text-center text-default">{currentPage}</div>
                    {
                        data.slice((currentPage * PAGE_SIZE), (PAGE_SIZE + ((currentPage * PAGE_SIZE)))).map(food => (
                            <aside key={food.id} className="shadow-lg shadow-primary/30 relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
                                <Link href={`${appRoutePaths.menu}/${food.slug}`} className="min-h-48 flex-shrink-0 relative bg-primary">
                                    {/* <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} /> */}
                                </Link>
                                <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4 pt-1.5">
                                    <Link href={`${appRoutePaths.menu}/${food.slug}`} className="flex-1 flex flex-col gap-1">
                                        <h4 className='text-primary font-medium font-eugusto'>{food.name}</h4>
                                        <p className="font-urbanist text-text text-justify line-clamp-3">{food.description}</p>
                                    </Link>
                                    <div className="flex justify-between items-center gap-3 py-2">
                                        <h5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</h5>
                                        <button className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                                    </div>
                                </div>
                            </aside>
                        ))
                    }
                </div>
                <div className="flex justify-end gap-2">
                    {
                        Array.from({ length: Math.ceil(popularFoods.length / PAGE_SIZE) }).map((
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    className={`border border-primary py-2 cursor-pointer ${currentPage === index ? 'bg-primary text-white' : 'bg-white text-primary'} rounded button`}> {index + 1}
                                </button>
                            )))
                    }
                </div>
            </section>
        </main>
    )
}
