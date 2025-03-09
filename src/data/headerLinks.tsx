import { appRoutePaths } from "@/routes/paths"

type THeaderLinks = {
    id: string
    title: string
    url: string
}

export const headerLinks: THeaderLinks[] = [
    {
        id: "802630",
        title: "Home",
        url: appRoutePaths.home
    },
    {
        id: "802631",
        title: "Shop",
        url: appRoutePaths.shop
    },
    {
        id: "802632",
        title: "About",
        url: appRoutePaths.about
    },
    {
        id: "802634",
        title: "Contact",
        url: appRoutePaths.contact
    },
]