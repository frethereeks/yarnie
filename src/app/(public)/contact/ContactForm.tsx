"use client"

import React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'antd/es/form/Form';
import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { THEME_COLOR } from '@/config/theme';

type TFormProps = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
}

export default function ContactForm() {
    const [form] = useForm<TFormProps>()
    // const formRef = useRef<HTMLFormElement | null>(null)
    // const [inputs, setInputs] = useState({
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     phone: "",
    //     message: ""
    // })

    const handleSubmit = async (data: TFormProps) => {
        try {
            // const sendInputs = await Form
            console.log('data', data)
            form.resetFields()
            toast.success(`Thank you for your message ${data.firstname}. We will treat it as important`, { id: "123", duration: 3000 })
        } catch (error) {
            console.log({ error })
            toast.error(`Something went wrong. Please, try again`, { id: "123", duration: 3000 })
        }
        return false;
    }

    return (
        <aside className="relative flex flex-col py-5">
            <Form form={form} layout='vertical' onFinish={handleSubmit} className="grid sm:grid-cols-2 gap-x-2 md:gap-x-4 w-full bg-white p-4">
                <div className="flex flex-col gap-1">
                    {/* <label htmlFor="firstname" className="text-sm text-text">First Name</label> */}
                    <Form.Item<TFormProps> name="firstname" label="First Name" rules={[{required: true, message: 'First Name is required'}]}>
                        <Input name="firstname" placeholder="Sunday" />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    {/* <label htmlFor="lastname" className="text-sm text-text">Last Name</label> */}
                    <Form.Item<TFormProps> name="lastname" label="Last Name" rules={[{required: true, message: 'Last Name is required'}]}>
                        <Input name="lastname" placeholder="Anjorin" />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    {/* <label htmlFor="email" className="text-sm text-text">Email</label> */}
                    <Form.Item<TFormProps> name="email" label="Email" rules={[{required: true, message: 'email is required'}, {type: "email", message: "Please, enter a valid email"}]}>
                        <Input type="email" name="email" placeholder="myniceaddress@gmail.com" />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    {/* <label htmlFor="phone" className="text-sm text-text">Phone</label> */}
                    <Form.Item<TFormProps> name="phone" label="Phone">
                        <div className="flex gap-1 text-text text-sm lg:text-base bg-light-grey">
                            <div className="flex-shrink-0 grid place-items-center pl-4">+234</div>
                            {/* <input onChange={handleInputChange} type="phone" name="phone" id="phone" maxLength={10} required placeholder='Phone Number e.g. 7082592560' className="flex-1 py-3" /> */}
                            <InputNumber name="phone" maxLength={10} placeholder='Phone Number e.g. 7082592560' className="flex-1 py-3 bg-light-grey" style={{background: THEME_COLOR['light-grey'], border: 0}} />
                        </div>
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                    {/* <label htmlFor="message" className="text-sm text-text">Message</label> */}
                    <Form.Item<TFormProps> name="message" label="Message" rules={[{required: true, message: 'Message is required'}]}>
                        <TextArea rows={5} name="message" placeholder="Tell us. We always listen..." className='resize-none' />
                    </Form.Item>
                </div>
                <button type='submit' className=" md:col-span-2 flex-shrink-0 flex items-center gap-2 w-max px-10 lg:px-8 py-2 rounded-md bg-primary text-white text-sm cursor-pointer font-play"> Send Message</button>
            </Form>
        </aside>
    )
}
