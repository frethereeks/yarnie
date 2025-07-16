"use client"
import { TOrderItemProps, TOrderProps } from '@/types'
import React, { useState } from 'react'
import { Table, TableProps } from 'antd'
import { DeleteModal } from '@/components';
import { $Enums } from '@prisma/client';
import { IDENTIFIED_ACTIONS } from '@/constants';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { statusUpdate } from '@/lib';
import { ORDER_ITEMS_COLUMNS } from '../columns';
import moment from 'moment';

type PageProps = {
    data: TOrderProps | undefined,
    role: $Enums.Role
}

export default function ViewOrders({ data, role }: PageProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const router = useRouter()

    const rowSelection: TableProps<TOrderItemProps>["rowSelection"] = {
        selectedRowKeys,
        type: "checkbox",
        onChange(keys: React.Key[]) {
            setSelectedRowKeys(keys)
        }
    }

    const handleAction = async (action: IDENTIFIED_ACTIONS, id: string, value?: string) => {
        if (action === "delete") {
            setSelectedRowKeys([id])
            setDeleteModal(true)
        }
        else if (action === "status") {
            await statusUpdate({ data: [id], table: "orderItems", value: value! })
            router.refresh()
        }
        else {

        }
    }

    const resetSelected = () => {
        setSelectedRowKeys([])
    }

    return (
        <>
            <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='orderItems' resetSelected={resetSelected} />
            <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll'>
                <div className="flex flex-col gap-4">
                    <h4 className="flex items-center gap-2 text-sm md:text-lg font-bold text-text px-4 border-l-4 border-secondary">Order Details <p className="leading-none px-2 py-1 bg-background text-[.65rem] md:text-xs text-text text-left font-light whitespace-nowrap">Order ID: {data?.id}</p></h4>
                    <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 md:gap-8 py-1 px-2 text-xs md:text-sm opacity-80">
                        <div className="divide-y divide-slate-200">
                            <p className="px-2 py-1">Full Name: {data?.fullname}</p>
                            <p className="px-2 py-1">Email: {data?.email}</p>
                            <p className="px-2 py-1">Address: {data?.address}</p>
                        </div>
                        <div className="divide-y divide-slate-200">
                            <p className="px-2 py-1">Total Items: {data?.YnOrderItem.length}</p>
                            <p className="px-2 py-1">Total Price: &#8358;{data?.YnOrderItem.reduce((total, el) => el.price * el.quantity + total, 0).toLocaleString()}</p>
                            <p className="px-2 py-1">Delivery Date <span className="text-xs opacity-70">(estimated)</span>: {moment(data?.delivery).fromNow()}</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-white justify-between gap-4 px-2">
                    <div className="flex items-center gap-4">
                        <h4 className="text-primary text-lg md:text-xl font-semibold">Order Information</h4>
                    </div>
                    <div className="flex-1 flex gap-2 justify-end pr-6 sm:pr-0">
                        {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-tertiary px-3 flex items-center gap-2"><FaRegTrashCan /></button>}
                    </div>
                </div>
                <div className="card bg-white flex flex-col p-2">
                    <Table
                        size='small'
                        pagination={{
                            hideOnSinglePage: true,
                            // pageSize: 10,
                            showSizeChanger: false,
                            showQuickJumper: false,
                        }}
                        scroll={{ x: "max-content" }}
                        rowSelection={{ ...rowSelection }}
                        dataSource={role === "User" ? data?.YnOrderItem : data?.YnOrderItem?.map(el => ({ ...el, key: el.id }))}
                        columns={ORDER_ITEMS_COLUMNS(handleAction)}
                    />
                </div>
            </section>
        </>
    )
}
