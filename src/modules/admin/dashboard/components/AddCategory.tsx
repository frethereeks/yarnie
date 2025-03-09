"use client"

import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Header3 } from '@/components/ui/Typography'
import { createCategory, updateCategory } from '@/action'
import { useRouter } from 'next/navigation'
import { Form, Input } from 'antd'
import { $Enums, Category } from '@prisma/client'
import { LuActivity } from 'react-icons/lu'

type TFormProps = Pick<Category, "id" | "name" | "status">

export default function AddCategory({ closeModal, data }: { data?: TFormProps, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const statusRef = useRef<HTMLSelectElement | null>(null)
    const router = useRouter()
    const [form] = Form.useForm<TFormProps>()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data?.name,
                status: data?.status,
                id: data.id,
            })
            if(statusRef.current) statusRef.current.value = data?.status
        }
        else {
            form.resetFields()
        }
    }, [data, form])

    const handleSubmit = async (values: TFormProps) => {
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        setLoading(true)
        let data;
        try {
            values.status = statusRef.current?.value as $Enums.FoodStatus
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            if (values.id) {
                data = await updateCategory(formData)
            }
            else {
                data = await createCategory(formData)
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
                    <Header3>{data ? "Edit" : "Create"} Menu Category</Header3>
                    <Form
                        form={form}
                        onFinish={(data) => {
                            handleSubmit(data)
                        }}
                        className="flex flex-col mt-4">
                        <div className="flex flex-col">
                            {data?.id &&
                                <Form.Item<TFormProps> name="id" style={{ height: 0 }}>
                                    <Input hidden placeholder='' required style={{ visibility: "hidden", height: 0 }} />
                                </Form.Item>
                            }
                            <Form.Item<TFormProps> name="name">
                                <Input placeholder='Category Name' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="status" className="text-slate-400 text-sm">Category Status</label>
                                <Form.Item<TFormProps> name="status">
                                    <select
                                        ref={statusRef}
                                        id='status'
                                        style={{ border: "1px solid #ddd", color: "#aaa", padding: ".51rem" }}
                                        className='relative z-40 bg-white rounded-md w-full cursor-pointer'
                                    >
                                        {
                                            Object.entries($Enums.FoodStatus).map(([key, value]) => <option key={key} className='relative' value={value}>{value}</option>)
                                        }
                                    </select>
                                </Form.Item>
                            </div>
                        </div>
                        <button onClick={() => form.submit()} type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><LuActivity className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit Record' : 'Create Record'}</button>
                    </Form>
                </div>
            </section>
        </main >
    )
}
