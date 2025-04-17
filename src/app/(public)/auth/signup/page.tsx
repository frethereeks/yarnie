import React from 'react'
import SignupForm from './SignupForm'
// import Image from 'next/image'
import { Metadata } from 'next'
import Image from 'next/image';
import { ASSETS_URL } from '@/assets';
// import bcryptjs from "bcryptjs"

export const metadata: Metadata = {
  title: "The Yarnie - Signup",
  description: "Food for the body is not enough. There must be food for the soul.",
};

export default async function SignupPage() {
      // const salt = await bcryptjs.genSalt(10)
      // const password = await bcryptjs.hash("Fredericks", salt)
      // console.log({ password })

  return (
    <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:min-h-screen'>
      <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:min-h-full bg-white">
        <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
          <Image src={ASSETS_URL["surene_palvie"]} alt='surene_palvie' className='object-cover object-top opacity-80' fill />
        </aside>
        <SignupForm />
      </section>
    </main>
  )
}