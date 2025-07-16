"use client"
import React from 'react'
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'
import Aos from "aos"
import { App as AntdApp } from "antd"
import { ClientProvider } from './ClientProvider'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        Aos.init({
            duration: 3000,
            once: true
        })
    }, [])
    return (
        <ClientProvider>
            <AntdApp>
                <ConfigProvider theme={appThemeConfig}> {children} </ConfigProvider>
            </AntdApp>
        </ClientProvider>
    )
}
