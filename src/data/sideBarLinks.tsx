import { appRoutePaths } from "@/routes/paths"
import { GrSettingsOption, GrUserWorker, GrMoney } from "react-icons/gr"
import { LuLayoutDashboard, LuReceiptText } from "react-icons/lu";

type SidebarProps = {
    id: string
    title: string
    icon: React.ReactNode
    link: string
}

export const sideBarLinks: SidebarProps[] = [
    {
        id: '8q2s03x5068q20',
        title: 'Dashboard',
        icon: <LuLayoutDashboard />,
        link: appRoutePaths.admindashboard,
    },
    {
        id: '8q2s03x5068q21',
        title: 'Admins',
        icon: <GrUserWorker />,
        link: appRoutePaths.adminuser,
    },
    {
        id: '8q2s03x5068q22',
        title: 'Products',
        icon: <GrMoney />,
        link: appRoutePaths.adminproducts,
    },
    {
        id: '8q2s03x5068q23',
        title: 'Orders',
        icon: <LuReceiptText />,
        link: appRoutePaths.adminorders,
    },
    // {
    //     id: '8q2s03x5068q24',
    //     title: 'Menu',
    //     icon: <LuUtensilsCrossed />,
    //     link: appRoutePaths.adminproducts,
    // },
    {
        id: '8q2s03x5068q25',
        title: 'Settings',
        icon: <GrSettingsOption />,
        link: appRoutePaths.adminsettings,
    },
]