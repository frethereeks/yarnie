import { appRoutePaths } from "@/routes/paths"
import { GrUserSettings, GrUserWorker } from "react-icons/gr"
import { LuLayoutDashboard, LuScrollText, LuUtensilsCrossed } from "react-icons/lu";

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
        title: 'Users',
        icon: <GrUserWorker />,
        link: appRoutePaths.adminuser,
    },
    {
        id: '8q2s03x5068q22',
        title: 'Sales',
        icon: <LuScrollText />,
        link: appRoutePaths.adminsales,
    },
    {
        id: '8q2s03x5068q23',
        title: 'Menu',
        icon: <LuUtensilsCrossed />,
        link: appRoutePaths.adminmenu,
    },
    {
        id: '8q2s03x5068q24',
        title: 'Profile',
        icon: <GrUserSettings />,
        link: appRoutePaths.adminprofile,
    },
]