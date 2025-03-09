"use client"

import React from 'react'
import Link from 'next/link'
import { headerLinks } from '@/data'
import { appRoutePaths } from '@/routes/paths'
import { IoCloseOutline } from 'react-icons/io5'
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";
import { usePathname } from 'next/navigation'
import SearchInput from './SearchInput'
import { useAppSelector } from '@/lib/features/hooks'
import { ASSETS_URL } from '@/constants'
import Image from 'next/image'
import { CartProp } from '@/types'
// import { useDispatch, useSelector } from 'react-redux'

export default function Header() {
    const [navshow, setNavshow] = React.useState(false)
    const [fixed, setFixed] = React.useState(false)
    const location = usePathname();
    const cartContents: CartProp[] = useAppSelector(state => state.cart)

    React.useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > 60) {
                setFixed(true)
            }
            else {
                setFixed(false)
            }
        }
        return () => {
            setNavshow(false);
        }
    }, [location])

    return (
        <header className={`${fixed ? 'fixed shadow-md shadow-black/20' : 'relative shadow-none'} z-40 w-full px-4 py-2 md:py-4 lg:py-5 bg-white`}>
            <div className="container mx-auto flex justify-between gap-4">
                <nav className={`flex-1 flex flex-col lg:flex-row lg:items-center gap-2 z-50 absolute lg:static top-0 w-full min-h-screen lg:min-h-max ${navshow ? 'right-0' : 'right-full'}`}>
                    <div onClick={() => setNavshow(!navshow)} className={`${navshow ? 'flex lg:hidden' : 'hidden'} transition-none duration-0 fixed top-0 left-0 w-screen h-screen bg-text/50`}></div>
                    <div className="relative flex flex-col lg:flex-row justify-center lg:justify-start h-screen lg:h-max lg:items-center gap-2 lg:gap-1 xl:gap-2 max-w-[20rem] lg:max-w-max bg-white">
                        <div onClick={() => setNavshow(!navshow)} className="absolute top-2 right-3 lg:hidden bg-text/30 text-primary text-3xl cursor-pointer p-1 grid place-items-center font-extrabold rounded-xl">
                            <IoCloseOutline />
                        </div>
                        <div className={`flex absolute back top-12 left-0 w-[90%] mx-4 lg:hidden gap-2 border-b-2 border-primary`}>
                            <SearchInput />
                        </div>
                        {
                            headerLinks.map(link => (
                                <Link key={link.id} href={link.url} className="lg:flex-1 p-2 lg:px-4 font-semibold lg:text-center text-primary hover:text-white bg-white hover:bg-primary lg:rounded-full capitalize whitespace-nowrap">{link.title}</Link>
                            ))
                        }
                    </div>
                </nav>
                <Link href={appRoutePaths.home} className="flex-1 flex lg:justify-center items-center gap-1 flex-shrink-0">
                    <aside className="relative overflow-hidden bg-transparent rounded-xl w-6 lg:w-10 h-8">
                        <Image src={ASSETS_URL["logo"]} alt={"logo"} fill className={`w-full h-full rounded-xl absolute object-cover object-center flex-shrink-0 flex`} />
                    </aside>
                    <h1 className='text-primary text-2xl md:text-3xl lg:text-4xl font-medium font-eugusto leading-none'>BC<span className='text-secondary'>Lounge</span></h1>
                </Link>
                <div className='flex-1 flex-shrink-0 flex justify-end items-center gap-4'>
                    <div className={`hidden lg:flex gap-2 border-b-2 border-primary max-w-lg`}>
                        <SearchInput />
                    </div>
                    <Link href={appRoutePaths.cart} className="relative text-primary text-2xl lg:text-2xl cursor-pointer p-2">
                        <HiOutlineShoppingCart />
                        <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-secondary text-white text-xs grid place-items-center">{cartContents?.length}</div>
                    </Link>
                    {/* <div onClick={() => setNavshow(!navshow)} className="relative lg:hidden text-primary text-lg lg:text-2xl cursor-pointer w-6 "> */}
                    <div onClick={() => setNavshow(!navshow)} className="relative lg:hidden bg-text/10 text-primary text-2xl md:text-3xl cursor-pointer xs:w-7 xs:h-7 w-9 h-9 grid place-items-center font-extrabold rounded-md">
                        <HiMenuAlt3 />
                    </div>
                </div>
            </div>
        </header>
    )
}
