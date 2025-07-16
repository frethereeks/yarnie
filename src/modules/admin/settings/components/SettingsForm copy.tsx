"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, notification } from 'antd'
import { fileUpload } from '@/lib'
import { updateUser } from '@/action'
import { useRouter } from 'next/navigation'
import { YnUser } from '@prisma/client'
import Image from 'next/image'

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

export default function SettingsForm({ data }: { data: YnUser }) {
    console.log({data})
    const [form] = Form.useForm<TProfileProps>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string>("Click to Upload Image")
    const [image, setImage] = useState<string>(data.image || "")
    const imageRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        form.setFieldsValue({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            image: data.image as string,
            email: data.email,
        })
    }, [data, form])

    console.log({ changedImage: (image !== data.image) })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files![0]
        setImageName(file.name)
        if (file.size > 1500000) {
            notification.error({ message: `File size is too large. It must not be more than 1.5MB`, key: "123"})
        }
        else {
            setImageName(file.name)
            const data = await fileUpload(file) as unknown as string
            form.setFieldValue("image", file)
            setImage(data)
        }
    }

    const handleSubmit = async (values: TProfileProps) => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                if (key === "image") formData.append(key, imageRef?.current?.files![0] as Blob)
                else formData.append(key, value as string)
            })
            formData.append("changedImage", (image !== data.image) as unknown as string)
            formData.append("oldImage", data.image as string)
            console.log({formData})
            const res = await updateUser(formData, "info")
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                form.setFieldValue("verifyPassword", "")
                router.refresh()
            }
        } catch (error) {
            notification.error({ message: `Something went wrong. Due to ${error}`, key: "123" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <aside className="relative bg-white rounded-md p-4 shad flex justify-between items-center gap-4">
                <div className="flex-1">
                    <h2 className="font-bold font-capriola text-text heading-three">{data.firstname} {data.lastname}</h2>
                    <p className="text-small">This is your profile information as seen by others.</p>
                </div>
                <div className="bg-primary top-0 right-0 w-20 h-full z-20 border absolute overflow-hidden">
                    {data.image && <Image src={data.image} alt="Preview Image" className={`w-full h-full absolute object-contain object-center flex-shrink-0 flex`} fill />}
                </div>
            </aside>
            <aside className='rounded-md'>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    size='middle'
                    layout='vertical'
                    className='grid lg:grid-cols-2 gap-4'
                >
                    <Form.Item<TProfileProps> name="id" className='mt-0' style={{ display: "none" }}>
                        <Input value={data?.id} required />
                    </Form.Item>
                    <div className="bg-white flex flex-col p-4">
                        <div className="flex flex-col -mb-4">
                            <label htmlFor="image" className="text-slate-700">Profile Image <span className="text-xs opacity-80 font-sans">(maximum of 1.5MB)</span></label>
                            <Form.Item<TProfileProps> name="image">
                                <label htmlFor="image" className="border bg-light-secondary rounded-md h-20 p-8 cursor-pointer grid place-items-start text-slate-700 relative" style={{ padding: 32, marginBottom: 8 }}>
                                    <input ref={imageRef} type="file" onChange={handleFileUpload} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 hidden cursor-pointer" style={{ opacity: 0 }} /> {imageName}
                                    <div className="bg-secondary top-0 right-0 w-20 h-full z-20 absolute overflow-hidden">
                                        {
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={image} alt="Preview Image" className={`h-full w-full top-0 left-0 absolute object-cover object-center flex-shrink-0 ${image !== "" ? 'flex' : 'hidden'}`} />
                                        }
                                    </div>
                                </label>
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="firstname">First Name</label>
                            <Form.Item<TProfileProps> name="firstname" className='mt-0'>
                                <Input placeholder='Enter First Name' required />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastname">Last Name</label>
                            <Form.Item<TProfileProps> name="lastname">
                                <Input placeholder='Enter Last Name' required />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <Form.Item<TProfileProps> name="email">
                                <Input type='email' placeholder='Enter Email' required />
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
                        <button disabled={loading} type='submit' className='button bg-primary text-white w-max flex items-center gap-1'>
                            {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : ""}
                            {loading ? 'Processing...' : 'Update Profile'}</button>
                    </div>
                </Form>
            </aside>
        </>
    )
}
