"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { RiCamera2Line, RiVerifiedBadgeFill } from "react-icons/ri";
import { useForm } from 'antd/es/form/Form';
import { Form, Input, App } from 'antd';
import { TUser } from '@/types';
import { fileUpload } from '@/lib';
import { updateUser, updateUserImage } from '@/action';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type TAdminSecurityProps = {
    password: string
    newPassword: string
    confirmpassword: string
}

type TProfileProps = Omit<TUser, "image"> & {
    image: string | File
}

export default function SettingsContainer({ data }: { data: TUser }) {
    const { notification } = App.useApp()
    const [activeForm, setActiveForm] = useState<"info" | "security">("info")
    const [form] = useForm<TProfileProps>()
    const [passForm] = useForm<TAdminSecurityProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [image, setImage] = useState<{ name: string, value: string }>({
        name: "Click to Upload Image",
        value: data?.image || ""
    })
    const router = useRouter()
    const { update, data: session } = useSession()


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e?.target?.files![0]
        if (file.size > 2 * 1024 * 1024) {
            notification.error({ message: 'Please, upload a picture not greater than 2MB', key: "123" })
            return false;
        }
        setImage((prev) => ({ ...prev, name: file.name }))
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("image", file)
        setImage(prev => ({ ...prev, value: data }))
        setLoading(false)
    }

    const handleProfileImageUpload = async () => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        // let image = imageRef?.current?.files![0] as unknown as File;
        const formImage = form.getFieldValue("image")
        const formData = new FormData()
        formData.append("image", formImage)
        formData.append("id", data.id)
        formData.append("oldImageName", data.image ?? "")

        try {
            const res = await updateUserImage(formData)
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
                // Update the server session to show real-time session update
                update({
                    ...session,
                    user: {
                        ...session?.user,
                        image: data.image
                    }
                })
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
        } finally {
            setLoading(false)
        }
    }

    const handleInfoSubmit = async (values: TProfileProps) => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => formData.append(key, value as (string | Blob)))
            formData.append("oldImage", data.image as string)
            const res = await updateUser(formData, "info")
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
        } finally {
            setLoading(false)
        }
    }

    const handleSecuritySubmit = async (values: TAdminSecurityProps) => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            const res = await updateUser(formData, "security")
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='flex flex-col lg:flex-row gap-4'>
            <aside className="card flex flex-col gap-8 w-full lg:max-w-[20rem] py-10">
                <div className="hidden lg:flex flex-col items-center py-4">
                    <div className="relative h-[10rem] w-[10rem] rounded-full mx-auto bg-primary flex-shrink-0">
                        {image.value && <Image src={image.value} alt={data.firstname} className="object-cover object-top h-[10rem] w-[10rem] rounded-full" fill />}
                        <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-blue-500 bottom-4 right-2 text-xl">
                            <RiVerifiedBadgeFill />
                        </div>
                    </div>
                    <h4 className="flex-1 text-base pt-4 text-dark-text font-semibold">{data.firstname} {data.lastname}</h4>
                    <p className="flex-1 text-xs text-text opacity-80 font-medium">{data.email}</p>
                </div>
                <h4 className="text-base lg:text-lg text-text font-semibold pl-4">Account</h4>
                <div className="flex flex-row lg:flex-col -mt-5">
                    <button onClick={() => setActiveForm("info")} className={`text-sm flex justify-center lg:justify-start font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "info" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-2 border-secondary lg:border-b-transparent' : 'lg:border-l-4 lg:border-transparent'} `}>Personal Information</button>
                    <button onClick={() => setActiveForm("security")} className={`text-sm flex justify-center lg:justify-start font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "security" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-2 border-secondary lg:border-b-transparent' : 'lg:border-l-4 lg:border-transparent'} `}>Login & Security</button>
                </div>
            </aside>
            <aside className='card flex-1 flex flex-col gap-0'>
                {
                    activeForm === "info" ?
                        <Form
                            onFinish={handleInfoSubmit}
                            form={form}
                            className={`w-full max-w-xl flex-1 flex flex-col gap-0 overflow-hidden`}
                        >
                            <h4 className="text-sm md:text-lg font-bold text-text p-4 border-l-4 border-secondary py-2 mb-8">Basic Info</h4>
                            <div className="flex flex-col lg:flex-row gap-4 p-4">
                                <h4 className="w-[10rem] text-base pt-4 text-text font-semibold">Profile Picture:</h4>
                                <Form.Item<TProfileProps> noStyle name={"image"} initialValue={data.image}>
                                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6">
                                        <label htmlFor='profileImage' className="relative cursor-pointer h-20 w-20 rounded-full bg-primary flex-shrink-0">
                                            <input ref={imageRef} type="file" onChange={handleFileUpload} name="image" id="profileImage" accept='.jpg, .jpeg, .png' className="hidden opacity-0" />
                                            <Image src={image?.value} alt={data.firstname} className="object-cover object-top h-20 w-20 rounded-full" fill />
                                            <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-text bottom-4 -right-2 text-lg">
                                                <RiCamera2Line />
                                            </div>
                                        </label>
                                        <div className="flex-1 flex gap-4">
                                            <button disabled={loading || image.value === data?.image} type={"button"} onClick={handleProfileImageUpload} className="button disabled:cursor-not-allowed bg-secondary hover:bg-secondary/90">Upload Photo</button>
                                            <button disabled={loading || image.value === data?.image} type={"button"} onClick={() => setImage({ name: data?.firstname, value: data?.image as string })} className="button disabled:cursor-not-allowed hover:bg-background/50 bg-transparent border border-danger/40 hover:border-text/20 text-tertiary px-6 font-normal">Delete</button>
                                        </div>
                                    </div>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-0 p-4">
                                <h4 className="w-[10rem] text-sm text-text font-medium">First Name:</h4>
                                <Form.Item<TProfileProps> name="firstname" noStyle className='flex-1' initialValue={data?.firstname} rules={[{ required: true, message: "Firstname is required" }]}>
                                    <Input type='text' placeholder={`First Name e.g. ${data?.firstname}`} required className='border border-background bg-white rounded-sm p-3' />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-0 p-4">
                                <h4 className="w-[10rem] text-sm text-text font-medium">Last Name:</h4>
                                <Form.Item<TProfileProps> name="lastname" noStyle className='flex-1' initialValue={data?.lastname} rules={[{ required: true, message: "Lastname is required" }]}>
                                    <Input type='text' placeholder={`Last Name e.g. ${data?.lastname}`} required className='border border-background bg-white rounded-sm p-3' />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-0 p-4">
                                <h4 className="w-[10rem] text-sm text-text font-medium">Email:</h4>
                                <Form.Item<TProfileProps> name="email" noStyle className='flex-1' initialValue={data?.email} rules={[{ required: true, message: "Email is required" }]}>
                                    <Input type='email' placeholder={`Email e.g. ${data?.email}`} required className='border border-background bg-white rounded-sm p-3' />
                                </Form.Item>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button disabled={loading} type='submit' className="button bg-primary font-semibold">Save Changes</button>
                            </div>
                        </Form>
                        :
                        <Form
                            onFinish={handleSecuritySubmit}
                            form={passForm}
                            className={`w-full max-w-xl flex-1 flex flex-col gap-0 overflow-hidden`}
                        >
                            <h4 className="text-sm md:text-lg font-semibold text-text p-4 border-l-4 border-secondary py-2 flex gap-2 ">Password Update <button className="bg-background text-text text-xs font-normal py-0.5 px-2 rounded-sm">Security</button> </h4>
                            <p className="leading-none text-xs font-normal whitespace-nowrap text-primary opacity-70 pb-6 px-5 my-4">Fill out this form if you wish to update your password.</p>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 px-4">
                                <h4 className="w-[10rem] text-sm text-text font-medium">New Password:</h4>
                                <Form.Item<TAdminSecurityProps> name="newPassword" className='flex-1' rules={[{ required: true, message: "New Password is required" }, { min: 8, message: "Password must be a minimum of 8 characters" }]}>
                                    <Input type='password' placeholder={`Use a Strong Password`} className='border border-background bg-white rounded-sm p-3' />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 px-4">
                                <h4 className="w-[10rem] text-sm text-text font-medium">Confirm Password:</h4>
                                <Form.Item<TAdminSecurityProps> name="confirmpassword" className='flex-1' rules={[{ required: true, message: "Confirm Password is required" }, { min: 8, message: "Password must be a minimum of 8 characters" }]}>
                                    <Input type='password' placeholder={`Use a Strong Password`} className='border border-background bg-white rounded-sm p-3' />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 px-4">
                                <h4 className="w-[10rem] text-sm text-text font-medium">Current Password:</h4>
                                <Form.Item<TAdminSecurityProps> name="password" className='flex-1' rules={[{ required: true, message: "You must enter your current password" }]}>
                                    <Input type='text' placeholder={`Old Password`} className='border border-background bg-white rounded-sm p-3' />
                                </Form.Item>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button disabled={loading} className="button bg-primary font-semibold">Update Password</button>
                            </div>
                        </Form>
                }
            </aside>
        </main>
    )
}
