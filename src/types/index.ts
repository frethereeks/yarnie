import { Category, Menu, Sale, User } from "@prisma/client"

export type TCategory = Pick<Category, "id" | "name" | "status" | "createdAt" | "userId" | "updatedAt">
export type TMenu = Pick<Menu, "id" | "name" | "slug" | "image" | "description" | "price" | "popular" | "categoryId" | "status" | "createdAt" | "userId">
// export type TSale = Pick<Sale, "id" | "alcohol" | "drink" | "food" | "createdAt" | "userId">
export type TUser = Pick<User, "id" | "firstname" | "lastname" | "email" | "image" | "password" | "role" | "status" | "token" | "createdAt">

export type TCategoryProps = {
    user: {
        id: string, firstname: string, lastname: string
    },
    menu: {
        id: string, name: string
    }[]
} & Category

export type TMenuProps = {
    user: Pick<TUser, "id" | "firstname" | "lastname">,
    category: Pick<TCategory, "name">,
} & TMenu

export type TSaleProps = {
    user: Pick<TUser, "id" | "firstname" | "lastname">
} & Sale

export type TUserProps = {
    menu: Pick<TMenu, "id">[]
    category: Pick<TCategory, "id">[],
} & TUser

export type CartProp = {
    id: string,
    name: string,
    image: string,
    price: number,
    qty: number,
}
