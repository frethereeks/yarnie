"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaMoneyCheck } from 'react-icons/fa'
// import PhoneInput from 'react-phone-number-input'
// import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css'
import { createUser } from '@/action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Form, Input } from 'antd'
import { appRoutePaths } from '@/routes/paths'

type TFormProps = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}

export default function SignupForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [form] = Form.useForm<TFormProps>()

    const handleSubmit = async (values: TFormProps) => {
        // e.preventDefault()
        toast.loading(`Please wait while your account is being created`, { id: "8206" })
        if (form.getFieldValue("password") !== form.getFieldValue("confirmPassword")) {
            toast.error(`Passwords Do NOT Match!`, { id: "8206" })
            return;
        }
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value)
            })
            const data = await createUser(formData)
            if (data?.error) toast.error(data?.message, { id: "8206" })
            else {
                toast.success(data?.message, { id: "8206" })
                router.push(appRoutePaths.signIn)
            }
            toast.success(`${data?.message}`, { id: "8206" })
            router.push(appRoutePaths.signIn, { scroll: false })
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='flex flex-col gap-2'>
            {/* <form ref={formRef} onSubmit={handleSubmit} className="py-5 flex flex-col gap-3 px-4 sm:px-0"> */}
            <Form<TFormProps>
                form={form}
                onFinish={(data) => handleSubmit(data)}
            >
                <div className="grid md:grid-cols-2 gap-2">
                    <Form.Item<TFormProps> name="firstname">
                        <Input placeholder='First Name e.g. Angela' required style={{ border: "1px solid #666" }} />
                    </Form.Item>
                    <Form.Item<TFormProps> name="lastname">
                        <Input placeholder='Last Name e.g. Jones' required style={{ border: "1px solid #666" }} />
                    </Form.Item>
                    <Form.Item<TFormProps> name="email" className='col-span-2'>
                        <Input type="email" placeholder='Email e.g. Angelajones@gmail.com' required style={{ border: "1px solid #666" }} />
                    </Form.Item>
                    <Form.Item<TFormProps> name="password">
                        <Input type="password" placeholder='********' minLength={6} required style={{ border: "1px solid #666" }} />
                    </Form.Item>
                    <Form.Item<TFormProps> name="confirmPassword">
                        <Input type="password" placeholder='Confirm Password' required style={{ border: "1px solid #666" }} />
                    </Form.Item>
                </div>
                <button type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><FaMoneyCheck className="text-sm text-inherit" />{loading ? 'Processing...' : 'Signup'}</button>
            </Form>
            {/* </form> */}
            <Link href={appRoutePaths.signIn} className="text-center cursor-pointer mx-auto z-20 relative before:absolute before:w-1/6 before:top-1/2 before:-translate-y-1/2 before:right-full before:h-[1px] before:bg-slate-300 before:rounded-md before:z-10  after:absolute after:w-1/6 after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[1px] after:bg-slate-300 after:rounded-md after:z-10 w-max bg-neutral-50 py-2 px-3 text-sm text-slate-400">Already a Member? Login</Link>

        </section>
    )
}
