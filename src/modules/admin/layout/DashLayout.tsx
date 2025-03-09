"use client"
import React, { useState } from 'react'
import { Flex, Layout } from 'antd'
import Link from 'next/link'
import { LuText } from 'react-icons/lu'
import { GrLogout } from "react-icons/gr";
import Footer from './Footer'
import { sideBarLinks } from '@/data/sideBarLinks'
import { appRoutePaths } from '@/routes/paths'
import { redirect, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { ASSETS_URL } from '@/constants'

const { Content, Header, Sider } = Layout

export default function DashLayout({ children, image }: { children: React.ReactNode, image: React.ReactNode }) {
    const [openSideBar, setOpenSidebar] = useState<boolean>(false)
    const pathname = usePathname()

    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault()
        signOut({ callbackUrl: appRoutePaths.signin })
        redirect(appRoutePaths.home)
    }

    return (
        <main className='flex flex-col'>
            <Layout hasSider={openSideBar}>
                <Sider
                    breakpoint={"xl"}
                    collapsible
                    trigger={null}
                    collapsedWidth={0}
                    theme={"light"}
                    collapsed={openSideBar}
                    style={siderStyle}
                    className='flex flex-col pt-4'
                >
                    <div className="flex lg:justify-center items-center flex-shrink-0 relative after:absolute after:h-[.05rem] after:w-[90%] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-slate-200 p-4">
                        <Link href={appRoutePaths.home} className="flex-1 flex lg:justify-center items-center flex-shrink-0">
                            <aside className="relative overflow-hidden bg-transparent rounded-xl w-6 lg:w-10 h-8">
                                <Image src={ASSETS_URL["logo"]} alt={"logo"} fill className={`w-full h-full rounded-xl absolute object-cover object-center flex-shrink-0 flex`} />
                            </aside>
                            <h1 className='text-primary text-lg md:text-xl lg:text-2xl font-medium font-eugusto leading-none'>BC<span className='text-secondary'>Lounge</span></h1>
                        </Link>
                    </div>
                    <div className='sticky top-0 left-0 h-full p-4 bg-white flex-1 flex flex-col justify-between gap-10'>
                        <div className="flex-1 flex flex-col">
                            {
                                sideBarLinks.map(el => (
                                    <Link key={el.id} href={el.link} className={`button ${pathname.includes(el.link) ? "bg-primary text-white" : "bg-white text-primary"} flex justify-start items-center gap-2 py-2`}>
                                        <span className="w-6 text-lg">{el.icon}</span>
                                        <p className='text-base'>{el.title}</p>
                                    </Link>
                                ))
                            }
                        </div>
                        <button onClick={handleLogout} className={`button sticky left-4 bottom-4 bg-secondary text-white flex items-center gap-2 py-1.5`}>
                            <span className="w-6 text-lg"><GrLogout /></span>
                            <p className='text-base'>Logout</p>
                        </button>
                    </div>
                </Sider>
                <Layout style={{ marginInlineStart: openSideBar ? 0 : 200 }}>
                    <Header
                        style={{
                            // position: 'sticky',
                            top: 0,
                            padding: 0,
                            zIndex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className="bg-white flex justify-end gap-8 w-full p-4">
                            {/* 
                            <form className="flex items-center gap-2 border-b-[2px] border-primary ml-52 w-full max-w-lg md:max-w-xl">
                                <input type='search' placeholder='What would you like to eat?' className='flex-1 text-sm lg:text-sm border-transparent hover:border-transparent bg-transparent text-primary outline-none hover:outline-none' />
                                <button type="submit" className='p-2'>
                                    <IoSearchOutline className='text-secondary' />
                                </button>
                            </form> 
                            */}
                            {/* <button onClick={() => setOpenSidebar(!openSideBar)} className='group p-2 bg-secondary/20 hover:bg-primary text-primary hover:text-white text-xl rounded-md ml-auto mx-4'> 
                            */}
                            <div className="flex gap-2">
                                {image}
                                <button onClick={() => setOpenSidebar(prev => !prev)} className={`group py-0 px-2 bg-secondary hover:bg-secondary/80 text-white text-lg rounded-md ml-auto mx-4`}>
                                    <LuText className={`${openSideBar ? 'scale-100' : '-scale-100'}`} />
                                </button>
                            </div>
                        </div>
                    </Header>
                    <Flex vertical className='w-full' style={{ paddingTop: 20 }}>
                        <Content style={{
                            margin: '14px 4px',
                            // padding: 24,
                            minHeight: 280,
                            // background: colorBgContainer,
                            // borderRadius: borderRadiusLG,
                        }} className='bg-background rounded-lg p-4'>{children}</Content>
                        <Footer />
                    </Flex>
                </Layout>
            </Layout>
        </main>
    )
}
