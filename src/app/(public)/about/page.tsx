import { ASSETS_URL } from '@/assets'
import { yarnData } from '@/data'
import { Metadata } from 'next';
import Image from 'next/image'
import React from 'react'

export const metadata: Metadata = {
  title: "Yarnie Crotchet - About",
  description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default function AboutPage() {
  return (
    <main className='relative flex flex-col'>
      <section className='bg-primary px-4 relative '>
        <Image src={ASSETS_URL['surene_palvie']} alt='surene_palvie' className="object-center object-cover opacity-60" fill />
        <div className="relative container mx-auto py-10 lg:my-10 lg:px-10 flex flex-col md:flex-row gap-4 lg:justify-center">
          <aside className="flex-1 bg-white relative bg-transparent rounded-full min-h-60 row-start-1 md:row-span-2 grid place-items-center">
            <div className="h-60 w-60 md:w-80 md:h-80 mx-auto grid place-items-center rounded-full relative before:absolute before:w-[120%] before:h-[120%] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white">
              <Image src={ASSETS_URL['yarn_bag']} alt='yarn_bag' className="object-center object-cover z-20" fill />
            </div>
          </aside>
          <aside className="flex-1 relative z-10 flex flex-col justify-center gap-4 py-5 md:py-10 md:px-4">
            <h1 className="text-5xl md:text-5xl text-white text-center sm:text-justify font-bold font-serif">About <span className="px-1.5 text-primary bg-border flex mx-auto lg:inline sm:mx-0 w-max">The Yarnie</span></h1>
            <p className="font-montserrat text-white text-base text-center sm:text-justify leading-loose lg:max-w-md">The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It&apos;s a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.</p>
          </aside>
        </div>
      </section>
      <section className="px-4 bg-white">
        <div className="container mx-auto flex flex-col gap-4 md:gap-8 py-10 md:py-20">
          {
            yarnData.map((yarn, i) => (
              <aside data-aos-duration="2000" data-aos-delay="1000" data-aos="fade-left" key={yarn.id} className={`flex ${i % 2 === 0 ? 'flex-col-reverse md:flex-row-reverse' : 'flex-col md:flex-row'} gap-4 md:gap-6 w-full max-w-4xl mx-auto`}>
                <div className="flex-1 relative z-10 flex flex-col justify-center gap-4 py-5 md:py-10 md:px-4">
                  <h4 className="text-3xl md:text-3xl text-secondary text-center md:text-justify font-bold font-serif lg:max-w-md">{yarn.name}</h4>
                  <p className="font-montserrat text-text text-base text-center md:text-justify leading-loose lg:max-w-md">{yarn.description}</p>
                </div>
                <div className="flex-1 relative bg-transparent rounded-xl min-h-60 row-start-1 md:row-span-2 grid place-items-center">
                  <div className={`h-56 w-56 md:w-72 md:h-72 mx-auto grid place-items-center rounded-full relative before:absolute before:w-[120%] before:h-[120%] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full ${i % 2 === 0 ? 'before:bg-[#e6e6e6]' : 'before:bg-sky-200'}`}>
                    <Image src={yarn.image} alt={yarn.image.toString()} className="object-center object-cover z-20 rounded-full" fill />
                  </div>
                </div>
              </aside>
            ))
          }
        </div>
      </section>
    </main>
  )
}
