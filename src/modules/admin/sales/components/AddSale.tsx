"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Header3 } from '@/components/ui/Typography'
import { createSale, updateSale } from '@/action'
import { useRouter } from 'next/navigation'
import { Form, Input } from 'antd'
import { Sale } from '@prisma/client'
import { GrLineChart } from 'react-icons/gr'
import moment from "moment"

type TFormProps = Pick<Sale, "id" | "alcohol" | "food" | "drink" | "createdAt" | "updatedAt">

export default function AddSale({ closeModal, data }: { data?: TFormProps, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [form] = Form.useForm<TFormProps>()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                food: data?.food,
                drink: data?.drink,
                alcohol: data.alcohol,
                createdAt: moment(data.createdAt).format("YYYY-MM-DD"),
            })
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
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            if (values.id) {
                data = await updateSale(formData)
            }
            else {
                data = await createSale(formData)
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
                    <Header3>{data ? "Edit" : "Create"} Sale Record</Header3>
                    <Form
                        form={form}
                        onFinish={(data) => {
                            handleSubmit(data)
                        }}
                        className="flex flex-col mt-4">
                        <div className="flex flex-col">
                            <Form.Item<TFormProps> name="food">
                                <Input type='number' min={0} placeholder='Total Alcohol Sold e.g. 18000' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                            <Form.Item<TFormProps> name="drink">
                                <Input type='number' min={0} placeholder='Total Drink Sold e.g. 18000' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                            <Form.Item<TFormProps> name="alcohol">
                                <Input type='number' min={0} placeholder='Total Alcohol Sold e.g. 18000' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                            {/* <Form.Item<TFormProps> name="createdAt" initialValue={data ? new Date(data.createdAt).toLocaleString().split(",")[0] : new Date().toLocaleString().split(",")[0]}> */}
                                {/* <Input type='date' defaultValue={data ? new Date(data.createdAt).toLocaleString().split(",")[0] : new Date().toLocaleString().split(",")[0]} placeholder='Date Time e.g. Jones' required style={{ border: "1px solid #666" }} /> */}
                            <Form.Item<TFormProps> name="createdAt">
                                <Input type='date' required style={{ border: "1px solid #666" }} />
                            </Form.Item>
                        </div>
                        <button onClick={() => form.submit()} type="submit" disabled={loading} className="md:col-span-2 rounded-full py-2 px-5 md:px-8 w-full bg-primary shadow-primary shadow-md text-white text-sm text-center flex-1 cursor-pointer flex items-center justify-center gap-2 mt-2"><GrLineChart className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit Record' : 'Create Record'}</button>
                    </Form>
                </div>
            </section >
        </main >
    )
}
