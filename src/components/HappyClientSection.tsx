import React from 'react'
import { Para3, Para1, Header2, } from '@/components/ui/Typography'
import AppSlider from './ui/AppSlider'
import { happyClients } from '@/data'
// import { ASSETS_URL } from '@/constants'
// import Image from 'next/image'

export default function HappyClientSection() {
    

    return (
        <section className='relative bg-white flex flex-col gap-10 py-10 lg:py-20 px-4'>
            <div data-aos-duration="1000" data-aos="zoom-in-up" className="flex items-center gap-1 md:gap-2">
                <Header2 className='flex-1 text-center text-primary py-4'>Hear from our <span className="text-secondary">Happy Customers</span></Header2>
            </div>
            {/* <div className="container mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8"> */}
                <div className="container mx-auto">
                    <AppSlider
                    key={"8256015asdkjlvcqa0p25"}
                    items={happyClients.map((client,i) => (
                        <aside key={client.id} data-aos-duration="1000" data-aos="fade-up-right" className="flex flex-col gap-4 relative">
                            <div className="flex items-center gap-2">
                                <div className={`relative ${i === 0 ? "bg-primary" : i % 2 === 1 ? "bg-secondary" : "bg-text"} h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden flex-shrink-0`}>
                                    {/* <Image src={ASSETS_URL["oakyard_gallery7"]} alt="Monday Daniel" className='object-cover' fill /> */}
                                </div>
                                <div data-aos-duration="1000" data-aos-delay="1000" data-aos="zoom-in-left" className="flex-1 flex flex-col justify-center gap-1 pt-2">
                                    <Para1 className='-my-2 text-primary font-eugusto'>{client.name}</Para1>
                                    <Para3 variant='secondary' className='opacity-70'>{client.createdAt}</Para3>
                                </div>
                            </div>
                            <Para3 className='text-text text-justify'>{client.text}</Para3>
                        </aside>
                    ))}
                        breakpoints={{
                            360: { slidesPerView: 1, spaceBetween: 10 },
                            650: { slidesPerView: 2, spaceBetween: 20 },
                            1042: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    />
                
            </div>
        </section>
    )
}
