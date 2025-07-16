"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal, notification } from 'antd'
import { IDENTIFIED_TABLES } from '@/constants'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteEntity } from '@/action'


export default function DeleteModal({ closeModal, data, openModal, table, resetSelected = () => null }: { data?: React.Key[], table: IDENTIFIED_TABLES, openModal: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>>, resetSelected: () => void }) {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true)
        notification.info({ message: `Please wait while your request is being processed...`, key: "8206" })
        try {
            const res = await deleteEntity(JSON.stringify(data), table)
            if (res?.error) notification.error({ message: res?.message, key: "8206" })
            else {
                notification.success({ message: res?.message, key: "8206" })
                router.refresh()
            }
            // This closes the modal
            closeModal(prev => !prev)
            // This is to ensure the selectedRowKeys array reset to an empty array on the page
            resetSelected()
        } catch (error) {
            notification.error({ message: `Something went wrong. Due to ${error}`, key: "8206" })
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        closeModal(false)
        resetSelected()
    }

    return (
        <>
            <Modal
                open={openModal}
                footer={<></>}
                afterClose={resetSelected}
                onCancel={handleCancel}
                okButtonProps={{ disabled: loading }} className="py-6"
                confirmLoading
            >
                <div className="flex flex-col">
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full grid place-items-center mx-auto bg-gradient-to-tr from-tertiary to-orange-600 border border-secondary/20 text-background text-2xl md:text-4xl"><FaRegTrashCan /></div>
                    <h3 className="heading-three font-bold text-primary text-center pt-4">Confirm delete of {data?.length} {table} records</h3>
                    <p className="text-default text-primary/70 text-center font-capriola font-medium pb-4">Are you sure you want to proceed with this? This action is not reversible</p>
                    <div className="w-full flex justify-center gap-4 md:gap-10 pt-2">
                        <button onClick={() => closeModal(prev => !prev)} className="button px-8 md:px-10 bg-background/90 hover:bg-background border border-text/20 text-primary">Cancel</button>
                        <button onClick={handleDelete} disabled={loading} className="button disabled:cursor-not-allowed px-8 md:px-10 bg-primary/90 hover:bg-primary text-white flex items-center gap-2">
                            {loading ? <><span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> Deleting...</> : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
