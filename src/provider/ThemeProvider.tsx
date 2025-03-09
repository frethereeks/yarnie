import React from 'react'
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ConfigProvider theme={appThemeConfig}> {children} </ConfigProvider>
        </div>
    )
}
