"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createUser, updateUser } from '@/action'
import { Form, Input, Select, Tooltip } from 'antd'
import { $Enums } from '@prisma/client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { GrUserWorker } from 'react-icons/gr'
import { IoInformationCircleOutline } from 'react-icons/io5'

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

export default function AddUser({ closeModal, data, router }: { data?: TFormProps, closeModal: React.Dispatch<React.SetStateAction<boolean>>, router: AppRouterInstance }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [form] = Form.useForm<TFormProps>()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data.id,
                firstname: data.firstname,
                lastname: data?.lastname,
                email: data?.email,
                status: data?.status,
                role: data?.role,
            })
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
        console.log({ values })
        let data;
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => formData.append(key, value))
            if (values.id) {
                console.log("Came to the Update Block")
                data = await updateUser(formData,)
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
            <section className="p-4">
                <div className="container mx-auto">
                    <h4 className="text-sm md:text-lg font-bold text-text p-4 border-l-4 border-secondary py-2 mb-8">{data?.id ? "Edit" : "Create New"} Admin</h4>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={handleSubmit}
                        className="flex flex-col">
                        {data?.id &&
                            <Form.Item<TFormProps> name="id" initialValue={data?.id} noStyle>
                                <Input hidden defaultValue={data?.id} required className='h-0 overflow-hidden opacity-0' />
                            </Form.Item>
                        }
                        <div className="flex flex-col">
                            <Form.Item<TFormProps> name="firstname" label="First Name" rules={[{ required: true, message: 'First Name is required' }]}>
                                <Input placeholder='First Name e.g. Angela' />
                            </Form.Item>
                            <Form.Item<TFormProps> name="lastname" label="Last Name" rules={[{ required: true, message: 'Last Name is required' }]}>
                                <Input placeholder='Last Name e.g. Jones' />
                            </Form.Item>
                            <div className="relative">
                                <Tooltip trigger={["click"]} title="Owner can do everything | Admin can perform adding and deleting role | User can only view (cannot perform any action)">
                                    <IoInformationCircleOutline className="absolute top-0 left-12" />
                                    <Form.Item<TFormProps> name="role" label="Rank" initialValue={"User"} rules={[{ required: true, message: 'Rank is required' }]}>
                                        <Select
                                            options={Object.entries($Enums.Role).reverse().map(([key, value]) => ({ key, label: key, value }))}
                                        />
                                    </Form.Item>
                                </Tooltip>
                            </div>
                            <Form.Item<TFormProps> name="status" label="Status" initialValue={"Pending"} rules={[{ required: true, message: 'Status is required' }]}>
                                <Select
                                    options={Object.entries($Enums.Status).map(([key, value]) => ({ key, label: key, value }))}
                                />
                            </Form.Item>
                            <Form.Item<TFormProps> name="email" label="Email Address" className='col-span-2' rules={[{ required: true, message: 'Email Address is required' }, { type: "email", message: "Please, enter a valid email address" }]}>
                                <Input type="email" placeholder='Email e.g. Angelajones@gmail.com' />
                            </Form.Item>
                            <Form.Item<TFormProps> name="password" label="Password" rules={[{ required: data ? false : true, message: 'Password is required' }]}>
                                <Input type="password" placeholder='********' minLength={6} />
                            </Form.Item>
                            <Form.Item<TFormProps> name="confirmPassword" label="Confirm Password" rules={[{ required: data ? false : true, message: 'Confirm Password is required' }]}>
                                <Input type="password" placeholder='Confirm Password' />
                            </Form.Item>
                        </div>
                        <button onClick={() => form.submit()} type="submit" disabled={loading} className="md:col-span-2 rounded-sm py-2 px-5 md:px-8 w-max bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><GrUserWorker className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit Admin' : 'Create Admin'}</button>
                    </Form>
                </div>
            </section >
        </main >
    )
}
