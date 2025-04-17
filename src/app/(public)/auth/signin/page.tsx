import React from 'react'
import LoginForm from './LoginForm'
import { Metadata } from 'next'
import { ASSETS_URL } from '@/assets';
import Image from 'next/image';
// import { Header3 } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: "The Yarnie - Signin",
  description: "Food for the body is not enough. There must be food for the soul.",
};

export default async function SigninPage() {
  return (
    <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:min-h-screen'>
      <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:min-h-full bg-white">
        <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
          <Image src={ASSETS_URL["surene_palvie_loom"]} alt={"surene_palvie_loom"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
        </aside>
        <LoginForm />
      </section>
    </main>
  )
}
