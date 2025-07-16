"use client"
import { useState } from "react"
import { Modal, Table, TableProps } from 'antd'
import { FaRegTrashCan } from "react-icons/fa6";
import React from 'react'
import { PRODUCT_COLUMNS } from './column'
import { TCategory, TProductProps } from "@/types";
import { DeleteModal } from "@/components";
import { AddProduct } from "./components";
import { $Enums } from "@prisma/client";
import { IDENTIFIED_ACTIONS } from "@/constants";
import { statusUpdate } from "@/lib";
import { useRouter } from "next/navigation";

type PageProps = {
    data: TProductProps[] | undefined
    category: TCategory[] | undefined
    role: $Enums.Role
}

export default function ProductsContainer({ data, category, role }: PageProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [uploadModal, setUploadModal] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<TProductProps>()
    const router = useRouter()

    React.useEffect(() => {
        setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
        // eslint-disable-next-line
    }, [selectedRowKeys])

    const handleAction = async(action: IDENTIFIED_ACTIONS, id: string, value?: string) => {
        if (action === "edit") {
            setSelectedData(data?.find(el => el.id === id))
            setUploadModal(true)
        }
        else if (action === "delete") {
            setSelectedRowKeys([id])
            setDeleteModal(true)
        }
        else if (action === "status") {
            await statusUpdate({ data: [id], table: "product", value: value! })
            router.refresh()
        }
    }

    const rowSelection: TableProps<TProductProps>["rowSelection"] = {
        selectedRowKeys,
        type: "checkbox",
        onChange(keys: React.Key[]) {
            if (role === "User") {
                return false;
            }
            else setSelectedRowKeys(keys)
        }
    }

    const resetSelected = () => {
        setSelectedRowKeys([])
        setSelectedData(undefined)
    }

    return (
        <>
            {/* Delete Modal */}
            <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='product' resetSelected={resetSelected} />

            {/* Add Product Modal */}
            <Modal open={uploadModal} afterClose={resetSelected} onCancel={() => setUploadModal(false)} footer={null}>
                <AddProduct data={selectedData} category={category} closeModal={setUploadModal} />
            </Modal>

            {/* Show Product Table */}
            <>
                <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll relative overflow-y-Visible'>

                    <div className="flex bg-white justify-between gap-4 p-4">
                        <h4 className="text-primary text-lg md:text-xl font-semibold">Shop Information</h4>
                        <div className="flex-1 flex gap-2 justify-end pr-6 sm:pr-0">
                            <button onClick={() => setUploadModal(true)} className="button bg-gradient-to-tr from-primary to-primary/90 py-1">+ Product</button>
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
                            columns={PRODUCT_COLUMNS(handleAction)}
                        />
                    </div>
                </section>
            </>
        </>
    )
}
