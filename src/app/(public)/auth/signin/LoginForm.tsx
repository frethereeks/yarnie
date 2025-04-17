"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { handleReset } from '@/action'
import { appRoutePaths } from '@/routes/paths'
import { GrUnlock } from 'react-icons/gr'
import { Form, Input } from 'antd'
import { IoPersonAddOutline } from 'react-icons/io5'

type TFormProps = {
    email: string
    password: string
}

type TResetFormProps = {
    email: string
}

export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const [form] = Form.useForm<TFormProps>()
    const [resetForm] = Form.useForm<TResetFormProps>()
    const [showResetForm, setShowResetForm] = useState<boolean>(false)
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            router.refresh()
            router.push(appRoutePaths.admindashboard, { scroll: false })
        }
        //eslint-disable-next-line
    }, [status])


    const handlePasswordReset = async (values: TResetFormProps) => {
        toast.loading('Please wait while we send a reset link to your email', { id: "86249" })
        setLoading(true)
        try {
            const res = await handleReset(values.email)
            if (res?.error) toast.error(res.message, { id: "86249", duration: 5000 })
            else {
                toast.success(res.message, { id: "86249", duration: 5000 })
                router.refresh()
            }
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again', { id: "86249", duration: 5000, className: `${error}` })
        }
        finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (values: TFormProps) => {
        setLoading(true)
        toast.loading(`Please wait while we attempt to log you in`, { id: "39274" })
        try {
            const res = await signIn('credentials', { ...values, redirect: false, callbackUrl: appRoutePaths.admindashboard })
            if (res?.ok) {
                toast.success(`Login Successful!.\nRedirecting to your Dashboard...`, { id: "39274" })
            }
            else {
                if (res?.error === "CredentialsSignin") toast.error("Invalid credentials supplied, please, try again", { id: "39274", duration: 4000 })
                else toast.error(res?.error || "Invalid credentials supplied, please, try again", { id: "39274" })
            }
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "39274" })
        } finally {
            setLoading(false)
        }
    }


    return (
        <aside className='flex-1 flex flex-col justify-center items-center gap-2 min-h-screen'>
            {
                showResetForm ?
                    <>
                        <Form<TResetFormProps>
                            form={resetForm}
                            onFinish={data => handlePasswordReset(data)}
                            className='w-full max-w-xl'
                        >
                            <div className="flex flex-col gap-0.5">
                                <div className="flex flex-col pb-3">
                                    <h3 className="text-lg md:text-xl text-primary font-bold font-montserrat">Forgot your Password?</h3>
                                    <label htmlFor="email" className='text-text'>It happens to the best of us.</label>
                                </div>
                                <Form.Item<TFormProps> name="email" className=''>
                                    <Input type="email" placeholder='Enter your Account Email' required style={{ border: "1px solid #666" }} />
                                </Form.Item>
                                <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 text-primary text-sm -mt-4">Have an Account? Login</p>
                                <button type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2">{loading ? <span className=''></span> : <GrUnlock className="text-sm text-inherit" />} {loading ? 'Processing...' : 'Reset Password'}</button>
                            </div>
                        </Form>
                    </>
                    :
                    <>
                        <Form<TFormProps>
                            form={form}
                            onFinish={data => handleSubmit(data)}
                            className='w-full max-w-xl'
                        >
                            <div className="grid gap-2">
                                <Form.Item<TFormProps> name="email" className=''>
                                    <Input type="email" placeholder='Email e.g. Angelajones@gmail.com' required style={{ border: "1px solid #666" }} />
                                </Form.Item>
                                <Form.Item<TFormProps> name="password">
                                    <Input type="password" placeholder='********' minLength={6} required style={{ border: "1px solid #666" }} />
                                </Form.Item>
                                <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 mb-2 -mt-4 text-primary text-right text-xsmall">Forgot Password</p>
                            </div>
                            <button type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2">{loading ? <span className=''></span> : <IoPersonAddOutline className="text-sm text-inherit" />} {loading ? 'Processing...' : 'Login'}</button>
                        </Form>
                    </>}
        </aside>
    )
}
