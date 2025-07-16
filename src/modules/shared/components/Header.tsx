"use client"
import { appRoutePaths } from '@/routes/paths'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCloseSharp, IoMenuOutline, IoSearchOutline } from 'react-icons/io5'
import { headerLinks } from '../../../data/headerLinks'
import { usePathname } from 'next/navigation'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { useAppSelector } from '@/lib/features/hooks'
import { CartProp } from '@/types'
import Image from 'next/image'
import { ASSETS_URL } from '@/assets'

export default function Header() {
  const [promoOpen, setPromoOpen] = useState<boolean>(true)
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
  const [headerFixed, setHeaderFixed] = useState<boolean>(false)
  const pathname = usePathname()
  const cartContents: CartProp[] = useAppSelector(state => state.cart)

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 10) {
        setHeaderFixed(true)
      }
      else {
        setHeaderFixed(false)
      }
      return () => {
        setHeaderFixed(false);
        window.scrollTo(0, 0)
        setNavbarOpen(false);
      }
    }
  }, [])

  return (
    <header className='flex flex-col bg-primary text-white sticky top-0 left-0 w-full z-40'>
      <aside className={`bg-secondary items-center gap-4 p-1.5 ${headerFixed || !promoOpen ? 'hidden' : 'flex'}`}>
        <p className="flex-1 text-center text-sm md:text-base font-bold uppercase">USE CODE <span className="text-primary">CROCHET25</span> FOR 1.5% OFF YOUR ORDER</p>
        <IoCloseSharp className="text-2xl text-white flex-shrink-0 p-1 cursor-pointer" onClick={() => setPromoOpen(false)} />
      </aside>
      <aside className={`px-4 py-2 relative z-40 bg-primary ${headerFixed ? 'shadow-[0_0_15px_-4px_#0003]' : ''}`}>
        <div className="md:container mx-auto flex justify-betweeen items-center gap-4">
          {/* <Link href={appRoutePaths.home} className='relative w-max flex after:absolute after:w-full after:h-[1px] after:bg-primary after:rounded-md after:rotate-12 after:left-0 after:top-1/2 after:-translate-y-1/2 p-2'>
            <p className="text-3xl md:text-5xl text-secondary relative rotate-12 z-30 font-[cursive]">T</p>
            <p className="text-3xl md:text-5xl text-secondary relative rotate-12 font-[cursive]">Y</p>
          </Link> */}
          <Link href={appRoutePaths.home} className='relative w-max'>
            <Image src={ASSETS_URL['logo']} alt={"Yarnie Logo"} height={37} width={86} />
          </Link>
          <div className={`bg-primary fixed z-50 top-0 ${navbarOpen ? 'left-0 pt-10 md:pt-0' : 'left-full'} px-4 w-full h-screen md:static md:h-max md:w-max flex-1 flex flex-col md:flex-row md:justify-center md:gap-2`}>
            <div className="absolute top-4 right-4 flex-1 grid place-items-center md:hidden p-2">
              <IoCloseSharp className="text-xl text-primary cursor-pointer" onClick={() => setNavbarOpen(!navbarOpen)} />
            </div>
            {
              headerLinks.map(link => (
                <Link key={link.id} href={link.url} className={`relative flex p-4 text-accent text-base font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:rounded-md ${pathname === link.url ? 'md:after:bg-secondary' : 'after:bg-transparent md:hover:after:bg-secondary'}`}>{link.title}</Link>
              ))
            }
          </div>
          <div className="flex gap-2 flex-shrink-0 w-max ml-auto">
            <div className="flex-1 grid place-items-center p-2">
              <IoSearchOutline className="text-xl text-primary cursor-pointer" />
            </div>
            <Link href={appRoutePaths.cart} className="flex-1 grid place-items-center p-2 relative">
              <div className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-secondary text-white text-xs grid place-items-center">{cartContents.length ?? 0}</div>
              <HiOutlineShoppingBag className="text-xl text-white cursor-pointer" />
            </Link>
            <div className="flex-1 grid place-items-center md:hidden p-2">
              <IoMenuOutline className="text-xl text-white cursor-pointer" onClick={() => setNavbarOpen(!navbarOpen)} />
            </div>
          </div>
        </div>
      </aside>
    </header>
  )
}
