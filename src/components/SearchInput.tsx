"use client"

import { appRoutePaths } from '@/routes/paths'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export default function SearchInput() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const queryTerm = encodeURI(searchTerm)
        router.push(`${appRoutePaths.search}?q=${queryTerm}`)
    }

    return (
        <>
            <form onSubmit={handleSearch} className='relative w-full flex items-center gap-2'>
                <input type="search" name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} id="search" placeholder='Search...' required minLength={3} className="flex-1 px-2 py-1 text-sm lg:text-base text-text" />
                <button className="bg-transparent grid place-items-center text-primary text-base md:text-lg cursor-pointer"><IoSearchOutline /></button>
            </form>
        </>
    )
}
