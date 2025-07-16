import { ASSETS_URL } from "@/assets";
import { IDENTIFIED_ACTIONS } from "@/constants";
import { TOrderItemProps, TOrderProps } from "@/types";
import { $Enums } from "@prisma/client";
import { Button, Dropdown, TableColumnsType, Tooltip } from "antd";
import moment from "moment";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrMoney, GrUserWorker } from "react-icons/gr";

export const ORDERS_COLUMNS = (handleAction: (action: IDENTIFIED_ACTIONS, id: string, value?: string) => void): TableColumnsType<TOrderProps> => {

    return [
        {
            key: "Order Details",
            title: "Order Details",
            render: (_, val, index) => (
                <div className="flex gap-2 items-center flex-1 my-0.5 cursor-pointer" onClick={() => handleAction("view", val.id)}>
                    <Tooltip title={`Order ID: ${val.id}`}>
                        <div className={`h-10 w-10 md:h-10 md:w-10 flex-shrink-0 grid place-items-center relative ${(index + 1) % 3 === 0 ? "bg-primary" : (index + 1) % 2 === 1 ? "bg-tertiary" : "bg-secondary"} text-base text-white rounded-md overflow-hidden`}>
                            <GrMoney />
                        </div>
                    </Tooltip>
                    <div className="flex-1">
                        <div className="flex flex-col divide-y divide-slate-200 w-max">
                            <div className="flex justify-start pb-1 pl-4">
                                {val?.YnOrderItem?.map((el, i) => (
                                    <Tooltip key={el?.id} title={el?.product?.name} placement="top" className="text-xs">
                                        <div
                                            className={`h-4 w-4 sm:h-5 sm:w-5 relative overflow-hidden rounded-full bg-defaultWhite flex justify-center items-center -ml-2 cursor-pointer border-2 border-defaultBorderLine z-[${i + 2}] hover:z-30`}
                                        >
                                            <Image
                                                key={el.id}
                                                src={el.product.image ?? ASSETS_URL['logo'].src}
                                                alt={el.product.image ?? ASSETS_URL['logo'].src}
                                                className="object-cover"
                                                fill
                                            />
                                        </div>
                                    </Tooltip>
                                ))}
                            </div>
                            {/* <h4 className="leading-none text-xs md:text-sm font-medium px-3 whitespace-nowrap text-primary">{val.YnOrderItem.length.toLocaleString()} items</h4> */}
                            <p className="leading-none pl-2 text-[.65rem] md:text-xs text-text text-center font-light whitespace-nowrap">{val.YnOrderItem.length.toLocaleString()} items</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: "Total Price",
            title: "Total Price",
            render: (_, val) => (
                <p className="leading-none pl-2 text-xs md:text-sm text-primary font-semibold whitespace-nowrap">&#8358;{(val.YnOrderItem.reduce((old, el) => el.price + old, 0)).toLocaleString()}</p>
            )
        },
        {
            key: "User Details",
            title: "User Details",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1 my-0.5">
                    <div className={`h-9 w-9 md:h-10 md:w-10 flex-shrink-0 grid place-items-center relative bg-text/20 hover:bg-background border border-text/20 text-base text-white rounded-md overflow-hidden`}>
                        <GrUserWorker className="text-xl md:text-2xl text-primary flex-shrink-0" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="leading-none text-xs md:text-sm text-primary font-bold whitespace-nowrap">{val.fullname}</h4>
                        <p className="leading-none text-xs font-medium whitespace-nowrap text-primary/80">{val.email}</p>
                    </div>
                </div>
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
                            items: Object.values($Enums.OrderStatus).map((value) => (
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
            key: "Last Modified",
            title: "Last Modified",
            render: (_, val) => (
                <span className="text-xs md:text-sm">{moment(val.updatedAt!).fromNow()}</span>
            )
        },
        {
            key: "Delete",
            title: "Delete",
            render: (_, val) => (
                <button onClick={() => handleAction("delete", val.id)} className="button bg-tertiary/20 text-tertiary hover:bg-tertiary hover:text-white px-3 flex items-center gap-2"><FaRegTrashCan /></button>
            )
        },

    ]
}


export const ORDER_ITEMS_COLUMNS = (handleAction: (action: IDENTIFIED_ACTIONS, id: string, value?: string) => void): TableColumnsType<TOrderItemProps> => {
    return [
        {
            key: "Product Details",
            title: "Product Details",
            render: (_, val, index) => (
                <div className="flex gap-2 items-center flex-1 my-0.5 cursor-pointer">
                    <div className={`relative h-10 w-10 md:h-10 md:w-10 flex-shrink-0 grid place-items-center ${(index + 1) % 3 === 0 ? "bg-primary" : (index + 1) % 2 === 1 ? "bg-tertiary" : "bg-secondary"} text-base text-white rounded-md overflow-hidden`}>
                        <Image key={val.product.name} src={val.product.image} alt={val.product.name} className="object-cover" fill />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="leading-none text-xs md:text-sm font-medium whitespace-nowrap text-primary">{val.product.name}</h4>
                        <p className="leading-none text-[.65rem] md:text-xs text-text text-left font-light whitespace-nowrap">{val.product.qtyAvailable.toLocaleString()} Available</p>
                    </div>
                </div>
            )
        },
        {
            key: "Price",
            title: "Price",
            render: (_, val) => (
                <p className="leading-none pl-2 text-xs md:text-sm text-primary/80 font-semibold whitespace-nowrap">&#8358;{val.price.toLocaleString()}</p>
            )
        },
        {
            key: "Quantity",
            title: "Quantity",
            render: (_, val) => (
                <p className="leading-none pl-2 text-xs md:text-sm text-primary/80 font-semibold whitespace-nowrap">{val.quantity.toLocaleString()}</p>
            )
        },
        {
            key: "Total Price",
            title: "Total Price",
            render: (_, val) => (
                <p className="leading-none pl-2 text-xs md:text-sm text-primary/80 font-semibold whitespace-nowrap">&#8358;{(val.quantity * val.price).toLocaleString()}</p>
            )
        },
        {
            key: "Order Status",
            title: "Order Status",
            render: (_, val) => (
                <div className="flex items-center gap-2">
                    <p className="leading-none text-xs font-medium whitespace-nowrap text-primary/80">{val.status}</p>
                    <Dropdown
                        placement="bottomRight"
                        trigger={["click"]}
                        menu={{
                            items: Object.values($Enums.OrderStatus).map((value) => (
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
            key: "Date Ordered",
            title: "Date Ordered",
            render: (_, val) => (
                <span className="text-xs">{moment(val.createdAt!).fromNow()}</span>
            )
        },
        {
            key: "Delete",
            title: "Delete",
            render: (_, val) => (
                <button onClick={() => handleAction("delete", val.id)} className="button bg-tertiary/20 text-tertiary hover:bg-tertiary hover:text-white text-xs md:text-sm px-3 flex items-center gap-2"><FaRegTrashCan /></button>
            )
        },

    ]
}