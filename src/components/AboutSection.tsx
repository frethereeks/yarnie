"use client"

import React from 'react'
import { Header2, Header3, Para1 } from './ui/Typography'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ASSETS_URL } from '@/constants'

export default function AboutSection({main} : {main?: boolean}) {
    const pathname = usePathname()
    return (
        <>
            <section className="py-5 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto lg:px-10 grid lg:grid-cols-2 gap-8 lg:justify-center">
                    <aside className="relative overflow-hidden bg-primary rounded-xl">
                        {
                            main ? 
                            <Image src={ASSETS_URL["food_jollof"]} alt={"food_jollof"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                            :
                            <Image src={ASSETS_URL["puff_puff"]} alt={"puff_puff"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                        }
                    </aside>
                    <aside className="relative flex flex-col gap-2 md:gap-4 py-10">
                        <Header3 className='text-secondary font-inspiration'>About us</Header3>
                        <Header2 className={`${pathname === appRoutePaths.about ? "text-white" : "text-primary"} font-medium font-eugusto max-w-sm`}>We Provide <span className="flex items-center gap-4 lg:gap-6">Healthy Food</span></Header2>
                        {/* <Para1 className={`font-urbanist ${pathname === appRoutePaths.about ? "text-white opacity-60" : "text-text"} text-lg lg:text-xl max-w-md`}>Food for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture, it has a history, it has a story and a relationship.</Para1> */}
                        <Para1 className={`font-urbanist ${pathname === appRoutePaths.about ? "text-white opacity-60" : "text-text"} text-justify lg:max-w-md`}>By partnering with local farmers and suppliers, we support our community and reduce our environmental impact. Our dishes celebrate the bounty of the season, offering a truly farm-to-table experience that connects you to the source of your food.</Para1>
                        {
                            pathname === appRoutePaths.about ?
                                <Link href={appRoutePaths.menu} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 mt-2 rounded-[2rem] bg-white text-primary text-lg md:text-xl cursor-pointer font-urbanist">Order Food <IoIosArrowRoundForward className="text-xl md:text-3xl group-hover:translate-x-2" /></Link>
                                :
                                <Link href={appRoutePaths.about} className="group button text-xsmall bg-secondary rounded-full flex items-center gap-1 w-max">Learn More <IoIosArrowRoundForward className="text-xl md:text-3xl group-hover:translate-x-2" /></Link>
                            // <Link href={appRoutePaths.about} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 mt-2 rounded-[2rem] bg-secondary text-white text-lg md:text-xl cursor-pointer font-urbanist">Learn More <IoIosArrowRoundForward className="text-xl md:text-3xl group-hover:translate-x-2" /></Link>
                        }
                    </aside>
                </div>
            </section>
        </>
    )
}
