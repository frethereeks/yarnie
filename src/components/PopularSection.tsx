"use client"

import React from 'react'
import { Header1 } from './ui/Typography'
import AppSlider from './ui/AppSlider';
// import { popularFoods } from '@/data'
import { Menu } from '@prisma/client'
import MenuCard from './MenuCard'


export default function PopularSection({ data }: { data: Menu[] | undefined }) {

    return (
        <>
            <section className="relative px-4">
                <div className="container mx-auto flex flex-col gap-6 md:gap-8 py-10 md:py-10 lg:py-20">
                    <Header1 className="text-primary text-center py-4 font-medium">Popular Dishes</Header1>
                    <div className="px-4 md:px-8 lg:px-10">
                        <AppSlider
                            key={"8256015asdkjlvcqa0p25"}
                            breakpoints={{
                                360: { slidesPerView: 1, spaceBetween: 10 },
                                650: { slidesPerView: 2, spaceBetween: 20 },
                                1042: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            items={data?.length ? data?.filter(el => el.popular === true)?.map(food => (
                                <MenuCard key={food.id} {...food} />
                            )) : []
                            }
                        />
                    </div>
                </div>
            </section>
            <section className="bg-white py-10 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto flex flex-col gap-2 sm:gap-4 md:gap-8">
                    <Header1 className="text-primary text-center py-4 font-medium">Latest Menu</Header1>
                    <aside className="md:px-4 lg:px-10 grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 gap-y-6 justify-center">
                        {data?.length ? data?.filter(el => el.popular !== true).slice(0, 6).map(food => (
                            <MenuCard key={food.id} {...food} />
                        )) : []
                        }
                    </aside>
                </div>
            </section>
        </>
    )
}
