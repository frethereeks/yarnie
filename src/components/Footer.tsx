// import { ASSETS_URL } from '@/constants'
// import Image from 'next/image'
import { appRoutePaths } from '@/routes/paths'
import Link from 'next/link'
import React from 'react'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io'
import { Header3, Header4, Para2 } from './ui/Typography'

export default function Footer() {
  return (
    <footer className='bg-background py-10 px-4'>
      <div className="container mx-auto relative grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-text">
        <aside className="flex flex-col gap-3">
          <Header3 className='text-text leading-none'>BC<span className='text-secondary leading-none'>Lounge</span></Header3>
          <Header4 className='text-text md:pt-6'>Location</Header4>
          <Para2 className="opacity-90 leading-loose lg:max-w-xs md:pr-4">F01 Building Market, Kubwa, Abuja-FCT, Nigeria</Para2>
        </aside>
        <aside className="flex flex-col sm:justify-center gap-4">
          <Header4 className='text-text'>Quick Links</Header4>
          <div className="flex flex-col text-base md:text-base opacity-90">
            <Link href={appRoutePaths.home} className="leading-loose">Home</Link>
            {/* <Link href={appRoutePaths.menu} className="leading-loose">Menu</Link> */}
            <Link href={appRoutePaths.about} className="leading-loose">About</Link>
            <Link href={appRoutePaths.contact} className="leading-loose">Contact</Link>
          </div>
        </aside>
        <aside className="flex flex-col sm:justify-end gap-3 md:gap-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <Header4 className='text-text'>Opening Hours</Header4>
            <div className="flex flex-col text-base md:text-base opacity-90">
              <p className="leading-loose">Monday - Saturday</p>
              <p className="leading-loose">08:30 AM - 05:00 PM</p>
              <Link href={"tel: +2349069071120"} className="leading-loose">Tel: +2349069071120</Link>
            </div>
          </div>
          <Header4 className='text-text'>Socials</Header4>
          <div className="flex gap-4 text-base md:text-base opacity-90">
            <Link href={'https://www.facebook.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose"><IoLogoFacebook /></Link>
            <Link href={'https://www.twitter.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose"><IoLogoTwitter /></Link>
            <Link href={'https://www.instagram.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose"><IoLogoInstagram /></Link>
            <Link href={'https://www.youtube.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose"><IoLogoYoutube /></Link>
          </div>
        </aside>
      </div>
    </footer>
  )
}
