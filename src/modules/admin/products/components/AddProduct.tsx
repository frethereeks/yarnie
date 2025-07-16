"use client"
import { Header3 } from '@/components/ui/Typography'
import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select } from "antd"
import { fileUpload } from '@/lib'
import TextArea from 'antd/es/input/TextArea'
import { TCategory, TProductProps } from '@/types'
import toast from 'react-hot-toast'
import { createProduct, updateProduct } from '@/action'
import { useRouter } from 'next/navigation'
import { $Enums } from '@prisma/client'
import Image from 'next/image'
import { GrGallery, GrMoney } from 'react-icons/gr'


export default function AddProduct({ closeModal, data, category }: { data?: TProductProps, category: TCategory[] | undefined, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [form] = Form.useForm<TProductProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<{ name: string, value: string }>({
        name: "Click to Upload Image",
        value: ""
    })
    const router = useRouter()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data.id,
                name: data.name,
                image: data?.image,
                qtyAvailable: data?.qtyAvailable,
                categoryId: data?.categoryId,
                popular: data?.popular,
                price: data?.price,
                status: data?.status,
                description: data?.description,
            })
            setImage(prev => ({ ...prev, value: data.image }))
        }
        else {
            form.resetFields()
        }
    }, [data, form])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e?.target?.files![0]
        setImage((prev) => ({ ...prev, name: file.name }))
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("image", file)
        setImage(prev => ({ ...prev, value: data }))
        setLoading(false)
    }

    const handleSubmit = async (values: TProductProps) => {
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        setLoading(true)
        let res;
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => formData.append(key, value as string | Blob))
            if (values.id) {
                formData.append("oldImage", data?.image as string)
                res = await updateProduct(formData)
            }
            else {
                res = await createProduct(formData)
            }
            if (res?.error) toast.error(res?.message, { id: "8206" })
            else {
                toast.success(res?.message, { id: "8206" })
                router.refresh()
            }
            closeModal(false)
            form.resetFields()
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }

    }

    return (
        <main className='flex flex-col'>
            <section className="container mx-auto px-4 divide-y divide-slate-200">
                <Header3 className='pb-2'>{data ? "Edit" : "Create"} Product</Header3>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={(data) => {
                        handleSubmit(data)
                    }}
                    className="flex flex-col">
                    {data?.id &&
                        <Form.Item<TProductProps> name="id" noStyle>
                            <Input hidden className='hidden opacity-0' required />
                        </Form.Item>
                    }
                    <div className="flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="relative flex-1 flex flex-col md:flex-row md:items-center gap-1">
                                <label htmlFor='image' className="gap-1 h-44 md:h-60 cursor-pointer border relative">
                                    <Form.Item<TProductProps> name="image" rules={[{ required: true, message: "Product Image is required" }]} noStyle className='-my-4'>
                                        <Input type="file" onChange={handleFileUpload} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer z-20" />
                                        <div className="flex-1 absolute top-0 left-0 min-h-44 md:h-60 w-full rounded-md overflow-hidden bg-text flex-shrink-0 grid place-items-center">
                                            {image.value ? <Image src={image?.value} alt={"Preview Image"} className="object-cover object-center top-0 left-0" fill /> : <GrGallery className='text-white text-4xl md:text-6xl' />}
                                        </div>
                                    </Form.Item>
                                </label>
                            </div>
                            <div className="flex-1 flex flex-col justify-center md:pt-6">
                                <Form.Item<TProductProps> name="name" label="Product Name" rules={[{ required: true, message: "Product Name is required" }]}>
                                    <Input type='text' placeholder='Enter Product Name' />
                                </Form.Item>
                                <Form.Item<TProductProps> name="price" label="Product Price" rules={[{ required: true, message: "Product Price is required" }]}>
                                    <InputNumber type='number' placeholder='Enter Product Price' min={100} style={{ width: '100%' }} className='w-full' />
                                </Form.Item>
                                <Form.Item<TProductProps> name="qtyAvailable" label="Quantity Available" rules={[{ required: true, message: "Quantity Available is required" }]}>
                                    <InputNumber type='number' placeholder='Enter Product Price' min={1} style={{ width: '100%' }} className='w-full' />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="flex-1 w-full mt-0 md:mt-2">
                            <Form.Item<TProductProps> name="popular" label="Show on Home Page?" className='w-full my-0 md:mt-5' initialValue={true} rules={[{ required: true, message: 'Popularity Status is required' }]}>
                                <Select
                                    id='categoryId'
                                    className='relative z-40 bg-white rounded-md w-full cursor-pointer'
                                    options={[false, true].map((value) => ({
                                        key: value.valueOf(),
                                        label: value ? "Yes" : "No",
                                        value: value
                                    }))}
                                    onChange={event => console.log({ event })}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item<TProductProps> name="categoryId" label="Category" initialValue={data?.categoryId} rules={[{ required: true, message: 'Category is required' }]}>
                            <Select
                                id='categoryId'
                                className='relative z-40 bg-white rounded-md w-full cursor-pointer'
                                options={category?.reverse().map((value) => ({
                                    key: value.id,
                                    label: value.name,
                                    value: value.id
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<TProductProps> name="status" label="Visibility Status" initialValue={"Visible"}>
                            <Select
                                id='status'
                                className='relative z-40 bg-white rounded-md w-full cursor-pointer'
                                options={Object.entries($Enums.FoodStatus).map(([key, value]) => ({
                                    key,
                                    label: key,
                                    value
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<TProductProps> name="description" label="Product Description" rules={[{ required: true, message: "Product Description is required" }]}>
                            <TextArea cols={10} rows={5} placeholder='Enter Product Description' />
                        </Form.Item>
                        <button disabled={loading} className="w-max py-2 px-6 rounded-md cursor-pointer bg-primary text-white flex justify-center items-center gap-2"><GrMoney className="text-sm text-inherit" />{loading ? 'Processing...' : data ? 'Edit Product' : 'Create Product'}</button>
                    </div>
                </Form>
            </section >
        </main >
    )
}
