import { ASSETS_URL } from "@/assets";
import { IDENTIFIED_ACTIONS } from "@/constants";
import { TUserProps } from "@/types";
import { $Enums } from "@prisma/client";
import { Button, Dropdown, TableColumnsType } from "antd";
import Image from "next/image";
import { AiOutlineEdit, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";

export const USER_COLUMNS = (handleAction: (action: IDENTIFIED_ACTIONS, id: string, value?: string) => void): TableColumnsType<TUserProps> => {
    return [
        {
            key: "User Details",
            title: "User Details",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1 my-1 cursor-pointer" onClick={() => handleAction("view", val.id)}>
                    <div className="h-8 w-8 md:h-9 md:w-9 flex-shrink-0 relative bg-primary rounded-md overflow-hidden">
                        <Image src={val.image ?? ASSETS_URL['logo']} alt={`${val.firstname} ${val.lastname}`} fill className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm md:text-base font-semibold whitespace-nowrap text-primary">{val.firstname} {val.lastname}</h4>
                        <p className="leading-none text-xs font-normal whitespace-nowrap text-secondary opacity-70">{val.role}</p>
                    </div>
                </div>
            )
        },
        {
            key: "Email",
            title: "Email",
            render: (_, val) => (
                <span className="leading-none text-sm font-normal whitespace-nowrap text-primary">{val.email}</span>
            )
        },
        {
            key: "Date Added",
            title: "Date Added",
            render: (_, val) => (
                <span className="leading-none text-sm font-normal whitespace-nowrap text-primary">{new Date(val.createdAt!).toDateString()}</span>
            )
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <div className="flex items-center gap-2">
                    <p className="leading-none text-xs font-medium whitespace-nowrap text-primary/80">{val.status}</p>
                    <Dropdown
                        placement="bottomRight"
                        trigger={["click"]}
                        menu={{
                            items: Object.values($Enums.Status).map((value) => (
                                {
                                    key: value,
                                    label: value,
                                    onClick: () => handleAction("status", val.id, value)
                                }
                            ))
                        }}
                    >
                        <Button title="Change" icon={<AiOutlineEdit className="text-secondary" />} type="text" />
                    </Dropdown>
                </div>
            )
        },
        {
            key: "Action",
            title: "Action",
            render: (_, val) => (
                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: [
                            {

                                key: "Edit",
                                label: "Edit",
                                icon: <AiOutlineEdit />,
                                onClick: () => handleAction("edit", val.id)
                            },
                            {
                                key: "Delete",
                                label: "Delete",
                                icon: <FaRegTrashCan />,
                                onClick: () => handleAction("delete", val.id)
                            },
                        ]
                    }}
                >
                    <Button title="Actions" type="text" icon={<AiOutlineEllipsis />} />
                </Dropdown>
            )
        },
    ]
}
