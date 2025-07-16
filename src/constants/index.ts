import { $Enums } from "@prisma/client";

export const profileFolder = 'yarnie/profile';
export const assetsFolder = 'yarnie/assets';
export const paymentsFolder = 'yarnie/payments';
export const productsFolder = 'yarnie/products';

export const DEFAULT_PAGE_SIZE = 12

export type IDENTIFIED_TABLES = "contact" | "category" | "logger" | "product" | "order" | "orderItems" | "user" 
export type IDENTIFIED_ACTIONS = "edit" | "delete" | "status" | "view"
export type IDENTIFIED_STATUSES = typeof $Enums.OrderStatus | typeof $Enums.ContactStatus | typeof $Enums.FoodStatus | typeof $Enums.Role | typeof $Enums.Status

export const SOCIALLINKS = {
    youtube: "https://www.youtube.com/@theyarnie",
    whatsapp: "https://wa.me/+2349088888733",
    instagram: "https://www.instagram.com/theyarnie/"
}

