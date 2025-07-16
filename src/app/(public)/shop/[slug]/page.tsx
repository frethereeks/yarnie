import React from 'react'
// import { getPageMenu, getSinglePageMenu } from '@/action';
// import { MenuCard, SlugAddBtn } from '@/components';
// import { Header1, Header2, Header3 } from '@/components/ui/Typography';
import Image from 'next/image';
import { ProductCard, SlugAddBtn } from '@/modules/shared';
import { fetchHomeData, fetchSingleProducts } from '@/action';

type TPageParams = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const res = await fetchHomeData({showHidden: true});
    if (res?.data?.products) {
        return res?.data?.products.map(el => ({ slug: el.slug }));
    }
    else return [];
}

export async function generateMetadata({ params: { slug } }: TPageParams) {
    const res = await fetchSingleProducts({ slug })
    return {
        title: `${res?.data?.product?.name}'s Details`,
        description: res?.data?.product?.description,
    }
}

export default async function SingleFoodPage({ params: { slug } }: TPageParams) {
    const res = await fetchSingleProducts({ slug })
    // const data = res?.data?.menu
    // const similar = res?.data?.similar
    const data = res?.data?.product
    const similar = res?.data?.otherProducts
    
    return (
        // <main className='relative flex flex-col bg-[#d9d9d9]'>
        <main className='relative flex flex-col bg-white'>
            <section className="py-5 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto lg:px-10 grid lg:grid-cols-2 md:gap-8 lg:justify-center">
                    {
                        data ?
                            <>
                                <aside className="relative min-h-64 overflow-hidden bg-[#d9d9d9] rounded-xl py-4">
                                    {data && data.qtyAvailable === 0 && <span className="py-1 px-2 rounded-md bg-tertiary text-white text-xs absolute top-2 right-1 z-30">Out of Stock</span>}
                                    <Image src={data?.image || ""} alt={data?.name ?? "Food Image"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                </aside>
                                <aside className="relative flex flex-col gap-2 md:gap-4 py-10">
                                    <h3 className={`text-primary text-3xl md:text-4xl font-bold font-capriola sm:max-w-sm`}>{data?.name}</h3>
                                    <p className={`font-medium opacity-70 text-text text-base lg:text-lg text-balance sm:max-w-lg`}>{data?.description}</p>
                                    <button disabled={data?.qtyAvailable === 0} className="flex items-center gap-4 py-2 disabled:hover:cursor-not-allowed">
                                        <SlugAddBtn key={"8023460234"} {...data!} />
                                    </button>
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
                        <h3 className="heading-four text-primary font-capriola">{data ? "Similar" : "Other"} Products</h3>
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
