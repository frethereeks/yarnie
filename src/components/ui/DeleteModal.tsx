"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteEntity } from '@/action'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd'
import { IDENTIFIED_TABLES } from '@/constants'


export default function DeleteModal({ closeModal, data, openModal, table }: { data?: React.Key[], table: IDENTIFIED_TABLES, openModal: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true)
        toast.loading(`Please wait while your request is being processed...`, { id: "8206" })
        try {
            const res = await deleteEntity(JSON.stringify(data), table)
            if (res?.error) toast.error(res?.message, { id: "8206" })
            else {
                toast.success(res?.message, { id: "8206" })
                router.refresh()
            }
            toast.success(`${res?.message}`, { id: "8206" })
            router.refresh()
            closeModal(prev => !prev)
        } catch (error) {
            toast.error(`Something went wrong. Due to ${error}`, { id: "8206" })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Modal open={openModal} onCancel={() => closeModal(prev => !prev)} onOk={handleDelete} okButtonProps={{ disabled: loading }} className="py-6">
                <h3 className="heading-three py-4">Confirm Delete of {data?.length} Records</h3>
                <p className="text-xsmall font-urbanist font-medium">Are you sure you want to proceed with this ? This action is not reversible</p>
            </Modal>
        </>
    )
}
