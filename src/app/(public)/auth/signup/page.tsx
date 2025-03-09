import React from 'react'
import SignupForm from './SignupForm'
// import Image from 'next/image'
// import { edimcs_bookkeeping } from '@/assets/images'
import { Metadata } from 'next'
import bcryptjs from "bcryptjs"

export const metadata: Metadata = {
  title: "BC Lounge Restaurant :: Signup",
  description: "Food for the body is not enough. There must be food for the soul.",
};

export default async function SignupPage() {
  
  
      const salt = await bcryptjs.genSalt(10)
      const password = await bcryptjs.hash("Fredericks", salt)
      console.log({ password })

  return (
    <main className="flex flex-col relative">
      <section className="flex flex-col relative bg-light-secondary">
        <div className="container mx-auto flex flex-col-reverse md:flex-row relative z-10">
          <aside className="bg-white py-5 sm:py-20 flex flex-2 flex-col justify-center relative overflow-hidden">
            <div className="max-w-xl mx-auto w-full flex flex-col justify-center py-5 sm:px-5">
              <SignupForm key={8347704} />
            </div>
          </aside>
          <aside className="relative py-20 pt-36 p-5 flex-1 flex flex-col justify-center gap-4 bg-secondary/50" style={{ textShadow: '0 0 12px #0006' }}>
            {/* <Image src={edimcs_bookkeeping} alt='edimcs loan page' fill={true} className='overlay left-0 top-0 object-cover opacity-40 blur-sm' /> */}
            <h3 className="relative text-slate-50 text-4xl sm:text-5xl md:text-6xl leading-tight font-bold max-w-md sm:max-w-xl">Welcome to <span className="relative text-primary">Al-Ameen</span><span className="text-primary">.</span></h3>
            <p className="relative text-slate-50 text-sm leading-loose max-w-lg">.</p>
          </aside>
        </div>
      </section>
    </main>
  )
}