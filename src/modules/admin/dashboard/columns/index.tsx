import { randomColor } from "@/lib/randomColor";
import { TCategoryProps } from "@/types";
import { TableColumnsType } from "antd";
// import { GrLineChart } from "react-icons/gr";
import { LuActivity } from "react-icons/lu";

export const CATEGORY_COLUMNS = (): TableColumnsType<TCategoryProps> => {
    return [
        {
            key: "Category Details",
            title: "Category Details",
            render: (_, val, index) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <div style={{ background: randomColor(.8) }} className={`h-8 w-8 md:h-9 md:w-10 flex-shrink-0 grid place-items-center relative ${(index + 1) % 2 === 0 ? "bg-primary" : "bg-secondary"} text-base text-white rounded-md overflow-hidden`}>
                            <LuActivity />
                        </div>
                    </div>
                    <h4 className="leading-none text-sm md:text-base font-semibold whitespace-nowrap text-primary capitalize">{val.name}</h4>
                </div>
            )
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-sm font-normal whitespace-nowrap text-primary">{val.status.toLocaleString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Menu Total",
            title: "Menu Total",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-sm font-normal whitespace-nowrap text-primary">{val.menu.length.toLocaleString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Created By",
            title: "Created By",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-sm font-normal whitespace-nowrap text-primary">{val.user?.firstname} {val.user.lastname}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Date Created",
            title: "Date Created",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-sm font-normal whitespace-nowrap text-primary">{new Date(val.createdAt!).toDateString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Last Edited",
            title: "Last Edited",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-sm font-normal whitespace-nowrap text-primary">{new Date(val.updatedAt!).toDateString()}</h4>
                    </div>
                </div>
            )
        },
    ]
}
