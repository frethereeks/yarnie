"use client"
import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { fileUpload } from '@/lib'
import { updateUser } from '@/action'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import Image from 'next/image'
// import Image from 'next/image'

type TProfileProps = {
    id: string
    firstname: string
    lastname: string
    email: string
    image: string
    password: string
    confirmPassword: string
    verifyPassword: string
}

export default function ProfileForm({ data }: { data: User }) {
    const [form] = Form.useForm<TProfileProps>()
    const router = useRouter()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [imageName, setImageName] = useState<string>("Click to Upload Image")
    const [image, setImage] = useState<string>("")

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files![0]
        setImageName(file.name)
        console.log('file', file)
        if (file.size > 1500000) {
            toast.error(`File size is too large. It must not be more than 1.5MB`, {id: "8206"})
        }
        else {
            setImageName(file.name)
            const data = await fileUpload(file) as unknown as string
            form.setFieldValue("image", data)
            setImage(data)
        }
    }

    const handleSubmit = async (values: TProfileProps) => {
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            const data = await updateUser(formData)
            if (data?.error) toast.error(data?.message, { id: "8206" })
            else {
                toast.success(data?.message, { id: "8206" })
                router.refresh()
            }
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <aside className="relative bg-white rounded-md p-4 shad flex justify-between items-center gap-4">
                <div className="flex-1">
                    <h2 className="font-bold font-eugusto text-text heading-three">{data.firstname} {data.lastname}</h2>
                    <p className="text-small">This is your profile information as seen by others.</p>
                </div>
                <div className="bg-primary top-0 right-0 w-20 h-full z-20 border absolute overflow-hidden">
                    {data.image && <Image src={data.image} alt="Preview Image" className={`w-full h-full absolute object-contain object-center flex-shrink-0 flex`} fill />}
                </div>
            </aside>
            <aside className='rounded-md'>
                <Form
                    onFinish={(values) => {
                        console.log('values', values)
                        handleSubmit(values)
                    }}
                    disabled={loading}
                    form={form}
                    size='middle'
                    className='grid lg:grid-cols-2 gap-4'
                >
                    <Form.Item<TProfileProps> name="id" className='mt-0' style={{ display: "none" }}>
                        <Input value={data?.id} required />
                    </Form.Item>
                    <div className="bg-white flex flex-col p-4">
                        <div className="flex flex-col -mb-4">
                            <label htmlFor="image" className="text-slate-700">Food Image <span className="text-xs opacity-80 font-sans">(maximum of 1.5MB)</span></label>
                            <Form.Item<TProfileProps> name="image">
                                <label htmlFor="image" className="border bg-light-secondary rounded-md h-20 p-8 cursor-pointer grid place-items-start text-slate-700 relative" style={{ padding: 32, marginBottom: 8 }}>
                                    <input type="file" onChange={handleFileUpload} defaultValue={data?.image ?? ""} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 hidden cursor-pointer" style={{ opacity: 0 }} /> {imageName}
                                    <div className="bg-secondary top-0 right-0 w-20 h-full z-20 absolute overflow-hidden">
                                        {
                                            image &&
                                            <Image src={image} alt="Preview Image" className={`h-full w-full top-0 left-0 absolute object-contain object-center flex-shrink-0 ${image ? 'flex' : 'hidden'}`} />
                                        }
                                    </div>
                                </label>
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="firstname">First Name</label>
                            <Form.Item<TProfileProps> name="firstname" className='mt-0' initialValue={data.firstname}>
                                <Input placeholder='Enter First Name' required value={data.firstname}  />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastname">Last Name</label>
                            <Form.Item<TProfileProps> name="lastname" initialValue={data.lastname}>
                                <Input placeholder='Enter Last Name' required value={data.lastname}  />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <Form.Item<TProfileProps> name="email" initialValue={data.email}>
                                <Input type='email' placeholder='Enter Email' required value={data.email} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="bg-white flex flex-col p-4 h-max">
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <Form.Item<TProfileProps> name="password">
                                <Input type='password' placeholder='Enter Password (Leave empty to keep your current password)' />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Form.Item<TProfileProps> name="confirmPassword">
                                <Input type='password' placeholder='Confirm Password' />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="verifyPassword">Verify Password</label>
                            <Form.Item<TProfileProps> name="verifyPassword">
                                <Input type='password' placeholder='Verify Password to Save Changes' required />
                            </Form.Item>
                        </div>
                        <Button disabled={loading} htmlType='submit' className='button bg-primary text-white w-max'>Update Profile</Button>
                    </div>
                </Form>
            </aside>
        </>
    )
}
