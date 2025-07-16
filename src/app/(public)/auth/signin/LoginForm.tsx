"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { handleReset } from '@/action'
import { appRoutePaths } from '@/routes/paths'
import { GrUnlock } from 'react-icons/gr'
import { Form, Input } from 'antd'
import { IoEyeOffOutline, IoEyeOutline, IoPersonAddOutline } from 'react-icons/io5'
import Link from 'next/link'

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
    const [showPassword, setShowPassword] = useState<boolean>(false)
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
                            className='w-full max-w-lg mx-auto'
                        >
                            <div className="flex flex-col gap-0.5">
                                <div className="flex flex-col pb-3">
                                    <h3 className="text-lg md:text-xl text-primary font-bold font-play">Forgot your Password?</h3>
                                    <label htmlFor="email" className='text-text'>It happens to the best of us.</label>
                                </div>
                                <Form.Item<TFormProps> name="email" className=''>
                                    <Input type="email" placeholder='Enter your Account Email' style={{ border: "1px solid #666" }} />
                                </Form.Item>
                                <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 text-primary text-sm -mt-4">Have an Account? Login</p>
                                <button type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2">{loading ? <span className='animate-spin border-4 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <GrUnlock className="text-sm text-inherit" />} {loading ? 'Processing...' : 'Reset Password'}</button>
                            </div>
                        </Form>
                    </>
                    :
                    <>
                        <aside className='w-full max-w-lg mx-auto md:px-20 flex flex-col gap-8'>
                            <Form
                                form={form}
                                onFinish={handleSubmit}
                                layout='vertical'
                                size='middle'
                                className='flex flex-col p-4'
                            >
                                <div className="flex flex-col py-8">
                                    <h4 className="text-primary text-xl md:text-3xl leading-none font-semibold font-aladin text-nowrap">Welcome back</h4>
                                    <p className="text-sm md:text-base text-secondary font-aladin">Login to manage your account.</p>
                                </div>
                                <Form.Item<TFormProps> name="email" label="Email Address" id="email" rules={[{ required: true, message: 'Email is required' }, { type: "email", message: 'Enter a valid email address' }]}>
                                    <Input type='email' className='lowercase border border-background rounded-md' placeholder='Email e.g. Uchedaniel@email.com' style={{ border: "1px solid #666" }} />
                                </Form.Item>
                                <div className="flex flex-col relative">
                                    <Form.Item<TFormProps> name="password" label="Password" id="password" rules={[{ required: true, message: 'Password is required' }]}>
                                        <div className="relative w-full">
                                            <Input type={showPassword ? "text" : "password"} placeholder='********' minLength={6} style={{ border: "1px solid #666" }} />
                                            <span onClick={() => setShowPassword(prev => !prev)} className="h-8 w-8 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 grid place-items-center z-10 text-text text-lg">{showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}</span>
                                        </div>
                                    </Form.Item>
                                    <p onClick={() => setShowResetForm(true)} className='absolute top-full right-0 -mt-6 gap-2 w-max ml-auto cursor-pointer text-text text-xs text-nowrap font-medium border-b-[1.5px] border-dotted border-slate-400'>Forgot Password</p>
                                </div>
                                <div className="flex flex-col-reverse justify-between gap-4">
                                    <Link href={appRoutePaths.signup} className='flex items-center gap-1.5 text-text text-xs font-medium'>Don&apos;t have an account? <span className="font-bold text-secondary">Signup</span></Link>
                                    <button disabled={loading} type='submit' className='button flex justify-center items-center gap-2 w-full bg-secondary'>
                                        {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <IoPersonAddOutline />}
                                        {loading ? 'Processing...' : 'Login'}
                                    </button>
                                </div>
                            </Form>
                        </aside>
                    </>}
        </aside>
    )
}
