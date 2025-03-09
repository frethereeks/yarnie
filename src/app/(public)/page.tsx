// import { getPageMenu } from "@/action";
// import FakeGraph from "@/components/FakeGraph";
// import FakeSection from "@/components/FakeSection";
import { ASSETS_URL } from "@/assets";
import { yarnData } from "@/data";
import { appRoutePaths } from "@/routes/paths";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaCaretRight } from "react-icons/fa";
// import Image from "next/image";


export const metadata: Metadata = {
  title: "Yarnie Crotchet - Home",
  description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default async function Home() {
  // const res = await getPageMenu()
  // const menu = res.data?.menu

  return (
    <>
      <main className="flex flex-col bg-background">
        <section className='bg-white px-4'>
          <div className="container mx-auto py-10 lg:my-10 lg:px-10 flex flex-col md:flex-row gap-4 lg:justify-center">
            <aside className="flex-1 relative z-10 flex flex-col justify-center gap-4 py-5 md:py-10 md:px-4">
              <h1 className="text-5xl md:text-5xl text-secondary font-bold font-serif lg:max-w-md">Hand-hooked goods made with love.</h1>
              <p className="font-montserrat text-text text-base text-justify leading-loose lg:max-w-md">The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It&apos;s a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.</p>
              {/* <p className="font-montserrat text-text text-base text-justify lg:max-w-md">Explore the shop for more gift ideas.</p> */}
              <Link href={appRoutePaths.shop} className="group button bg-primary text-sm text-white font-bold rounded-sm flex items-center gap-1 w-max uppercase py-2">SHOP NOW <FaCaretRight className="text-sm md:text-base group-hover:translate-x-2" /></Link>
            </aside>
            <aside className="flex-1 relative bg-transparent rounded-xl min-h-60 row-start-1 md:row-span-2 grid place-items-center">
              <div className="h-60 w-60 md:w-80 md:h-80 mx-auto grid place-items-center rounded-full relative before:absolute before:w-[120%] before:h-[120%] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-pink-200">
                <Image src={ASSETS_URL['yarn_wool']} alt='yarn_wool' className="object-center object-cover z-20" fill />
              </div>
            </aside>
          </div>
        </section>
        <section className="px-4 bg-background">
          <div className="container mx-auto flex flex-col gap-4 md:gap-6 py-10 md:py-20">
            <div className="flex justify-between items-center gap-4 py-2 border-b border-secondary">
              <h3 className="heading-four text-primary font-serif">Newest Arrivals</h3>
              <Link href={appRoutePaths.shop} className="text-xsmall">View all products</Link>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              <div className="relative h-40 md:h-60 bg-border overflow-hidden rounded-sm md:rounded-md">
                <Image src={ASSETS_URL['crochet_beach_bag_pattern']} alt='crochet_beach_bag_pattern' className="object-center object-cover z-20" fill />
              </div>
              <div className="relative h-40 md:h-60 bg-border overflow-hidden rounded-sm md:rounded-md">
                <Image src={ASSETS_URL['surene_palvie_plate']} alt='surene_palvie_plate' className="object-center object-cover z-20" fill />
              </div>
              <div className="relative h-40 md:h-60 bg-border overflow-hidden rounded-sm md:rounded-md">
                <Image src={ASSETS_URL['surene_palvie_loom']} alt='surene_palvie_loom' className="object-center object-cover z-20" fill />
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 bg-white">
          <div className="container mx-auto flex flex-col gap-4 md:gap-8 py-10 md:py-20">
            {
              yarnData.slice(0,2).map((yarn,i) => (
              <aside key={yarn.id} className={`flex ${i % 2 === 0 ? 'flex-col-reverse md:flex-row-reverse' : ''} gap-4 md:gap-6 w-full max-w-4xl mx-auto`}>
                <div className="flex-1 relative z-10 flex flex-col justify-center gap-4 py-5 md:py-10 md:px-4">
                  <h4 className="text-3xl md:text-3xl text-secondary text-center md:text-justify font-bold font-serif lg:max-w-md">{yarn.name}</h4>
                  <p className="font-montserrat text-text text-base text-center md:text-justify leading-loose lg:max-w-md">{yarn.description}</p>
                </div>
                <div className="flex-1 relative bg-transparent rounded-xl min-h-60 row-start-1 md:row-span-2 grid place-items-center">
                  <div className={`h-56 w-56 md:w-72 md:h-72 mx-auto grid place-items-center rounded-full relative before:absolute before:w-[120%] before:h-[120%] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full ${i % 2 === 0 ? 'before:bg-[#e6e6e6]' : 'before:bg-sky-200'}`}>
                    <Image src={yarn.image} alt={yarn.image.toString()} className="object-center object-cover z-20 rounded-full" fill />
                  </div>
                </div>
              </aside>
              ))
            }
            <Link href={appRoutePaths.about} className="border-2 border-primary rounded-md w-max mx-auto px-6 py-2 text-base text-primary bg-white hover:bg-primary hover:text-white">Read more</Link>
          </div>
        </section>
        <section className="relative py-20 md:py-40 px-4 bg-primary">
          <Image src={ASSETS_URL['surene_palvie_loom']} alt='surene_palvie_loom' className="object-center object-cover opacity-30" fill />
          <div className="relative container mx-auto flex flex-col justify-center items-center gap-4 md:gap-6">
            <h4 className="text-2xl md:text-3xl text-center text-white font-bold font-serif w-full max-w-xl">We deliver the best hand-stitched yarn products you would ever see!</h4>
            <Link href={appRoutePaths.about} className="border-2 border-white rounded-md w-max mx-auto px-6 py-2 text-base text-white bg-transparent hover:bg-white hover:text-primary">Check it out</Link>
          </div>
        </section>

              {/* <FakeGraph /> */}
        {/* <PopularSection data={menu} />
        <AboutSection />
        <HappyClientSection /> */}
        {/* <Newsletter /> */}
      </main>
    </>
  );
}
