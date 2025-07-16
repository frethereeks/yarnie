"use client"
import { TOrderProps } from '@/types'
import React, { useState } from 'react'
import { Modal, Table, TableProps } from 'antd'
import { ORDERS_COLUMNS } from './columns';
import { DeleteModal } from '@/components';
import { $Enums } from '@prisma/client';
import { IDENTIFIED_ACTIONS } from '@/constants';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { statusUpdate } from '@/lib';
import ViewOrders from './components/ViewOrders';

type PageProps = {
    data: TOrderProps[] | undefined,
    role: $Enums.Role
}

export default function OrdersContainer({ data, role }: PageProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [uploadModal, setUploadModal] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<TOrderProps>()
    const router = useRouter()

    React.useEffect(() => {
        setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
        //eslint-disable-next-line
    }, [selectedRowKeys])

    const rowSelection: TableProps<TOrderProps>["rowSelection"] = {
        selectedRowKeys,
        type: "checkbox",
        onChange(keys: React.Key[]) {
            setSelectedRowKeys(keys)
        }
    }

    const handleAction = async (action: IDENTIFIED_ACTIONS, id: string, value?: string) => {
        if (action === "view") {
            setSelectedData(data?.find(el => el.id === id))
            setUploadModal(true)
        }
        else if (action === "delete") {
            setSelectedRowKeys([id!])
            setDeleteModal(true)
        }
        else if (action === "status") {
            await statusUpdate({ data: [id], table: "order", value: value! })
            router.refresh()
        }
    }

    const resetSelected = () => {
        setSelectedRowKeys([])
        setSelectedData(undefined)
    }

    return (
        <>
            {/* Delete Modal */}
            <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='order' resetSelected={resetSelected} />

            {/* View Order Items Modal */}
            <Modal open={uploadModal} afterClose={resetSelected} onCancel={() => setUploadModal(!uploadModal)} footer={null}
                style={{ maxWidth: 'none', width: '80vw !important' }}
                className='wide-modal'
                centered
                rootClassName='max-w-none w-[80vw]'
            >
                <ViewOrders role={role} data={selectedData} key={"84y7zsox1-zskp20"} />
            </Modal>

                    {/* Show Orders Table */}
            <>
                <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll'>
                    <div className="flex bg-white justify-between gap-4 p-4">
                        <h4 className="text-primary text-lg md:text-xl font-semibold">Order Information</h4>
                        <div className="flex-1 flex gap-2 justify-end pr-6 sm:pr-0">
                            <button onClick={() => setUploadModal(!uploadModal)} className="button bg-gradient-to-tr from-primary to-primary/90 py-1">+ Order</button>
                            {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-tertiary px-3 flex items-center gap-2"><FaRegTrashCan /></button>}
                        </div>
                    </div>
                    <div className="card bg-white flex flex-col p-4">
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
                            dataSource={role === "User" ? data : data?.map(el => ({ ...el, key: el.id }))}
                            columns={ORDERS_COLUMNS(handleAction)}
                        />
                    </div>
                </section>
            </>
        </>
    )
}
