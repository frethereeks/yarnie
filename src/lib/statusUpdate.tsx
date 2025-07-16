import { updateEntity } from "@/action"
import { IDENTIFIED_TABLES } from "@/constants"
import { notification } from "antd"

type TPageProps = {
    data: React.Key[],
    table: IDENTIFIED_TABLES
    value: string
}

export const statusUpdate = async ({ data, table, value }: TPageProps) => {
    notification.info({ message: `Please wait while your request is being processed...`, key: "8206" })
    try {
        const res = await updateEntity(JSON.stringify(data), value, table)
        if (res?.error) notification.error({ message: res?.message, key: "8206" })
        else {
            notification.success({ message: res?.message, key: "8206" })
        }
    } catch (error) {
        notification.error({ message: `Something went wrong. Due to ${error}`, key: "8206" })
    } finally {
    }
}