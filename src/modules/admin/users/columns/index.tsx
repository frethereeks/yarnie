import { TUserProps } from "@/types";
import { Dropdown, TableColumnsType } from "antd";
import { ItemType } from "antd/es/menu/interface";
import Image from "next/image";
import { AiOutlineMore } from "react-icons/ai";

export const USER_COLUMNS = (items?: (action: TUserProps) => ItemType[]): TableColumnsType<TUserProps> => {
    return [
        {
            key: "User Details",
            title: "User Details",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 relative bg-primary rounded-md overflow-hidden">
                        { val.image && <Image src={val.image!} alt={`${val.firstname} ${val.lastname}`} fill className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" /> }
                    </div>
                    <div className="flex flex-col">
                        <h4 className="leading-loose text-sm md:text-base font-semibold whitespace-nowrap text-primary">{val.firstname} {val.lastname}</h4>
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
                <button className={`py-1 px-4 ${val.status === "ACTIVE" ? 'text-teal-700 bg-white' : 'bg-grey/60'} rounded-[2rem] text-xs`}>
                    {val.status}
                </button>
            )
        },
        {
            key: "Sales Recorded",
            title: "Sales Recorded",
            render: (_, val) => (
                <span className="leading-none text-sm font-normal whitespace-nowrap text-primary text-center">{val.menu.length}</span>
            )
        },
        {
            key: "Category Created",
            title: "Category Created",
            render: (_, val) => (
                <span className="leading-none text-sm font-normal whitespace-nowrap text-primary text-center">{val.category.length}</span>
            )
        },
        {
            key: "Action",
            title: "Action",
            render: (_, val) => (
                <Dropdown trigger={["click"]} menu={{ items: items?.(val)}}>
                    <AiOutlineMore className="cursor-pointer" />
                </Dropdown>
            )
        },
    ]
}
