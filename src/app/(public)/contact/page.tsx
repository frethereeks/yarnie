import Link from 'next/link'
// import { ContactForm } from '@/components';
import { Metadata } from 'next';
import { HiOutlineLocationMarker, HiPhoneIncoming } from 'react-icons/hi';
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: "Yarnie Crotchet - Contact",
  description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default function ContactPage() {
  return (
    <main className="relative bg-background flex flex-col">
      <section className="relative py-10 lg:py-20 px-4 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-8 lg:px-10 lg:justify-center">
          <aside className="relative bg-primary text-white w-full max-w-lg rounded-md flex flex-col gap-4 md:gap-6 p-5 md:py-10">
            <div className="flex flex-col">
              <h3 className='text-secondary text-3xl md:text-4xl font-serif font-bold'>Contact us</h3>
              <p className="text-sm leading-loose">Fill out the form and our team will get back to you as soon as we can</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex-shrink-0 grid place-items-center p-2">
                <HiPhoneIncoming className="text-xl text-inherit cursor-pointer" />
              </div>
              <Link href={"tel: +2349069071120"} className="font-montserrat text-sm md:text-base max-w-md">+2349069071120</Link>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex-shrink-0 grid place-items-center p-2">
                <HiOutlineEnvelopeOpen className="text-xl text-inherit cursor-pointer" />
              </div>
              <Link href={"mailto: info@theyarnie.com"} className="font-montserrat text-sm md:text-base max-w-md">info@theyarnie.com</Link>
            </div>
            <div className="flex gap-1">
              <div className="flex-shrink-0 grid place-items-center p-2">
                <HiOutlineLocationMarker className="text-xl text-inherit cursor-pointer" />
              </div>
              <p className="font-montserrat text-sm md:text-base max-w-md">Somewhere along NYSC Camp, Kubwa, Abuja or Kebbi State, Nigeria</p>
            </div>
          </aside>
          <aside className="relative min-h-60 overflow-hidden lg:col-span-2">
            <ContactForm />
          </aside>
        </div>
      </section>
      {/* <section className='bg-primary py-10 lg:py-20 px-4'>
        <div className="container mx-auto md:px-8 lg:px-10 rounded-xl grid gap-4 lg:gap-8 justify-center">
          <aside className="relative bg-primary rounded-xl min-h-60 overflow-hidden  grid place-items-center">
            <iframe loading='lazy' allowFullScreen={false} referrerPolicy='no-referrer-when-downgrade' width="100%" height="100%" src={appRoutePaths.googleMap}></iframe>
          </aside>
        </div>
      </section> */}
      {/* <ContactForm /> */}
    </main>
  )
}
