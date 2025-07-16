"use client"
import { ASSETS_URL } from '@/assets'
import { config } from '@/config'
import { headerLinks } from '@/data'
import { appRoutePaths } from '@/routes/paths'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineLocationMarker, HiPhoneIncoming } from 'react-icons/hi'
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2'

type TFooterForm = {
    email: string
}

export default function Footer() {
    const [form] = useForm<TFooterForm>()

    return (
        <footer className='flex flex-col'>
            <section className="py-6 px-4 bg-secondary relative">
                <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
                    <h4 className="text-base md:text-lg text-center text-white font-nunito">Yes! Send me exclusive offers for shopping on <span className="font-bold">{config.APP_NAME}</span></h4>
                    <Form
                        form={form}
                    >
                        <Form.Item<TFooterForm> name="email" noStyle>
                            <div className="flex py-2 px-4 rounded-full border border-light-grey bg-white gap-2 w-full max-w-2xl">
                                <Input className='flex-1 bg-transparent text-sm text-text border-none' required placeholder='Enter your email' style={{ background: "transparent", border: 0, outline: 0}} />
                                <button type="submit" className='w-max grid place-items-center bg-transparent text-text textsm'>Subscribe</button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </section>
            <section className="py-6 px-4 bg-primary relative">
                <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 pt-4 pb-10">
                    <div className="flex flex-col w-max">
                        <Link href={appRoutePaths.home} className='relative w-max'>
                            <Image src={ASSETS_URL['logo']} alt={"Yarnie Logo"} height={37} width={86} />
                        </Link>
                        <p className="text-sm text-white max-w-sm">The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials.</p>
                    </div>
                    <div className="flex flex-col text-white">
                        {
                            headerLinks.map(link => (
                                <Link key={link.id} href={link.url} className={`relative flex px-4 py-2 text-white hover:text-secondary text-base font-bold`}>{link.title}</Link>
                            ))
                        }
                        <Link key={"802497234"} href={appRoutePaths.sitemap} className={`relative flex px-4 py-2 text-white hover:text-secondary text-base font-bold`}>Sitemap</Link>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4 text-white">
                        <div className="flex items-center gap-1">
                            <div className="flex-shrink-0 grid place-items-center p-2">
                                <HiPhoneIncoming className="text-xl text-secondary cursor-pointer" />
                            </div>
                            <Link href={"tel: +2349069071120"} className="font-play text-white text-sm md:text-base max-w-md">+2349069071120</Link>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex-shrink-0 grid place-items-center p-2">
                                <HiOutlineEnvelopeOpen className="text-xl text-secondary cursor-pointer" />
                            </div>
                            <Link href={"mailto: info@theyarnie.com"} className="font-play text-white text-sm md:text-base max-w-md">info@theyarnie.com</Link>
                        </div>
                        <div className="flex gap-1">
                            <div className="flex-shrink-0 grid place-items-center p-2">
                                <HiOutlineLocationMarker className="text-xl text-secondary cursor-pointer" />
                            </div>
                            <p className="font-play text-sm md:text-base max-w-md">Somewhere along NYSC Camp, Kubwa, Abuja or Kebbi State, Nigeria</p>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full bottom-0 left-0 p-4 bg-primary text-white text-sm text-center">Copyright &copy; {new Date().getFullYear()} The Yarnie Beauty & Crotchet. All rights reserved</div>
            </section>
        </footer>
    )
}
