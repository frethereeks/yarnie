"use client"
import React from 'react'
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'
import Aos from "aos"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        Aos.init({
            duration: 3000,
            once: true
        })
    }, [])
    return (
        <div>
            <ConfigProvider theme={appThemeConfig}> {children} </ConfigProvider>
        </div>
    )
}
