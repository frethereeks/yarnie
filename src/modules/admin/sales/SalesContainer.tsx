"use client"

import { TSaleProps } from '@/types'
import React, { useState } from 'react'
import { Modal, Table, TableProps } from 'antd'
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { AddSale } from './components';
import { SALES_COLUMNS } from './columns';
import { DeleteModal } from '@/components';
import { $Enums } from '@prisma/client';

type PageProps = {
    data: TSaleProps[] | undefined,
        role: $Enums.Role
}

export default function SalesContainer({ data, role }: PageProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [uploadModal, setUploadModal] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<TSaleProps>()

    React.useEffect(() => {
        setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
        // setSelectedRowKeys(selectedRowKeys)
        //eslint-disable-next-line
    }, [selectedRowKeys])

    const rowSelection: TableProps<TSaleProps>["rowSelection"] = {
        selectedRowKeys,
        type: "checkbox",
        onChange(keys: React.Key[]) {
            setSelectedRowKeys(keys)
        }
    }

    return (
        <>
            <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='sales' />
            <Modal open={uploadModal} afterClose={() => {
                setSelectedRowKeys([])
                setSelectedData(undefined)
            }} onCancel={() => setUploadModal(!uploadModal)} cancelButtonProps={{ style: { width: "93.5%", marginLeft: "0", marginRight: "1rem" } }} okButtonProps={{ style: { display: "none" } }}>
                <AddSale data={selectedData} closeModal={setUploadModal} />
            </Modal>
            <>
                <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll'>
                    <div className="flex bg-white justify-between gap-4 p-4">
                        <div className="flex items-center gap-2">
                            <h4 className="text-text text-lg md:text-xl font-semibold pr-4">Sales Information</h4>
                            <button onClick={() => setUploadModal(!uploadModal)} className="button bg-secondary py-1">Create Record</button>
                        </div>
                        <div className="flex gap-2">
                            {(selectedRowKeys.length === 1) && <button onClick={() => setUploadModal(!uploadModal)} className="button flex items-center gap-2"><BsPencil /> Edit</button>}
                            {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-secondary flex items-center gap-2"><AiOutlineDelete /> Delete Selected</button>}
                        </div>
                    </div>
                    <div className="card bg-white flex flex-col p-4">
                        <Table
                            pagination={{
                                hideOnSinglePage: true,
                                // pageSize: 10,
                                showSizeChanger: false,
                                showQuickJumper: false,
                            }}
                            scroll={{ x: "max-content" }}
                            rowSelection={{ ...rowSelection }}
                            dataSource={role === "USER" ? data : data?.map(el => ({ ...el, key: el.id }))}
                            columns={SALES_COLUMNS()}
                        />
                    </div>
                </section>
            </>
        </>
    )
}
