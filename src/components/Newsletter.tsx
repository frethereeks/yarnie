import React from 'react'
import { Header1, Header3 } from './ui/Typography'
import Image from 'next/image'
import { ASSETS_URL } from '@/constants'

export default function Newsletter() {
    return (
        <section className='relative bg-light-secondary py-10 lg:py-20 md:px-4'>
            <Image src={ASSETS_URL["food_moimoi"]} alt={"food_moimoi"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex opacity-10`} />
            <div className="container mx-auto relative z-40 bg-primary py-10 lg:py-20 px-4 lg:px-10 rounded-[2%] sm:rounded-xl grid lg:grid-cols-2 md:justify-center gap-4 lg:gap-8">
                <aside className="relative overflow-hidden rounded-xl">
                    <Image src={ASSETS_URL["food_akara_pap"]} alt={"food_akara_pap"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                </aside>
                <aside className="relative flex flex-col gap-2 md:gap-4 w-full mx-auto">
                    <Header3 className='text-secondary text-lg md:text-2xl lg:text-3xl font-inspiration'>Newsletter</Header3>
                    <Header1 className='text-white text-xl md:text-3xl lg:text-4xl font-medium font-eugusto max-w-sm'>Subscribe for Offer Updates</Header1>
                    <form action="" className="p-1.5 my-2 bg-white rounded-[2rem] flex gap-1 md:gap-2 max-w-md">
                        <input type="email" name="newsletter" id="newsletter" required placeholder='Enter Email Address' className="flex-1 px-0 pr-1.5 py-2 md:p-2 lg:p-4 text-text text-sm lg:text-base rounded-[3rem]" />
                        <button type="submit" className="flex-shrink-0 px-4 lg:px-8 py-3 rounded-[2rem] bg-secondary text-white text-sm md:text-base cursor-pointer font-urbanist flex items-center">Subscribe</button>
                    </form>
                </aside>
            </div>
        </section>
    )
}
