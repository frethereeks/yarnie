"use client"
import { Header3 } from '@/components/ui/Typography'
import React from 'react'
import { Form, Input, InputNumber } from "antd"
import { CldUploadWidget } from 'next-cloudinary'


type TFormDataProps = {
    name: string
    description: string
    image: string | File
    price: number
}

/* 
import { CldUploadWidget } from 'next-cloudinary';
 
<CldUploadWidget signatureEndpoint="<API Endpoint (ex: /api/sign-cloudinary-params)>">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
*/

export default function AdminUploadPage() {
    const [form] = Form.useForm<TFormDataProps>()

    const handleSubmit = async (data: TFormDataProps) => {
        console.log('data', data)
    }

    return (
        <main className='flex flex-col'>
            <section className="py-10 lg:py-20 px-4">
                <div className="container mx-auto">
                    <Header3>Food Upload</Header3>
                    <Form
                        form={form}
                        onFinish={(data) => {
                        handleSubmit(data)
                        }}
                        className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-slate-400 text-sm">Food Name</label>
                            <Form.Item<TFormDataProps> name="name">
                                <Input type='text' placeholder='Enter Food Name' />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="text-slate-400 text-sm">Food Price</label>
                            <Form.Item<TFormDataProps> name="price">
                                <InputNumber type='number' placeholder='Enter Food Price' />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="text-slate-400 text-sm">Food Description</label>
                            <Form.Item<TFormDataProps> name="description">
                                <Input type='text' placeholder='Enter Food Description' />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="text-slate-400 text-sm">Food Description</label>
                            <Form.Item<TFormDataProps> name="image">
                                <CldUploadWidget signatureEndpoint={"/api/sign-image"}>
                                    {({ open }) => {
                                        return <button onClick={() => open()} className="py-2 px-6 bg-primary text-white cursor-pointer">Upload File</button>
                                    }}
                                </CldUploadWidget>
                            </Form.Item>
                        </div>
                        <button className="py-2 px-6 rounded-md cursor-pointer bg-primary text-white">Create Food</button>
                    </Form>
                </div>
            </section>
        </main>
    )
}
