"use client"
import { MenuCard } from '@/components'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { Menu } from '@prisma/client'
import React, { useState } from 'react'

export default function SearchContainer({ search }: { search?: Menu[] }) {
    const [data, setData] = useState<Menu[]>(search ?? [])
    const [currentPage, setCurrentPage] = useState<number>(0)
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setData(prev => prev)
    }

    return (
        <>
            <section className="relative py-10 lg:py-20 px-4 text-center bg-light-secondary shadow-lg shadow-text/10">
                <div className="container mx-auto flex flex-col items-center gap-2 md:gap-3">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
                        {
                            data?.slice((currentPage * DEFAULT_PAGE_SIZE), (DEFAULT_PAGE_SIZE + ((currentPage * DEFAULT_PAGE_SIZE)))).map(food => (
                                <MenuCard key={food.id} {...food} />
                            ))
                        }
                    </div>
                    <div className="flex justify-end gap-2">
                        {
                            Array.from({ length: Math.ceil(data?.length / DEFAULT_PAGE_SIZE) }).map((
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index)}
                                        className={`border border-primary py-2 cursor-pointer ${currentPage === index ? 'bg-primary text-white' : 'bg-white text-primary'} rounded button`}> {index + 1}
                                    </button>
                                )))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
