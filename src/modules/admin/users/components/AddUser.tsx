"use client"

import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Header3 } from '@/components/ui/Typography'
import { createUser, updateUser } from '@/action'
import { useRouter } from 'next/navigation'
import { Form, Input } from 'antd'
import { FaUserAstronaut } from 'react-icons/fa'
import { $Enums } from '@prisma/client'

type TFormProps = {
    id: string
    firstname: string
    lastname: string
    role: string
    email: string
    status: string
    password: string
    confirmPassword?: string
}

export default function AddUser({ closeModal, data }: { data?: TFormProps, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const roleRef = useRef<HTMLSelectElement | null>(null)
    const statusRef = useRef<HTMLSelectElement | null>(null)
    const [form] = Form.useForm<TFormProps>()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data.id,
                firstname: data.firstname,
                lastname: data?.lastname,
                email: data?.email,
            })
            if (statusRef.current && roleRef.current) {
                roleRef.current.value = data.role
                statusRef.current.value = data.status
            }
        }
        else {
            form.resetFields()
        }
    }, [data, form])

    const handleSubmit = async (values: TFormProps) => {
        toast.loading(`Please wait while your account is being created`, { id: "8206" })
        if (form.getFieldValue("password") !== form.getFieldValue("confirmPassword")) {
            toast.error(`Passwords Do NOT Match!`, { id: "8206" })
            return;
        }
        setLoading(true)
        console.log({values})
        let data;
        try {
            values.status = statusRef.current?.value as $Enums.Status
            values.role = roleRef.current?.value as $Enums.Role
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value)
            })
            if (values.id) {
                console.log("Came to the Update Block")
                data = await updateUser(formData)
            }
            else {
                data = await createUser(formData)
            }
            if (data?.error) toast.error(data?.message, { id: "8206" })
            else {
                toast.success(data?.message, { id: "8206" })
                router.refresh()
            }
            closeModal(prev => !prev)
            form.resetFields()
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }


    return (
        <main className='flex flex-col'>
            <section className="pt-10 px-4">
                <div className="container mx-auto">
                    <Header3>{data?.id ? "Edit" : "Create New"} User</Header3>
                    <Form
                        form={form}
                        onFinish={(data) => {
                            handleSubmit(data)
                        }}
                        className="flex flex-col mt-4">
                        {data?.id &&
                            <Form.Item<TFormProps> name="id" initialValue={data?.id} style={{height: 0}}>
                                <Input hidden placeholder='' defaultValue={data?.id} required />
                            </Form.Item>
                        }
                        <div className="flex flex-col">
                            <Form.Item<TFormProps> name="firstname">
                                <Input placeholder='First Name e.g. Angela' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                            <Form.Item<TFormProps> name="lastname">
                                <Input placeholder='Last Name e.g. Jones' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                            <Form.Item<TFormProps> name="role">
                                <select
                                    ref={roleRef}
                                    id='role'
                                    style={{ border: "1px solid #888", color: "#aaa", padding: ".51rem" }}
                                    className='relative z-40 bg-background rounded-md w-full cursor-pointer'
                                    onChange={(e) => {
                                        form.setFieldValue("role", e.target.value as unknown as $Enums.Role)
                                    }}
                                    required
                                >
                                    {
                                        Object.entries($Enums.Role).reverse().map(([key, value]) => value === "ROOT" ? <option key={key} disabled className='relative capitalize bg-background text-xs md:text-sm' value={""} defaultChecked>- User Access Level -</option> : <option key={key} className='relative capitalize bg-background text-xs md:text-sm' value={value}>{value}</option>)
                                    }
                                </select>
                            </Form.Item>
                            <Form.Item<TFormProps> name="status">
                                <select
                                    ref={statusRef}
                                    id='status'
                                    style={{ border: "1px solid #888", color: "#aaa", padding: ".51rem" }}
                                    className='relative z-40 bg-background rounded-md w-full cursor-pointer'
                                    onChange={(e) => {
                                        form.setFieldValue("status", e.target.value as unknown as $Enums.Status)
                                    }}
                                    required
                                >
                                    {
                                        Object.entries($Enums.Status).map(([key, value]) => <option key={key} defaultChecked={data ? data.status === value ? true : value === "ACTIVE" ? true : false : false} className='relative capitalize bg-background text-xs md:text-sm' value={value}>{value}</option>)
                                    }
                                </select>
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
                        <button onClick={() => form.submit()} type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><FaUserAstronaut className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit Record' : 'Signup'}</button>
                    </Form>
                </div>
            </section >
        </main >
    )
}
