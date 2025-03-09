"use client"
import { config } from '@/config'
import { ASSETS_URL } from '@/assets'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { changeInCart, emptyCart, removeFromCart } from '@/lib/features/reducers/cartSlice'
import { CartProp } from '@/types'
import { Modal } from 'antd'
// import { Metadata } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { HiOutlineTrash } from 'react-icons/hi'
import { IoCloseOutline, IoWalletOutline } from 'react-icons/io5'
// import { changeInCart, removeFromCart } from '../features/reducers/cartSlice'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";


// export const metadata: Metadata = {
//     title: "Yarnie Crotchet - Cart",
//     description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
// };

export default function PublicCartPage() {
    const cartContents: CartProp[] = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleCheckout = async () => {
        dispatch(emptyCart())
        setShowModal(!showModal)
    }

    return (
        <>
            <Modal
                open={showModal}
                title={
                    <div className='flex flex-col gap-2 mt-4'>
                        <div className="h-14 w-14 md:h-20 md:w-20 text-4xl md:text-6xl text-primary mx-auto bg-primary/20 rounded-full grid place-items-center">
                            <MdOutlineShoppingCartCheckout />
                        </div>
                        <h4 className="text-xl md:text-2xl text-center text-primary mb-4">Are you sure you want to proceed?</h4>
                    </div>
                }
                onCancel={() => setShowModal(!showModal)}
                onOk={handleCheckout}
                okText="Checkout"
            >
            </Modal>
            {/* <main className="relative before:absolute before:h-2/3 before:w-2/3 before:bg-primary/30 before:-top-32 before:-right-72 before:-rotate-45 before:rounded-full after:absolute after:h-[100vh] after:w-[100vh] after:bg-slate-200 after:-bottom-32 after:-left-20 after:-rotate-45 after:rounded-full py-20 px-4 min-h-[70vh] overflow-hidden"> */}
            <main className="relative bg-background py-20 min-h-[70vh] overflow-hidden">
                <section className="container mx-auto relative z-40 grid lg:grid-cols-3 text-text bg-white shadow-[0_0_15px_-4px_#0003] p-4">
                    <aside className="lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center gap-4 py-2 border-b border-border">
                            <h3 className="heading-four">Shopping cart</h3>
                            <p className="text-xsmall">{cartContents.length} item{cartContents.length > 1 ? "s" : ""}</p>
                        </div>
                        <div className="flex flex-col gap-4 divide-y divide-slate-200 py-4">
                            <figure className="flex justify-between gap-2">
                                <div className="flex-[2] flex gap-2">
                                    <div className="w-10 md:w-14 overflow-hidden flex-shrink-0 relative rounded-sm">
                                        <Image src={ASSETS_URL['surene_palvie']} alt='surene_palvie' className='object-cover' fill />
                                    </div>
                                    <div className="flex-1 flex flex-col py-2">
                                        <h4 className="text-sm md:text-base font-semibold tracking-tighter">Original Survel Palvie Loom</h4>
                                        <p className="text-xsmall">&#8358;10,000</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                    <div className="flex flex-col gap-2 w-max flex-shrink-0 px-4">
                                        <div className="border border-slate-200 rounded-md w-14 h-10 grid place-items-center pl-1.5 overflow-hidden">
                                            <input onChange={e => dispatch(changeInCart({ id: "el.id", qty: Number(e.target.value) }))} type="number" min={1} value={10} className="bg-transparent w-20 px-2 outline-none pt-1 pl-3 text-sm " />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-max flex-shrink-0">
                                        <button onClick={() => dispatch(removeFromCart("el.id"))} className="px-2 py-1 -mt-2 w-max text-xs text-text font-xxsmall flex items-center gap-1 cursor-pointer rounded-full">
                                            <HiOutlineTrash className='flex-shrink-0 text-lg' /> Remove
                                        </button>
                                        <h4 className="text-sm font-semibold tracking-tighter">&#8358;35,450</h4>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex justify-end items-center gap-2 py-2 px-4"></div>
                    </aside>
                </section>
                    <div className="bg-white shadow-[0_0_15px_-4px_#0003] rounded-md p-4 max-w-screen-md mx-auto relative">
                        <div className="flex items-center gap-4 justify-between border-b border-slate-300 py-4 px-2">
                            <h3 className="text-2xl md:text-4xl font-semibold text-primary">{config.APP_NAME} <span className="text-secondary">Shopping Cart</span></h3>
                            <div className="h-8 w-8 text-secondary hover:text-dark cursor-pointer flex justify-center items-center text-lg relative md:scale-125 -translate-x-1">
                                <HiOutlineShoppingBag />
                                <div className="absolute h-4 w-4 grid place-items-center text-white bg-secondary rounded-full -top-0.5 -right-0.5 text-xs">{cartContents.length}</div>
                            </div>
                        </div>
                        <div className="flex flex-col py-4 divide-y divide-slate-200">
                            {
                                cartContents.map((el) => (
                                    <aside key={el.id} className="p-2 flex items-center gap-2 justify-between relative">
                                        <button onClick={() => dispatch(removeFromCart(el.id))} className="h-5 w-5 text-lg grid place-items-center bg-secondary text-white cursor-pointer absolute top-0.5 -right-0.5 rounded-full">
                                            <IoCloseOutline />
                                        </button>
                                        <div className="flex gap-2 items-center flex-1 relative">
                                            <div className="h-12 w-12 md:h-16 md:w-16 rounded-md relative overflow-hidden flex-shrink-0">
                                                <Image src={el.image} alt={el.name} className="object-cover flex-shrink-0" fill />
                                            </div>
                                            <div className="flex flex-col text-primary">
                                                <h4 className="text-sm sm:text-base md:text-xl font-semibold">{el.name}</h4>
                                                <p className="text-sm md:text-base text-secondary opacity-70 font-medium font-sans">&#8358;{el.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm md:text-base opacity-70 font-medium font-sans flex-1 text-center">&#8358;{((el.qty * el.price)).toLocaleString()}</p>
                                        <div className="border border-slate-200 rounded-md w-10 h-8 overflow-hidden">
                                            <input onChange={e => dispatch(changeInCart({ id: el.id, qty: Number(e.target.value) }))} type="number" min={1} value={el.qty} className="bg-transparent w-16 px-2 outline-none pt-0.5 pl-2.5 text-sm md:text-base" />
                                        </div>
                                    </aside>
                                ))
                            }
                        </div>
                        <div className="flex flex-col border-t border-secondary/20 border-solid divide-y divide-slate-200 text-text/80 py-2">
                            <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                <p className="opacity-60">Subtotal:</p>
                                <p className="font-semibold font-sans">&#8358;{cartContents.reduce((total, el) => el.price * el.qty + total, 0).toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                <p className="opacity-60">Electricity VAT:</p>
                                <p className="font-semibold">0</p>
                            </div>
                            <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                <p className="opacity-60">Grand Total:</p>
                                <p className="text-base md:text-lg font-bold font-sans">&#8358;{(cartContents.reduce((total, el) => el.price * el.qty + total, 0)).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setShowModal(!showModal)} className='bg-primary hover:bg-primary/80 text-white text-base md:text-lg rounded-md flex justify-center items-center gap-2 mt-2 p-2 '><IoWalletOutline /> Proceed to Checkout</button>
                            <p className="opacity-60 text-xs text-center pt-1">100% Secure with MasterCard, Paystack and Flutter Technology</p>
                        </div>
                    </div>
            </main>
        </>
    )
}

