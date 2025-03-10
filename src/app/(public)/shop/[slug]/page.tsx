import React from 'react'
// import { getPageMenu, getSinglePageMenu } from '@/action';
// import { MenuCard, SlugAddBtn } from '@/components';
// import { Header1, Header2, Header3 } from '@/components/ui/Typography';
import Image from 'next/image';
import { shopData } from '@/data';
import { ProductCard, SlugAddBtn } from '@/modules/shared';

type TPageParams = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    // const res = await getPageMenu();
    // if (res?.data?.menu) {
    //     return res.data.menu.map(el => ({ slug: el.slug }));
    // }
    // return [];
    // const res = shopData.map()
    return shopData.map(el => ({ slug: el.slug })) || [];
}

export async function generateMetadata({ params: { slug } }: TPageParams) {
    // const res = await getSinglePageMenu({ slug })
    // return {
    //     title: `${res?.data?.menu?.name}'s Details`,
    //     description: res?.data?.menu?.description,
    // }
    const res = shopData.find(el => el.slug === slug)
    return {
        title: `${res?.name}'s Details`,
        description: res?.description,
    }
}

export default async function SingleFoodPage({ params: { slug } }: TPageParams) {
    // const res = await getSinglePageMenu({ slug })
    // const data = res?.data?.menu
    // const similar = res?.data?.similar
    const data = shopData.find(el => el.slug === slug)
    const similar = shopData.filter(el => el.id !== data?.id)
    return (
        // <main className='relative flex flex-col bg-[#d9d9d9]'>
        <main className='relative flex flex-col bg-white'>
            <section className="py-5 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto lg:px-10 grid lg:grid-cols-2 md:gap-8 lg:justify-center">
                    {
                        data ?
                            <>
                                <aside className="relative min-h-64 overflow-hidden bg-[#d9d9d9] rounded-xl py-4">
                                    <Image src={data?.image || ""} alt={data?.name ?? "Food Image"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                </aside>
                                <aside className="relative flex flex-col gap-2 md:gap-4 py-10">
                                    <h3 className={`text-primary text-3xl md:text-4xl font-bold font-sofia sm:max-w-sm`}>{data?.name}</h3>
                                    <p className={`font-medium opacity-70 text-text text-base lg:text-lg text-balance sm:max-w-lg`}>{data?.description}</p>
                                    <div className="flex items-center gap-4 py-2">
                                        <SlugAddBtn key={"8023460234"} {...data!} />
                                    </div>
                                </aside>
                            </>
                            :
                            <>
                                <div className="flex flex-col items-center justify-center h-[70vh]">
                                    <div className="flex flex-col gap-2 md:gap-4 py-10">
                                        <h3 className='text-secondary font-inspiration'>No Product Found</h3>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </section>
            <section className="bg-background py-10 px-4">
                <div className="container mx-auto flex flex-col gap-6 md:gap-8">
                    <div className="flex justify-between items-center gap-4 py-2 border-b border-secondary">
                        <h3 className="heading-four text-primary font-serif">{data ? "Similar" : "Other"} Products</h3>
                    </div>
                    <aside className="md:px-8 lg:px-10 grid grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {similar?.length ? similar?.filter(el => el.popular !== true).slice(0, 6).map(product => (
                            <ProductCard key={product.id} {...product} />
                        )) : []
                        }
                    </aside>
                </div>
            </section>
        </main>
    )
}
