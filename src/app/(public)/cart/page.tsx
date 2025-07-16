"use client"
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { appRoutePaths } from '@/routes/paths'
import { CartProp } from '@/types'
import { Form, Input, InputNumber, Modal, notification } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaCaretLeft } from 'react-icons/fa'
import { HiOutlineTrash } from 'react-icons/hi'
import { FiCopy } from "react-icons/fi";
import { IoWalletOutline } from 'react-icons/io5'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useClipboard } from '@/lib/useClipboard'
import { fileUpload } from '@/lib'
import { createOrder } from '@/action'
import { changeInCart, emptyCart, removeFromCart } from '@/lib/features/reducers/cartSlice'
import { HiCheck } from 'react-icons/hi2'
import { useForm } from 'antd/es/form/Form'
import { GrCreditCard } from 'react-icons/gr'
import { config } from '@/config'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'


// export const metadata: Metadata = {
//     title: "Yarnie Crotchet - Cart",
//     description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
// };

type TCartOrderProps = {
    fullname: string;
    email: string;
    amount: number;
    phone: string;
    orders: string;
    address: string;
    proof: File;
}

type TOrderDetailsProps = {
    id: string
    fullname: string
    email: string
    address: string
    delivery: Date
    price: number
    total: number
}

export default function PublicCartPage() {
    const [form] = useForm<TCartOrderProps>()
    const cartContents: CartProp[] = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
    const [paymentModal, setPaymentModal] = useState<boolean>(false)
    const [proof, setProof] = useState<string>('')
    const { copied, copy } = useClipboard()
    const [showOrder, setShowOrder] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [order, setOrder] = useState<TOrderDetailsProps | undefined>(undefined)

    useEffect(() => {
        if (copied) {
            notification.info({ message: 'Text has been copied to your clipboard', key: "123", showProgress: true, placement: "bottom" })
        }
    }, [copied])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files![0]
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("proof", file)
        setProof(data)
    }

    const handleShowPayment = async () => {
        setShowConfirmationModal(false)
        setPaymentModal(true)
    }

    const handleShowOrderDetails = async (data: TOrderDetailsProps | undefined) => {
        setPaymentModal(false)
        setOrder(data)
        setShowOrder(true)
    }

    const handleSubmitPayment = async (data: TCartOrderProps) => {
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(data).map(([key, value]) => formData.append(key, value as (string | Blob)))
            formData.append("orders", JSON.stringify(cartContents.map(el => ({ ...el, image: el.image.valueOf() }))))
            formData.append("amount", cartContents.reduce((total, el) => el.price * el.quantity + total, 0) as unknown as string)
            const res = await createOrder(formData)
            if (res?.error) {
                notification.error({ message: res.message, key: "123" })
            }
            else {
                notification.success({ message: res.message, key: "123" })
                handleShowOrderDetails(res?.data)
                dispatch(emptyCart())
            }

        } catch (error) {
            console.log('error', error)
            notification.error({ message: `Something went wrong. Please, check your internet connection.`, key: "123" })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Order Confirmation Modal */}
            <Modal
                open={showOrder}
                title={
                    <div className='flex flex-col gap-4 mt-4'>
                        <div className="w-10 h-10 md:w-20 md:h-20 mx-auto overflow-hidden flex-shrink-0 relative rounded-full bg-gradient-to-tr from-primary to-primary/90 grid place-items-center">
                            <HiCheck className='text-2xl md:text-4xl text-white' />
                        </div>
                        <div className="flex-1 flex gap-2">
                            <div className="flex-1 flex flex-col pb-2">
                                <h4 className="text-lg md:text-xl text-center font-semibold tracking-tighter">Order Successfully Placed!</h4>
                                <div className="divide-y divide-slate-200 p-2 pt-5">
                                    <div className="flex flex-col relative">
                                        <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                            <p className="opacity-80">Order ID <span className="text-xs opacity-70">(Keep Safe)</span>:</p>
                                            <p className="text-sm font-semibold relative flex items-center gap-0.5"><FiCopy className='text-xs text-secondary cursor-pointer' onClick={() => copy(`#${order?.id ?? "Not Found"}`)} /> #{order?.id ?? "Not Found"} </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Full Name:</p>
                                        <p className="font-semibold">{order?.fullname}</p>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Email:</p>
                                        <p className="font-semibold">{order?.email}</p>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Address:</p>
                                        <p className="font-semibold text-sm">{order?.address}</p>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Total Items:</p>
                                        <p className="font-semibold">{order?.total}</p>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Total Price:</p>
                                        <p className="font-semibold">&#8358;{order?.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Delivery Date <span className="text-xs opacity-70">(estimated)</span>:</p>
                                        <p className="font-semibold">{moment(order?.delivery).fromNow()}</p>
                                    </div>
                                    <p className="text-xsmall text-center py-2">You will be notified via email or phone. <strong>Please, keep your Order ID Safe.</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                onCancel={() => setShowOrder(false)}
                onOk={() => setShowOrder(false)}
                cancelButtonProps={{ style: { display: "none" } }}
                okText="Copy & Close"
            >
            </Modal>

            {/* Show Account Payment Modal */}
            <Modal
                open={paymentModal}
                title={
                    <Form
                        form={form}
                        layout='vertical'
                        size={"middle"}
                        onFinish={handleSubmitPayment}
                    >
                        <div className='flex flex-col gap-2 mt-4'>
                            <div className="flex-shrink-0 flex gap-2">
                                <p className="w-10 md:w-14 overflow-hidden flex-shrink-0 relative rounded-md bg-pink-200 text-xl md:text-3xl grid place-items-center">&#8358;</p>
                                <div className="flex-1 flex flex-col py-2">
                                    <h4 className="text-sm md:text-base font-semibold tracking-tighter">Please make a payment of &#8358;{(cartContents.reduce((total, el) => el.price * el.quantity + total, 0)).toLocaleString()} into this account:</h4>
                                    <p className="text-xsmall">Kindly ensure you copy the account details to avoid mistakes.</p>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-200 p-2">
                                <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                    <p className="opacity-80">Bank Name:</p>
                                    <p className="font-semibold">{config.BANKER.ACCOUNT_HOLDER}</p>
                                </div>
                                <div className="flex flex-col relative">
                                    <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                        <p className="opacity-80">Account Number:</p>
                                        <p className="font-semibold relative flex items-center gap-0.5"><FiCopy className='text-xs text-secondary cursor-pointer' onClick={() => copy("0068154757")} /> {config.BANKER.ACCOUNT_NUMBER} </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                    <p className="opacity-80">Amount:</p>
                                    <p className="font-semibold">&#8358;{cartContents.reduce((total, el) => el.price * el.quantity + total, 0).toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col py-4">
                                    <p className="opacity-80 text-xs text-text text-center">Please send the exact amount. No addition, no subtraction.</p>
                                    <p className="opacity-80 text-xs text-text text-center">Please, upload the payment receipt when you have completed the payment</p>
                                </div>
                                <div className="flex flex-col pt-2">
                                    <Form.Item<TCartOrderProps> name="proof" label="Proof" rules={[{ required: true, message: 'You must upload proof of payment to proceed' }]}>
                                        <label htmlFor="proof" className={`relative grid place-items-center cursor-pointer border-2 border-dotted rounded-md ${proof === "" ? 'h-16' : 'h-40'}`}>
                                            <Input type="file" id="proof" accept='.jpg, .jpeg, .png' onChange={handleFileChange} className="hidden opacity-0" />
                                            {
                                                proof === "" ?
                                                    <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-80 text-xs text-text text-center">Click here to upload proof of payment</p>
                                                    :
                                                    <Image src={proof} alt='proof of payment' className='object-fill' fill />
                                            }
                                        </label>
                                    </Form.Item>
                                    <Form.Item<TCartOrderProps> name="fullname" label="Full Name" rules={[{ required: true, message: 'Full Name is required' }, { whitespace: true }]}>
                                        <Input placeholder='David Anyanwu' />
                                    </Form.Item>
                                    <Form.Item<TCartOrderProps> name="email" label="Email Address" rules={[{ required: true, message: 'Email is required' }, { type: "email", message: "Please, enter a valid email" }]}>
                                        <Input type="email" placeholder='David Anyanwu' />
                                    </Form.Item>
                                    <Form.Item<TCartOrderProps> name="phone" label="Phone Number" rules={[{ required: true, message: 'Phone Number is required' }, { len: 10, message: 'Phone Number must be exactly 10 digits' }]}>
                                        <div className="flex gap-1 text-text text-sm lg:text-base bg-light-grey">
                                            <div className="flex-shrink-0 grid place-items-center pl-4">+234</div>
                                            <InputNumber name="phone" maxLength={10} placeholder='Phone Number e.g. 7082592560' className="flex-1 py-3 bg-transparent rounded-none" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item<TCartOrderProps> name="address" label="Address" rules={[{ required: true, message: 'Address is required' }]}>
                                        <TextArea rows={5} placeholder='House 5, xyz location, FCT-Abuja, Nigeria' />
                                    </Form.Item>
                                </div>
                                <button type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2">{loading ? <span className='animate-spin border-4 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <GrCreditCard className="text-sm text-inherit" />} {loading ? 'Processing...' : 'Place Order'}</button>
                            </div>
                        </div>
                    </Form>
                }
                onCancel={() => setPaymentModal(false)}
                confirmLoading={loading}
                footer={null}
            >
            </Modal>

            {/* Payment Confirmation Modal */}
            <Modal
                open={showConfirmationModal}
                title={
                    <div className='flex flex-col gap-2 mt-4'>
                        <div className="flex-[2] flex gap-2">
                            <div className="w-10 md:w-20 overflow-hidden flex-shrink-0 relative rounded-md bg-gradient-to-tr from-primary to-primary/90 grid place-items-center">
                                <HiOutlineShoppingBag className='text-2xl md:text-4xl text-white' />
                            </div>
                            <div className="flex-1 flex flex-col py-2">
                                <h4 className="text-lg md:text-xl font-semibold tracking-tighter">Proceed to Pay?</h4>
                                <p className="text-small pb-2">You will be provided with an account number to pay into and upload an evidence. Are you sure you want to proceed?</p>
                            </div>
                        </div>
                    </div>
                }
                onCancel={() => setShowConfirmationModal(!showConfirmationModal)}
                onOk={handleShowPayment}
                okText="Proceed"
            >
            </Modal>

            <main className="relative bg-background py-20 min-h-[70vh] overflow-hidden">
                <div className="bg-white shadow-[0_0_15px_-4px_#0003] rounded-md p-4 max-w-screen-md mx-auto relative">
                    <div className="flex justify-between items-center gap-4 py-2 border-b border-border">
                        <h3 className="heading-four">Shopping cart</h3>
                        <p className="text-xsmall">{cartContents.length} item{cartContents.length > 1 ? "s" : ""}</p>
                    </div>
                    <div className="flex flex-col gap-4 divide-y divide-slate-200 py-4">
                        {
                            cartContents.length ?
                                cartContents.map((el) => (
                                    <figure key={el.id} className="flex justify-between gap-2">
                                        <div className="flex-[2] flex gap-2">
                                            <div className="w-10 md:w-14 overflow-hidden flex-shrink-0 relative rounded-sm bg-border">
                                                <Image src={el.image} alt={el.name} className='object-cover' fill />
                                            </div>
                                            <div className="flex-1 flex flex-col py-2">
                                                <h4 className="text-sm md:text-base text-primary font-semibold tracking-tighter">{el.name}</h4>
                                                <p className="text-small text-secondary">&#8358;{el.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <div className="border border-slate-200 rounded-md w-12 h-10 grid place-items-center">
                                                <InputNumber onChange={e => dispatch(changeInCart({ id: el.id, quantity: Number(e?.valueOf()) }))} type="number" min={1} max={el.qtyAvailable} value={el.quantity} style={{width: '2.5rem', background: 'transparent'}} className="bg-white border w-10 max-w-full outline-none active:outline-none text-sm" />
                                            </div>
                                            <div className="flex flex-col justify-center items-center w-max flex-shrink-0">
                                                <button onClick={() => dispatch(removeFromCart(el.id))} className="px-2 py-1 -mt-2 w-max text-xs text-pink-500 hover:text-pink-500/90 font-xxsmall flex items-center gap-1 cursor-pointer rounded-full">
                                                    <HiOutlineTrash className='flex-shrink-0 text-sm text-pink-500' /> Remove
                                                </button>
                                                <h4 className="text-sm text-primary font-semibold tracking-tighter">&#8358;{((el.quantity * el.price)).toLocaleString()}</h4>
                                            </div>
                                        </div>
                                    </figure>
                                ))
                                :
                                <div className="flex flex-col gap-2 items-center">
                                    <h3 className="heading-four opacity-50 text-secondary text-3xl text-center py-5">Empty Cart</h3>
                                    <Link href={appRoutePaths.shop} className="text-xsmall text-primary flex items-center gap-2"><FaCaretLeft /> View all products</Link>
                                </div>
                        }
                        {
                            cartContents.length > 0 &&
                            <div className="flex flex-col border-t border-secondary/20 border-solid divide-y divide-slate-200 text-primary/60 py-2 mt-4">
                                <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                    <p className="opacity-80">Subtotal:</p>
                                    <p className="font-semibold font-sans">&#8358;{cartContents.reduce((total, el) => el.price * el.quantity + total, 0).toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                    <p className="opacity-80">Electricity VAT:</p>
                                    <p className="font-semibold">0</p>
                                </div>
                                <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                    <p className="opacity-80">Coupon Discount:</p>
                                    <p className="font-semibold">0</p>
                                </div>
                                <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                    <p className="opacity-80">Grand Total:</p>
                                    <p className="text-base md:text-lg font-bold font-sans">&#8358;{(cartContents.reduce((total, el) => el.price * el.quantity + total, 0)).toLocaleString()}</p>
                                </div>
                                <button onClick={() => setShowConfirmationModal(!showConfirmationModal)} className='bg-primary hover:bg-primary/95 text-white text-base md:text-lg rounded-md flex justify-center items-center gap-2 mt-2 p-2 '><IoWalletOutline /> Proceed to Checkout</button>
                                <p className="opacity-60 text-xs text-center pt-1">100% Secure with MasterCard, Paystack and Flutter Technology</p>
                            </div>
                        }
                    </div>
                    {/* <div className="flex items-center gap-4 justify-between border-b border-slate-300 py-4 px-2">
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
                                        <p className="text-sm md:text-base opacity-70 font-medium font-sans flex-1 text-center">&#8358;{((el.quantity * el.price)).toLocaleString()}</p>
                                        <div className="border border-slate-200 rounded-md w-10 h-8 overflow-hidden">
                                            <input onChange={e => dispatch(changeInCart({ id: el.id, quantity: Number(e.target.value) }))} type="number" min={1} value={el.quantity} className="bg-transparent w-16 px-2 outline-none pt-0.5 pl-2.5 text-sm md:text-base" />
                                        </div>
                                    </aside>
                                ))
                            }
                        </div>
                        <div className="flex flex-col border-t border-secondary/20 border-solid divide-y divide-slate-200 text-text/80 py-2">
                            <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                <p className="opacity-60">Subtotal:</p>
                                <p className="font-semibold font-sans">&#8358;{cartContents.reduce((total, el) => el.price * el.quantity + total, 0).toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                <p className="opacity-60">Electricity VAT:</p>
                                <p className="font-semibold">0</p>
                            </div>
                            <div className="flex justify-between items-center gap-2 py-1 px-2 text-sm md:text-base">
                                <p className="opacity-60">Grand Total:</p>
                                <p className="text-base md:text-lg font-bold font-sans">&#8358;{(cartContents.reduce((total, el) => el.price * el.quantity + total, 0)).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setShowConfirmationModal(!showConfirmationModal)} className='bg-primary hover:bg-primary/80 text-white text-base md:text-lg rounded-md flex justify-center items-center gap-2 mt-2 p-2 '><IoWalletOutline /> Proceed to Checkout</button>
                            <p className="opacity-60 text-xs text-center pt-1">100% Secure with MasterCard, Paystack and Flutter Technology</p>
                        </div> */}
                </div>
            </main>
        </>
    )
}

