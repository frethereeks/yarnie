"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Header1, Header3 } from '@/components/ui/Typography'
import { GrSend } from "react-icons/gr";
import toast from 'react-hot-toast';
import { ASSETS_URL } from '@/assets';
import Image from 'next/image';

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [inputs, setInputs] = useState({
        fullname: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            // const sendInputs = await Form
            formRef.current?.reset()
            toast.success(`Thank you for your message ${inputs.fullname}. We will treat it as important`, {id: "123", duration: 3000})
        } catch (error) {
            console.log({ error })
            toast.error(`Something went wrong. Please, try again`, {id: "123", duration: 3000})
        }
    }

  return (
      <section className='bg-primary py-10 lg:py-20 px-4'>
          <div className="container mx-auto md:px-8 lg:px-10 rounded-xl grid lg:grid-cols-2 gap-4 lg:gap-8 justify-center">
              <aside className="relative overflow-hidden bg-light-secondary rounded-xl before:absolute before:right-0 before:bottom-3 before:z-10 before:w-20 before:h-8 before:bg-transparent before:backdrop-blur-sm">
                  <Image src={ASSETS_URL["yarn_woolbox"]} alt={"yarn_woolbox"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
              </aside>
              <aside className="relative flex flex-col py-5">
                  <Header3 className='text-secondary font-inspiration'>Place an Order or</Header3>
                  <Header1 className='text-white font-medium font-eugusto max-w-sm'>Reach out in minutes</Header1>
                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mt-4">
                      <input onChange={handleInputChange} type="fullname" name="fullname" id="fullname" required placeholder='Full Name e.g. Musa Saliu' className="flex-1 flex px-4 py-3 text-text text-sm lg:text-base rounded-[3rem]" />
                      <input onChange={handleInputChange} type="email" name="email" id="email" required placeholder='Email Address e.g. saliumusa@gmail.com' className="flex-1 flex px-4 py-3 text-text text-sm lg:text-base rounded-[3rem]" />
                      <div className="flex gap-1 px-4 text-text text-sm lg:text-base rounded-[3rem] bg-white">
                          <div className="flex-shrink-0 grid place-items-center">+234</div>
                          <input onChange={handleInputChange} type="phone" name="phone" id="phone" maxLength={10} required placeholder='Phone Number e.g. 7082592560' className="flex-1 py-3" />
                      </div>
                      <textarea onChange={handleInputChange} maxLength={150} name="message" id="message" cols={30} rows={5} placeholder='Tell us what you would like to get...' className="flex-1 flex p-4 text-text text-sm lg:text-base min-h-44 rounded-[1rem]"></textarea>
                      <button className="group flex-shrink-0 flex items-center gap-2 w-max px-10 lg:px-8 py-2 lg:py-3 rounded-[2rem] bg-secondary text-white text-lg md:text-xl cursor-pointer font-urbanist"> <GrSend className="text-lg md:text-xl" /> Send</button>
                  </form>
              </aside>
          </div>
      </section>
  )
}
