"use client"
import React, { useState } from 'react'
// import { shopData } from '@/data';
import { ProductCard } from '@/modules/shared';
import { Select } from 'antd';
// import { TProductProps } from '@/data/shopData';
import { TProductProps } from '@/types';

type TSortProps = {
    id: string;
    value: "all" | "low" | "high"
    text: string;
}

export default function PBProductsContainer({ shopData }: { shopData: TProductProps[] | undefined }) {
    const [allData, setAllData] = useState<TProductProps[] | undefined>(shopData)
    const [data, setData] = useState<TProductProps[] | undefined>(shopData)

    const sortOrder: TSortProps[] = [{ id: "x823z613z80", value: "all", text: "Default Sort" }, { id: "x823z613z81", value: "low", text: "Lowest to Highest" }, { id: "x823z613z82", value: "high", text: "Highest to Lowest" }]

    const handleChange = (value: "all" | "low" | "high") => {
        if (value === "all") {
            setData(allData)
            setAllData(allData)
        }
        else if (value === "high") {
            setData(() => allData?.sort((a, b) => b.price - a.price))
        }
        else setData(() => allData?.sort((a, b) => a.price - b.price))
    }

    // console.log({shopImages: shopData?.map(el => ({name: el.name, image: el.image.valueOf()}))})

    return (
        <>
            <section className="px-4 bg-background" id='shop-container'>
                <div className="container mx-auto flex flex-col gap-4 md:gap-6 py-10 md:py-20">
                    <div className="flex justify-between items-center gap-4 py-2 border-b border-secondary">
                        <h3 className="heading-four text-primary font-capriola">All Products</h3>
                        <div className="w-max min-w-sm">
                            <Select
                                onChange={handleChange}
                                defaultValue={sortOrder[0].value}
                                options={
                                    sortOrder.map(el => (
                                        {
                                            key: el.id,
                                            label: el.text,
                                            value: el.value
                                        }
                                    ))
                                }
                            />
                        </div>
                        {/* <select className="border border-slate-200 rounded-md w-max h-10 grid place-items-center pl-1.5 overflow-hidden bg-white text-text text-sm placeholder:text-text placeholder:text-sm">
                            <optgroup className='text-primary' label='Price'>
                                <option value="low" className="bg-white text-sm text-text">Lowest to Highest</option>
                                <option value="high" className="bg-white text-sm text-text">Highest to Lowest</option>
                            </optgroup>
                        </select> */}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {
                            data?.map(product => (<ProductCard key={product.id} {...product} />))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
