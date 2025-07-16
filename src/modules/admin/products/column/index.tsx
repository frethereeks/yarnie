import { IDENTIFIED_ACTIONS } from "@/constants";
import { TProductProps } from "@/types";
import { $Enums } from "@prisma/client";
import { Button, Dropdown, TableColumnsType } from "antd";
// import { ItemType } from "antd/es/menu/interface";
import Image from "next/image";
import { AiOutlineEdit, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export const PRODUCT_COLUMNS = (handleAction: (action: IDENTIFIED_ACTIONS, id: string, value?: string) => void): TableColumnsType<TProductProps> => {
    return [
        {
            key: "Product Details",
            title: "Product Details",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1 my-1 cursor-pointer" onClick={() => handleAction("view", val.id)}>
                    <div className="relative h-8 w-8 md:h-10 md:w-10 flex-shrink-0 bg-secondary/20 rounded-sm">
                        <Image src={val.image} alt={val.name} fill className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" />
                        {val.popular ? <div className="absolute z-20 h-4 w-4 rounded-full grid place-items-center bg-white text-secondary -bottom-1 -right-1 text-xs">
                            <RiVerifiedBadgeFill />
                        </div> : ""}
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm md:text-base font-semibold whitespace-nowrap text-primary/80">{val.name} </h4>
                            <p className="leading-none w-max px-2 py-1 bg-background text-[.65rem] md:text-xs text-text text-left font-light whitespace-nowrap">{val.category.name}</p>
                        <div className="flex items-center gap-2">
                            {/* {val.popular ? <> • <p className="leading-none w-max px-2 py-0.5 bg-secondary text-[.65rem] text-white text-left -mt-0.5 font-light whitespace-nowrap">{val.popular ? "Popular" : ""}</p></> : ""} */}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: "Price",
            title: "Price",
            render: (_, val) => (
                <p className="text-xs md:text-sm text-dark/60 opacity-70 font-medium">&#8358;{val.price.toLocaleString()}</p>
            )
        },
        {
            key: "Qty",
            title: "Qty",
            render: (_, val) => (
                <p className="text-xs md:text-sm text-center text-dark/60 opacity-70 font-medium">{val.qtyAvailable}</p>
            )
        },
        {
            key: "Creator",
            title: "Creator",
            render: (_, val) => (
                <p className="text-xs md:text-sm text-dark/60 opacity-70 font-medium">{`${val.user.firstname} ${val.user.lastname}`}</p>
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
                            items: Object.values($Enums.FoodStatus).map((value) => (
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
            key: "Date Added",
            title: "Date Added",
            render: (_, val) => (
                <span>{new Date(val.createdAt!).toDateString()}</span>
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
