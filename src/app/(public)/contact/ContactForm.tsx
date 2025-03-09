"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { GrSend } from "react-icons/gr";
import toast from 'react-hot-toast';
import { useForm } from 'antd/es/form/Form';
import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type TFormProps = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
}

export default function ContactForm() {
    const [form] = useForm<TFormProps>()
    const formRef = useRef<HTMLFormElement | null>(null)
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (data: TFormProps) => {
        try {
            // const sendInputs = await Form
            form.resetFields()
            toast.success(`Thank you for your message ${inputs.firstname}. We will treat it as important`, { id: "123", duration: 3000 })
        } catch (error) {
            console.log({ error })
            toast.error(`Something went wrong. Please, try again`, { id: "123", duration: 3000 })
        }
        return false;
    }

    return (
        <aside className="relative flex flex-col py-5">
            <Form form={form} onFinish={handleSubmit} className="grid sm:grid-cols-2 gap-x-2 md:gap-x-4 w-full bg-white p-4">
                <div className="flex flex-col">
                    <label htmlFor="firstname" className="text-sm text-text">First Name</label>
                    <Form.Item<TFormProps> className="border" name="firstname">
                        <Input name="firstname" required placeholder="Sunday" />
                    </Form.Item>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastname" className="text-sm text-text">Last Name</label>
                    <Form.Item<TFormProps> className="border" name="lastname">
                        <Input name="lastname" required placeholder="Anjorin" />
                    </Form.Item>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm text-text">Email</label>
                    <Form.Item<TFormProps> className="border" name="email">
                        <Input type="email" name="email" required placeholder="sundy149@gmail.com" />
                    </Form.Item>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm text-text">Phone</label>
                    <Form.Item<TFormProps> className="border" name="phone">
                        <div className="flex gap-1 px-4 text-text text-sm lg:text-base rounded-[3rem] bg-white">
                            <div className="flex-shrink-0 grid place-items-center">+234</div>
                            {/* <input onChange={handleInputChange} type="phone" name="phone" id="phone" maxLength={10} required placeholder='Phone Number e.g. 7082592560' className="flex-1 py-3" /> */}
                            <InputNumber name="phone" maxLength={10} placeholder='Phone Number e.g. 7082592560' className="flex-1 py-3" />
                        </div>
                    </Form.Item>
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label htmlFor="message" className="text-sm text-text">Message</label>
                    <Form.Item<TFormProps> className="border" name="message">
                        <TextArea rows={5} name="message" placeholder="Tell us. We always listen..." />
                    </Form.Item>
                </div>
                <button type='submit' className=" md:col-span-2 flex-shrink-0 flex items-center gap-2 w-max px-10 lg:px-8 py-2 lg:py-3 rounded-md bg-primary text-white text-lg md:text-xl cursor-pointer font-urbanist"> Send Message</button>
            </Form>
        </aside>
    )
}
