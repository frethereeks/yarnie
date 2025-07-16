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
import { ASSETS_URL } from '@/assets'
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
                    className='flex flex-col'
                >
                    <div className="bg-black flex lg:justify-center items-center flex-shrink-0 relative p-4">
                        <Link href={appRoutePaths.home} className='relative w-max'>
                            <Image src={ASSETS_URL['logo']} alt={"Yarnie Logo"} height={37} width={86} />
                        </Link>
                    </div>
                    <div className='sticky top-0 left-0 h-full p-4 bg-white text-inherit flex-1 flex flex-col justify-between gap-10'>
                        <div className="flex-1 flex flex-col gap-1">
                            {
                                sideBarLinks.map(el => (
                                    <Link key={el.id} href={el.link} className={`button ${pathname.includes(el.link) ? "bg-secondary/50 text-primary hover:text-white" : "bg-white hover:bg-secondary/20 text-primary hover:text-primary"} flex justify-start items-center gap-2 py-2`}>
                                        <span className="w-6 text-lg">{el.icon}</span>
                                        <p className='text-sm'>{el.title}</p>
                                    </Link>
                                ))
                            }
                        </div>
                        <button onClick={handleLogout} className={`button sticky left-4 bottom-4 bg-secondary text-white flex items-center gap-2 py-1.5`}>
                            <span className="w-6 text-lg"><GrLogout /></span>
                            <p className='text-sm'>Logout</p>
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
                            margin: '10px 4px',
                            // padding: 24,
                            minHeight: 280,
                            // background: colorBgContainer,
                            // borderRadius: borderRadiusLG,
                        }} className='bg-background rounded-lg p-2'>{children}</Content>
                        <Footer />
                    </Flex>
                </Layout>
            </Layout>
        </main>
    )
}
