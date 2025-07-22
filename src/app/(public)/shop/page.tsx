export const dynamic = "force-dynamic"
import { fetchHomeData } from '@/action'
import { ASSETS_URL } from '@/assets';
import { appRoutePaths } from '@/routes/paths';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { HiArrowCircleDown } from 'react-icons/hi';
import 'aos/dist/aos.css';
import PBProductsContainer from '@/modules/shop/PBShopContainer';

export const metadata: Metadata = {
  title: "Yarnie Crotchet - Shop",
  description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default async function ShopPage() {
  const res = await fetchHomeData({showHidden: false})

  return (
    <main className='relative flex flex-col bg-background'>
      <section className="relative py-20 md:py-40 px-4 bg-primary">
        <Image src={ASSETS_URL['surene_palvie_loom']} alt='surene_palvie_loom' className="object-center object-cover opacity-30" fill />
        <div className="relative container mx-auto flex flex-col justify-center items-center gap-4 md:gap-6">
          <h4 data-aos="fade-down" data-aos-duration="500" className="text-2xl md:text-3xl text-center text-white font-bold font-capriola w-full max-w-xl">We deliver the best hand-stitched yarn products you would ever see!</h4>
          <Link data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500" href={`${appRoutePaths.shop}#shop-container`} className="border-2 border-white rounded-md w-max mx-auto px-6 py-2 text-base text-white bg-transparent hover:bg-white hover:text-primary flex items-center gap-2">Check it out <HiArrowCircleDown /></Link>
        </div>
      </section>
      <PBProductsContainer shopData={res?.data?.products} />
    </main>
  )
}
