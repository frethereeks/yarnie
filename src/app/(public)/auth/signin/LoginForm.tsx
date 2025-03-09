"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { handleReset } from '@/action'
import { appRoutePaths } from '@/routes/paths'
import { GrUnlock, GrUserWorker } from 'react-icons/gr'
import { Form, Input } from 'antd'

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
        <aside className='w-full max-w-[280px] mx-auto'>
            {
                showResetForm ?
                    <>
                        <Form<TResetFormProps>
                            form={resetForm}
                            onFinish={data => handlePasswordReset(data)}
                            className='flex flex-col gap-2'
                        >
                            <label htmlFor="email">Email</label>
                            <Form.Item<TFormProps> name="email" className='mb-2' style={{ marginBottom: 0, paddingBottom: 0 }}>
                                <Input placeholder='Enter your Account Email' />
                            </Form.Item>
                            <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 text-primary text-sm">Have an Account? Login</p>
                            <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 w-max bg-secondary text-white text-sm text-center flex-1 cursor-pointer flex items-center gap-2 mt-2">{loading ? <div className="flex gap-2 items-center"><span className="loading loading-spinner loading-xs"></span> Processing...</div> : <div className="flex gap-2 items-center"><GrUnlock className="text-sm text-inherit" /> Reset Password</div>}</button>
                        </Form>
                    </>
                    :
                    <>
                        <Form<TFormProps>
                            form={form}
                            onFinish={data => handleSubmit(data)}
                            className='flex flex-col gap-2'
                        >
                            <label htmlFor="email">Email</label>
                            <Form.Item<TFormProps> name="email" className='mb-2' style={{ marginBottom: 0, paddingBottom: 0 }}>
                                <Input type='email' placeholder='Enter Email' required />
                            </Form.Item>
                            <label htmlFor="email">Password</label>
                            <Form.Item<TFormProps> name="password" className='mb-2' style={{ marginBottom: 0, paddingBottom: 0 }}>
                                <Input type='password' placeholder='Enter Password' required />
                            </Form.Item>
                            <p onClick={() => setShowResetForm(!showResetForm)} className="cursor-pointer underline underline-offset-2 -mb-2 text-primary text-right text-xsmall">Forgot Password</p>
                            <button type="submit" disabled={loading} className="rounded-full py-2 px-5 md:px-8 bg-primary text-white text-sm text-center flex-1 cursor-pointer flex justify-center items-center gap-2 mt-2"><GrUserWorker className="text-sm text-inherit" />{loading ? <div className="flex gap-2 items-center"><span className="loading loading-spinner loading-xs"></span> Processing...</div> : 'Login'}</button>
                        </Form>
                    </>}
        </aside>
    )
}
