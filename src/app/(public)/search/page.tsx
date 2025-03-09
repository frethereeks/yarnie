import React from 'react'
import { fetchSearch } from '@/action'
import { redirect } from 'next/navigation'
import { appRoutePaths } from '@/routes/paths'
import SearchContainer from '@/modules/search/SearchContainer'

type PageProps = {
    searchParams: {
        q?: string
    }
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q } = searchParams
    if (!q) {
        redirect(appRoutePaths.home)
    }
    const res = await fetchSearch(q.trim())

    return (
        <main className='relative flex flex-col'>
            <section className="relative py-10 lg:py-20 px-4 text-center bg-primary shadow-lg shadow-text/10">
                <div className="container mx-auto flex justify-center items-center gap-2">
                    <h4 className='heading-three text-light-secondary font-inspiration'>Your Search</h4>
                    <h2 className={`heading-two text-white capitalize font-medium font-eugusto max-w-xl`}>&ldquo;{q}&rdquo;</h2>
                    <p className={`text-default leading-none font-urbanist text-light-secondary text-default max-w-xl`}>returned {res?.data?.length} results</p>
                </div>
            </section>
            <SearchContainer search={res?.data} />
        </main>
    )
}
