import { YnCategory, YnProduct, YnUser, YnOrder, YnOrderItem } from "@prisma/client"

export type TCategory = Pick<YnCategory, "id" | "name" | "status" | "createdAt" | "userId" | "updatedAt">
export type TProduct = Pick<YnProduct, "id" | "name" | "slug" | "image" | "description" | "price" | "qtyAvailable" | "popular" | "categoryId" | "status" | "createdAt" | "userId">
export type TOrder = Pick<YnOrder, "id" | "fullname" | "email" | "phone" | "proof" | "delivery" | "status" | "createdAt" | "updatedAt">
export type TOrderItem = Pick<YnOrderItem, "id" | "price" | "quantity" | "status" | "createdAt">
export type TUser = Pick<YnUser, "id" | "firstname" | "lastname" | "email" | "image" | "password" | "role" | "status" | "token" | "createdAt" | "updatedAt">

export type Prettify<T> = {
    [P in keyof T]: T[P]
} & {}

export type TAuthUser = Pick<TUserProps, "id" | "firstname" | "lastname" | "image" | "email" | "role">

export type TCategoryProps = {
    user: {
        id: string, firstname: string, lastname: string
    },
    product: {
        id: string, name: string
    }[]
} & YnCategory

export type TOrderProps = Prettify<{
    YnOrderItem: TOrderItemProps[]
} & YnOrder>

export type TOrderItemProps = {
    // user: Pick<YnUser, "id" | "image" | "slug">
    product: Pick<YnProduct, "id" | "name" | "image" | "price" | "qtyAvailable">
} & YnOrderItem

export type TProductProps = Prettify<{
    user: Pick<TUser, "id" | "firstname" | "lastname">,
    category: Pick<TCategory, "id" | "name">,
} & TProduct>

export type TUserProps = {
    product: Pick<TProduct, "id">[]
    category: Pick<TCategory, "id">[],
} & TUser

export type CartProp = {
    id: string,
    name: string,
    image: string,
    price: number,
    quantity: number,
    qtyAvailable?: number,
}

