"use client"

import { TUserProps } from '@/types'
import React, { useState } from 'react'
import { Modal, Table, TableProps } from 'antd'
import { AddUser } from './components';
import { USER_COLUMNS } from './columns';
import { $Enums } from '@prisma/client';
import { DeleteModal } from '@/components';
import { statusUpdate } from '@/lib';
import { useRouter } from 'next/navigation';
import { IDENTIFIED_ACTIONS } from '@/constants';
import { FaRegTrashCan } from 'react-icons/fa6';

type PageProps = {
    data: TUserProps[],
    role: $Enums.Role
}

export default function UsersContainer({ data, role }: PageProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [uploadModal, setUploadModal] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<TUserProps>()
    const router = useRouter()

    React.useEffect(() => {
        setSelectedData(data.find(el => el.id === selectedRowKeys[0]))
        // eslint-disable-next-line
    }, [selectedRowKeys])

    const rowSelection: TableProps<TUserProps>["rowSelection"] = {
        selectedRowKeys,
        type: "checkbox",
        onChange(keys: React.Key[]) {
            setSelectedRowKeys(keys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.role === "Owner",
            name: record.role
        }),
    }

    const handleAction = async (action: IDENTIFIED_ACTIONS, id: string, value?: string) => {
        if (action === "view" || action === "edit") {
            setSelectedData(data?.find(el => el.id === id))
            setUploadModal(true)
        }
        else if (action === "delete") {
            setSelectedRowKeys([id!])
            setDeleteModal(true)
        }
        else if (action === "status") {
            await statusUpdate({ data: [id], table: "user", value: value! })
            router.refresh()
        }
    }

    const resetSelected = () => {
        setSelectedRowKeys([])
        setSelectedData(undefined)
    }

    return (
        <>
            <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='user' resetSelected={resetSelected} />
            <Modal open={uploadModal} afterClose={resetSelected} onCancel={() => setUploadModal(!uploadModal)} footer={null}>
                <AddUser data={selectedData} closeModal={setUploadModal} router={router} />
            </Modal>
            <>
                <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll'>
                    <div className="flex bg-white justify-between gap-4 p-4">
                        <h4 className="text-primary text-lg md:text-xl font-semibold">Admin Information</h4>
                        <div className="flex-1 flex gap-2 justify-end pr-6 sm:pr-0">
                            {role === "Owner" && <button onClick={() => setUploadModal(!uploadModal)} className="button bg-gradient-to-tr from-primary to-primary/90 py-1">+ Admin</button> }
                            {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-tertiary px-3 flex items-center gap-2"><FaRegTrashCan /></button>}
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
                            dataSource={role === "User" ? data : data?.map(el => ({ ...el, key: el.id }))}
                            columns={USER_COLUMNS(handleAction)}
                        />
                    </div>
                </section>
            </>
        </>
    )
}
