// import { getPageMenu } from '@/action'
import { ASSETS_URL } from '@/assets';
import { shopData } from '@/data';
import { ProductCard } from '@/modules/shared';
import { appRoutePaths } from '@/routes/paths';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { HiArrowCircleDown } from 'react-icons/hi';
import 'aos/dist/aos.css';

export const metadata: Metadata = {
  title: "Yarnie Crotchet - Shop",
  description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default async function ShopPage() {
  // const res = await getPageMenu()
  // const menu = res.data?.menu
  // const categories = res.data?.category

  return (
    <main className='relative flex flex-col bg-background'>
      <section className="relative py-20 md:py-40 px-4 bg-primary">
        <Image src={ASSETS_URL['surene_palvie_loom']} alt='surene_palvie_loom' className="object-center object-cover opacity-30" fill />
        <div className="relative container mx-auto flex flex-col justify-center items-center gap-4 md:gap-6">
          <h4 data-aos="fade-down" data-aos-duration="500" className="text-2xl md:text-3xl text-center text-white font-bold font-serif w-full max-w-xl">We deliver the best hand-stitched yarn products you would ever see!</h4>
          <Link data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500" href={`${appRoutePaths.shop}#shop-container`} className="border-2 border-white rounded-md w-max mx-auto px-6 py-2 text-base text-white bg-transparent hover:bg-white hover:text-primary flex items-center gap-2">Check it out <HiArrowCircleDown /></Link>
        </div>
      </section>
      <section className="px-4 bg-background" id='shop-container'>
        <div className="container mx-auto flex flex-col gap-4 md:gap-6 py-10 md:py-20">
          <div className="flex justify-between items-center gap-4 py-2 border-b border-secondary">
            <h3 className="heading-four text-primary font-serif">All Products</h3>
            <select className="border border-slate-200 rounded-md w-max h-10 grid place-items-center pl-1.5 overflow-hidden bg-white text-text text-sm placeholder:text-text placeholder:text-sm">
              <optgroup className='text-primary' label='Price'>
                <option value="low" className="bg-white text-sm text-text">Lowest to Highest</option>
                <option value="high" className="bg-white text-sm text-text">Highest to Lowest</option>
              </optgroup>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {
              shopData.map(product => (<ProductCard key={product.id} {...product} />))
            }
          </div>
        </div>
      </section>
    </main>
  )
}
