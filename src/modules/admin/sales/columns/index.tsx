import { TSaleProps } from "@/types";
import { TableColumnsType } from "antd";
import { GrLineChart } from "react-icons/gr";

export const SALES_COLUMNS = (): TableColumnsType<TSaleProps> => {
    return [
        {
            key: "Sale Details",
            title: "Sale Details",
            render: (_, $, index) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <div className={`h-8 w-8 md:h-9 md:w-10 flex-shrink-0 grid place-items-center relative ${(index+1) % 2 === 0 ? "bg-primary" : "bg-secondary"} text-base text-white rounded-md overflow-hidden`}>
                            <GrLineChart />
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: "Food Sold",
            title: "Food Sold",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1 my-1">
                    <div className="flex flex-col text-secondary">
                        <h4 className="leading-none text-xs md:text-sm font-medium whitespace-nowrap text-primary">&#8358;{val.food.toLocaleString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Drinks Sold",
            title: "Drinks Sold",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-xs md:text-sm font-medium whitespace-nowrap text-primary">&#8358;{val.drink.toLocaleString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Alcohol Sold",
            title: "Alcohol Sold",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-xs md:text-sm font-medium whitespace-nowrap text-primary">&#8358;{val.alcohol.toLocaleString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Profit Made",
            title: "Profit Made",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-xs md:text-sm font-medium whitespace-nowrap text-primary">&#8358;{(val.food + val.drink + val.alcohol).toLocaleString()}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Recorded By",
            title: "Recorded By",
            render: (_, val) => (
                <div className="flex gap-2 items-center flex-1">
                    <div className="flex flex-col">
                        <h4 className="leading-none text-xs md:text-sm font-medium whitespace-nowrap text-primary">{val.user?.firstname} {val.user.lastname}</h4>
                    </div>
                </div>
            )
        },
        {
            key: "Date Recorded",
            title: "Date Recorded",
            render: (_, val) => (
                <div className="flex flex-col">
                    <h4 className="text-xs md:text-sm">{new Date(val.createdAt!).toDateString()}</h4>
                    {/* <p className="text-xs md:text-sm">{val.user?.firstname} {val.user.lastname}</p> */}
                </div>
            )
        },
        {
            key: "Last Modified",
            title: "Last Modified",
            render: (_, val) => (
                <span className="text-xs md:text-sm">{new Date(val.updatedAt!).toDateString()}</span>
            )
        },
    ]
}
