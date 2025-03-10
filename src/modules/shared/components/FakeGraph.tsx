"use client"
import React from 'react'
import { Button, Tooltip, Select } from 'antd';
import { Bar, Pie, Line, LineConfig, } from '@ant-design/charts';
import { THEME_COLOR } from '@/config/theme';

export default function FakeGraph() {
    const data = [
        { year: '1951', value: 38 },
        { year: '1952', value: 52 },
        { year: '1956', value: 61 },
        { year: '1957', value: 145 },
        { year: '1958', value: 48 },
    ];

    const config = {
        data,
        xField: 'value',
        yField: 'year',
        seriesField: 'value',
        legend: { position: 'top-left' },
        autoFit: true,
        title: "Daily Overview",
        colorField: [],
    };
    const configLine: LineConfig = {
        data,
        xField: 'value',
        yField: 'year',
        seriesField: 'value',
        legend: { position: 'top-left' },
        autoFit: true,
        title: "Daily Overview",
        colorField: ["green", "blue", "red"],
        label: {x: "Overview", y: "Total Returns"},
        borderColor: THEME_COLOR.secondary,
        backgroundColor: THEME_COLOR.primary,
    };


    return (
        <>
            <div className="p-4">
                <Tooltip title="This is a tooltip">
                    <Button type="primary">Hover Me</Button>
                </Tooltip>
                <div className="z-30 relative">
                    <Select
                        dropdownStyle={{zIndex: 999 }}
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
                <div className="mt-8 border border-primary">
                    <Bar {...config} />
                </div>
                <div className="mt-8 border border-primary">
                    <Pie {...config} />
                </div>
                <div className="mt-8 border border-primary">
                    <Line {...configLine}  />
                </div>
            </div>

        </>
    )
}
