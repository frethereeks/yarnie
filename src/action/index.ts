"use server"

import { IDENTIFIED_TABLES, paymentsFolder, productsFolder, profileFolder } from "@/constants";
import { generateSlug } from "@/lib";
import { authOptions } from "@/lib/authOptions";
import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { appRoutePaths } from "@/routes/paths";
import { TCategory, TCategoryProps, TProductProps, TOrderProps, TUserProps, TOrderItem } from "@/types";
import { $Enums, YnOrderItem, YnProduct } from "@prisma/client";
import bcryptjs from "bcryptjs"
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const fetchUser = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
        signOut()
        redirect(appRoutePaths.signin)
    }
    else {
        const data = await prisma.ynUser.findFirst({
            where: {
                id: user?.id as string
            },
        })
        return data!;
    }
}

// common form data
const userData = (data: FormData) => ({
    firstname: data?.get("firstname")?.valueOf() as string,
    lastname: data?.get("lastname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    image: data?.get("image")?.valueOf(),
    plainPassword: data?.get("password")?.valueOf() as string,
    verifyPassword: data?.get("verifyPassword")?.valueOf() as string,
    role: data?.get("role")?.valueOf() as $Enums.Role || "Owner",
})

const orderData = (data: FormData) => ({
    fullname: data?.get("fullname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    phone: data?.get("phone")?.valueOf() as string,
    orders: data?.get("orders")?.valueOf() as string,
    address: data?.get("address")?.valueOf() as string,
    proof: data?.get("proof")?.valueOf() as File,
})

const productData = (data: FormData) => ({
    name: data?.get("name")?.valueOf() as string,
    price: Number(data?.get("price")?.valueOf()),
    qtyAvailable: Number(data?.get("qtyAvailable")?.valueOf()),
    image: data?.get("image")?.valueOf() as string | File,
    popular: data?.get("popular")?.valueOf() as string,
    status: data?.get("status")?.valueOf() as $Enums.FoodStatus,
    description: data?.get("description")?.valueOf() as string,
    categoryId: data?.get("categoryId")?.valueOf() as string,
})

export const createUser = async (data: FormData) => {
    const { firstname, lastname, email, plainPassword, role, } = userData(data)
    const status = data.get("status")?.valueOf() as string
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const image = "https://res.cloudinary.com/dnl81n8vu/image/upload/v1752669986/yarnie/products/logo_p7vgp5.png";
    // check duplicates
    const alreadyExists = await prisma.ynUser.findFirst({
        where: { email: email.toLowerCase(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `An admin already exists with the same email`
        }
    }
    try {
        await prisma.ynUser.create({
            data: {
                firstname, lastname, email, password, role, status: status ? status as $Enums.Status : "Pending", image, token: ""
            }
        })
        return { error: false, message: `New user Created Successfully. Please, check your email to complete the registration`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this user account`, }
    }

}

export const createOrder = async (data: FormData) => {
    const { fullname, email, phone, proof, orders, address } = orderData(data)
    const allOrders = JSON.parse(orders) as unknown as Pick<YnOrderItem, "id" | "orderId" | "price" | "productId" | "quantity">[]

    try {
        if (!(proof instanceof File) || !proof.type.includes("image/") || !(proof.size <= 2 * 1024 * 1024)) {
            return { error: true, message: `Payment evidence must be a valid picture, less than 2MB and must be of jpg, png and jpeg format.`, }
        }
        const file = (proof instanceof File) ? (await uploadImage(proof, paymentsFolder)).secure_url : "https://res.cloudinary.com/dnl81n8vu/image/upload/v1752669986/yarnie/products/logo_p7vgp5.png"
        const delivery = new Date(new Date().setHours(82)).toISOString()

        // Perform a Transaction
        const order = await prisma.$transaction(async (prisma) => {
            const order = await prisma.ynOrder.create({
                data: { fullname, email, phone, proof: file, delivery, address }
            })

            // Extract the order ID after creating the order (for usage in orderID fields of the orderItem query) and reducing the product qtyAvailable
            const orderItems = allOrders.map(el => ({ productId: el.id, price: el.price, quantity: el.quantity, orderId: order.id }))
            
            // Use the array to create multiple order items
            await prisma.ynOrderItem.createMany({
                skipDuplicates: true,
                data: orderItems,
            })

            // Update (decrease) product quantities
            for (const item of orderItems) {
                await prisma.ynProduct.updateMany({
                    where: { id: item.productId! },
                    data: { qtyAvailable: { decrement: item.quantity }}
                })
            }

            return order
        })
        return { error: false, message: `Order for ${allOrders.length} items successfully placed.`, data: ({ id: order.id, fullname: order.fullname, email: order.email, address: order.address, delivery: order.delivery, price: allOrders.reduce((old, el) => el.price + old, 0), total: allOrders.length }) }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to place order. Please check your internet settings`, }
    }
}

export const createCategory = async (data: FormData) => {
    const user = await fetchUser()
    const name = data?.get("name")?.valueOf() as string;
    // check duplicates
    const alreadyExists = await prisma.ynCategory.findFirst({
        where: { name: name.toLowerCase(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A category already exists with the same name`
        }
    }
    try {
        await prisma.ynCategory.create({
            data: {
                name, userId: user.id
            }
        })
        return { error: false, message: `New Category Created Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this category. Please, try again`, }
    }

}

export const createMessage = async (data: FormData) => {
    const fullname = data?.get("fullname")?.valueOf() as string;
    const email = data?.get("email")?.valueOf() as string;
    const message = data?.get("message")?.valueOf() as string;
    const phone = data?.get("phone")?.valueOf() as string;

    try {
        await prisma.ynContact.create({
            data: {
                fullname, email, message, phone
            }
        })
        revalidatePath(appRoutePaths.contact)
        return { error: false, message: `Message has been Sent Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to send message. Please, try again later`, }
    }
}

export const createProduct = async (data: FormData) => {
    const user = await fetchUser()
    const { name, price, qtyAvailable, image, description, categoryId, status, popular } = productData(data)
    const slug = generateSlug(name)

    // check duplicates
    const alreadyExists = await prisma.ynProduct.findFirst({
        where: {
            AND: [{ name: name.toLowerCase(), categoryId }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A product already exists with the same name under this category`
        }
    }
    try {
        if (!(image instanceof File) || !(image.type.includes("image/")) || !(image.size <= 3 * 1024 * 1024)) {
            return { error: true, message: `Product image must be a valid picture, less than 3MB and must be of jpg, png and jpeg format.`, }
        }
        const file = (image instanceof File) ? (await uploadImage(image, productsFolder)).secure_url : "https://res.cloudinary.com/dnl81n8vu/image/upload/v1752669986/yarnie/products/logo_p7vgp5.png";
        
        await prisma.ynProduct.create({
            data: {
                name, slug, price, qtyAvailable, image: file, description, categoryId: "cmd4085390001nb1k2ln59umy", userId: user.id, status, popular: JSON.parse(popular.toLowerCase()) ?? false
            }
        })
        revalidatePath(appRoutePaths.adminproducts)
        return { error: false, message: `New YnProduct Record Created Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this product record`, }
    }
}

// ACCOUNT RESET
export const handleReset = async (email: string) => {
    const validMail = await prisma.ynUser.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have a member with this email...Please, confirm and try again` };
    try {
        const token = randomUUID()
        const html = `
              <section style="max-width: 40rem; width: 100%; margin: 0 auto; padding: 2rem;" className="flex flex-col">
                  <div className="flex gap-1">
                  <div style="background: rgb(59, 130, 246); font-size: 2rem; color: white; text-align: center; padding: 2rem 1rem;" className="h-10 w-10 rounded-full bg-primary flex-shrink-0">Password Reset</div>
                      <div style="padding: 1rem;" className="flex flex-col flex-1">
                      <p style="color: rgb(100,116,139); font-size: 1rem; line-height: 1.8;" className="text-xs text-slate-500">We have received your request to reset your password. If you indeed initiated the action, click the link below:</p>
                          <a href='http://localhost:3000/auth/reset?email=${email}&token=${token}' target="_blank" style="background: rgb(59, 130, 246); padding: 1rem 2rem; width: max-content; margin: 0 auto; color: white; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">View our Trending Courses</a>
                      </div>
                      <p style="color: rgb(100,116,139); font-size: .65rem; padding: 1rem; text-align:center; line-height: 1.25rem;" className="text-xs text-slate-700 text-center py-2">If you did not initiate this action. Simply ignore this message.</p>
                  </div>
              </section>
          `;
        console.log({ html })
        // const transport = nodeMailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: process.env.MAIL_USERNAME,
        //         pass: process.env.MAIL_PASSWORD
        //     }
        // })

        // transport.sendMail({
        //     from: `EDIMCS.ng <${process.env.MAIL_FROM}>`,
        //     to: email,
        //     // bcc: 'EDIMCS Password Reset <fakemail@gmail.com>',
        //     replyTo: 'EDIMCS No Reply <no-reply@edimcs.com>',
        //     subject: 'EDIMCS Password Reset Request',
        //     html
        // }, (err) => {
        //     if (err) {
        //         return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
        //     }
        // })
        // await prisma.ynUser.update({
        //     where: { email },
        //     data: { token }
        // })
        revalidatePath(appRoutePaths.signIn)
        return { error: false, message: `Password Reset Link has been sent to your email...` };
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
    }
}

export const handlePasswordReset = async (data: FormData) => {
    const email = data.get("email")?.valueOf() as string
    const plainPassword = data.get("password")?.valueOf() as string
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const validMail = await prisma.ynUser.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have a member with this email...Please, confirm and try again` };
    try {
        await prisma.ynUser.update({
            where: { email },
            data: { password, token: "" }
        })
        revalidatePath("/auth/reset")
        return { error: false, message: `Password Reset Link was successfully.` };
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

export const handleTokenVerification = async (email: string, token: string) => {
    try {
        const validMail = await prisma.ynUser.findFirst({ where: { email, token } })
        if (!validMail) return { error: true, message: `We do not have an account with these details...Perhaps, this is an old link` };
        else return { error: false, message: `Success! Please, complete the process by choosing a new password` };
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

// FETCH LOGICS
export const fetchUsers = async () => {
    const user = await fetchUser()
    try {
        let data = await prisma.ynUser.findMany({
            include: {
                category: { select: { id: true } },
                product: { select: { id: true } }
            },
            orderBy: { createdAt: "desc" }
        }) as TUserProps[]
        data = user.role === "Owner" ? data : data.filter((el) => el.role !== "Owner")
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user.role }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchOrders = async () => {
    // const user = await fetchUser()
    try {
        const data = await prisma.ynOrder.findMany({
            include: {
                YnOrderItem: {
                    select: {
                        id: true, price: true, quantity: true, productId: true, orderId: true, status: true,
                        product: { select: { id: true, name: true, image: true, price: true, qtyAvailable: true } }
                    },
                }
            },
            orderBy: { createdAt: "desc" }
        }) as TOrderProps[]
        
        return { error: false, message: `Record Retrieved Successfully.`, data, role: "Owner" }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchOrderItems = async ({ id }: { id?: string }) => {
    // const user = await fetchUser()
    try {
        const data = await prisma.ynOrderItem.findMany({
            where: { productId: id },
            include: {
                product: {
                    select: { id: true, name: true, image: true, price: true, qtyAvailable: true }
                },
            },
            orderBy: { createdAt: "desc" }
        }) as TOrderItem[]
        return { error: false, message: `Record Retrieved Successfully.`, data, role: "Owner" }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchDashboardData = async () => {
    const user = await fetchUser()
    try {
        const [sales, product, users, category] = await prisma.$transaction([
            prisma.ynOrder.findMany({ select: { fullname: true, email: true, phone: true } }),
            prisma.ynProduct.findMany({ select: { id: true, status: true, price: true } }),
            prisma.ynUser.findMany({ select: { id: true, status: true, role: true } }),
            prisma.ynCategory.findMany({
                include: {
                    product: { select: { id: true, name: true } },
                    user: { select: { firstname: true, lastname: true, id: true } },
                },
                orderBy: { createdAt: "desc" }
            })
        ])
        return { error: false, message: `Record Retrieved Successfully.`, data: { sales, product, users, category, user }, role: user.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchMessage = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.ynContact.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchHomeData = async ({ showHidden = false, limit }: { showHidden: boolean, limit?: number }) => {
    try {
        const data = await prisma.ynProduct.findMany({
            include: {
                category: { select: { id: true, name: true } },
                user: { select: { firstname: true, lastname: true, id: true } },
            },
            take: limit ?? 100,
            orderBy: { createdAt: "desc" }
        }) as TProductProps[]

        const category = await prisma.ynCategory.findMany({
            where: { status: "Visible" },
        }) as TCategory[]

        const products = showHidden ? data : data?.filter(el => el.status !== "Hidden")

        return { error: false, message: `Record Retrieved Successfully.`, data: { products, category } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchProducts = async ({showHidden = false} : {showHidden: boolean, limit?: number}) => {
    const user = await fetchUser()
    try {
        // Calling this function because I do not wish to check for user on the public page, the function below fetchs products only 
        const { data } = await fetchHomeData({showHidden})

        return { error: false, message: `Product Retrieved Successfully.`, data, role: user.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchSingleProducts = async ({ slug }: { slug: string }) => {
    // const user = await fetchUser()
    try {
        const product = await prisma.ynProduct.findFirst({
            where: { slug },
        })

        const otherProducts = await prisma.ynProduct.findMany({
            where: { NOT: [{ id: product?.id, status: "Hidden" }], },
            include: {
                category: { select: { id: true, name: true } },
                user: { select: { firstname: true, lastname: true, id: true } },
            },
            orderBy: { createdAt: "desc" },
            take: 4
        })

        // const data = user ?  otherProducts : otherProduct

        return { error: false, message: `Single Product Retrieved Successfully.`, data: { product, otherProducts } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchSearch = async (query: string) => {
    try {
        const data = await prisma.ynProduct.findMany({
            where: {
                OR: [
                    {
                        name: { contains: query },
                    },
                    {
                        description: { contains: query }
                    },
                    {
                        category: {  name: { contains: query } }
                    },
                ]
            },
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as YnProduct[]
        revalidatePath(appRoutePaths.search);
        return { error: false, message: `${data.length} result found.`, data }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

// GET LOGICS FOR CLIENT SIDE
export const getPageMenu = async () => {
    try {
        const product = await prisma.ynProduct.findMany({
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as YnProduct[]
        const category = await prisma.ynCategory.findMany({
            where: { status: "Visible" },
            include: {
                product: { select: { id: true, name: true } },
                user: { select: { firstname: true, lastname: true, id: true } },
            }
        }) as TCategoryProps[]

        return { error: false, message: `Record Retrieved Successfully.`, data: { product, category } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const getSinglePageMenu = async ({ slug }: { slug: string }) => {
    let similar;
    try {
        const product = await prisma.ynProduct.findFirst({
            where: { slug },
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as (YnProduct & { category: { name: string } })
        if (product) {
            similar = await prisma.ynProduct.findMany({
                where: {
                    categoryId: product.categoryId
                },
                take: 6
            })
        }
        else {
            similar = await prisma.ynProduct.findMany({
                take: 6
            })
        }
        return { error: false, message: `Record Retrieved Successfully.`, data: { product, similar } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

// UPDATE LOGICS

export const updateUser = async (data: FormData, type?: "info" | "security" | "all") => {
    const user = await fetchUser()
    let file = data.get("oldImage")?.valueOf() as string;
    const { email, firstname, lastname, image } = userData(data)
    const password = data.get("password")?.valueOf() as string
    const plainPassword = data.get("newPassword")?.valueOf() as string
    
    if (!(image instanceof File) || !image.type.includes("image/") || !(image.size <= 2 * 1024 * 1024)) {
        return { error: true, message: `Profile Picture must be a valid picture, less than 2MB and must be of jpg, png and jpeg format.`, }
    }
    
    file = (image instanceof File) ? (await uploadImage(image, paymentsFolder)).secure_url : file

    try {
        if (type === "info") {
            const userExists = await prisma.ynUser.findFirst({
                where: {
                    email: email.toLowerCase(),
                    NOT: { id: user.id }
                }
            })
            if (userExists) {
                return { error: true, message: `This email already exists and it belongs to another user. Please, try another` }
            }
            else {
                await prisma.ynUser.update({
                    data: { email, firstname, lastname, image: file },
                    where: { id: user.id }
                })
            }
        }
        else if(type === "security") {
            const matchPassword = await bcryptjs.compare(password, user.password), salt = await bcryptjs.genSalt(10);
            const newPassword = await bcryptjs.hash(plainPassword, salt)
            
            if (!matchPassword) {
                return { error: true, message: `Your security password does not match your current. Please, check and try again` }
            }
            else {
                await prisma.ynUser.update({
                    data: { password: newPassword },
                    where: { id: user.id }
                })
            }
        }
        else {
            const salt = await bcryptjs.genSalt(10);
            const newPassword = await bcryptjs.hash(plainPassword, salt)
            await prisma.ynUser.update({
                data: { email, firstname, lastname, image: file, password: newPassword },
                where: { id: user.id }
            })
        }
        return { error: false, message: `Your profile has been updated successfully` }
    } catch (error) {
        console.error('error', error)
        // await logAction({ userId: user.id, actionType: "update", message: `Activity: Update Admin Failed. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong. We could not complete your request` }
    }
    }

export const updateUserImage = async (data: FormData) => {
    const image = data.get("image")?.valueOf() as (string | File)
    const id = data.get("id")?.valueOf() as string
    let file = data.get("oldImageName")?.valueOf() as string
    
    try {
        // set the image to their previous image value
        if (!(image instanceof File) || !image.type.includes("image/") || !(image.size <= 2 * 1024 * 1024)) {
            return { error: true, message: `Image must be a valid picture, less than 2MB and must be of jpg, png and jpeg format.`, }
        }
        
        file = (image instanceof File) ? (await uploadImage(image, profileFolder, file)).secure_url : file

        await prisma.ynUser.update({
            data: { image: file, },
            where: { id }
        })
        // Update the page to reflect modified record
        revalidatePath(appRoutePaths.adminsettings)
        return { error: false, message: `Record updated successfully.` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }
}

export const updateOrderStatus = async (status: $Enums.OrderStatus, id: string, type: "order" | "item") => {
    // const user = await fetchUser()

    try {
        if (type === "order") {

            await prisma.ynOrder.update({
                data: { status },
                where: { id }
            })
        }
        else {
            await prisma.ynOrderItem.update({
                data: { status },
                where: { id }
            })
        }
        return { error: false, message: `Order ${type === "item" ? 'Item' : ''} Record updated Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }

}

export const updateProduct = async (data: FormData) => {
    // const user = await fetchUser()
    const id = data?.get("id")?.valueOf() as string
    const { name, price, qtyAvailable, image, description, categoryId, status, popular } = productData(data)
    const slug = generateSlug(name)
    let file = data?.get("oldImage")?.valueOf() as string;
    // check duplicates
    const alreadyExists = await prisma.ynProduct.findFirst({
        where: {
            AND: [{ name: name.toLowerCase(), categoryId }],
            NOT: [{ id }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A product already exists with the same name under this category`
        }
    }
    try {
        if (!(image instanceof File) || !(image.type.includes("image/")) || !(image.size <= 3 * 1024 * 1024)) {
            return { error: true, message: `Product image must be a valid picture, less than 3MB and must be of jpg, png and jpeg format.`, }
        }
        // Check if the image type is not a string and upload
        file = (image instanceof File) ? (await uploadImage(image, productsFolder, file)).secure_url : file
        await prisma.ynProduct.update({
            data: {
                name, slug, price, qtyAvailable, image: file as string, description, categoryId, status: status as $Enums.FoodStatus, popular: popular === "true" ? true : false
            },
            where: { id }
        })
        revalidatePath(appRoutePaths.adminproducts)
        return { error: false, message: `Product record updated successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this product record`, }
    }
}

export const updateStatus = async (payload: { id: string, status: string }, table: IDENTIFIED_TABLES) => {
    const { id, status } = payload
    try {
        switch (table) {
            case "user": {
                prisma.ynUser.update({
                    data: { status: status as $Enums.Status },
                    where: { id: id }
                })
            }
                break;
            case "product": {
                prisma.ynProduct.update({
                    data: { status: status as $Enums.FoodStatus },
                    where: { id: id }
                })
            }
                break;
            case "contact": {
                prisma.ynContact.update({
                    data: { status: status as $Enums.ContactStatus },
                    where: { id: id }
                })
            }
                break;
            case "category": {
                prisma.ynCategory.update({
                    data: { status: status as $Enums.FoodStatus },
                    where: { id: id }
                })
            }
                break;

            default: return null;
        }
        // table === "user" ? revalidatePath(appRoutePaths.adminuser) :
        // table === "menu" ? revalidatePath(appRoutePaths.adminproducts) :
        // table === "category" ? revalidatePath(appRoutePaths.admindashboard) :
        // table === "contact" ? revalidatePath(appRoutePaths.admincontact) :
        // revalidatePath(appRoutePaths.adminorders)
        return { error: false, message: `Record has been successfully Deleted` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}

export const updateCategory = async (data: FormData) => {
    const user = await fetchUser()
    const name = data?.get("name")?.valueOf() as string;
    const status = data?.get("status")?.valueOf() as $Enums.FoodStatus;
    const id = data?.get("id")?.valueOf() as string;
    // check duplicates
    const alreadyExists = await prisma.ynCategory.findFirst({
        where: {
            name: name.toLowerCase(),
            NOT: [{ id }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A category already exists with the same name`
        }
    }
    try {
        await prisma.ynCategory.update({
            data: {
                name, userId: user.id, status
            },
            where: { id }
        })
        return { error: false, message: `Category Updated Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this category. Please, try again`, }
    }

}


// DELETE ACTIONS
export const deleteEntity = async (id: string, table: IDENTIFIED_TABLES) => {
    const entityIDs = JSON.parse(id) as string[];
    try {
        switch (table) {
            case "user": {
                await prisma.ynUser.deleteMany({
                    where: { id: { in: entityIDs } }
                })
            }
                break;
            case "order": {
                await prisma.ynOrder.deleteMany({
                    where: { id: { in: entityIDs } }
                })
            }
                break;
            case "orderItems": {
                await prisma.ynOrderItem.deleteMany({
                    where: { id: { in: entityIDs } }
                })
            }
                break;
            case "product": {
                await prisma.ynProduct.deleteMany({
                    where: { id: { in: entityIDs } }
                })
            }
                break;
            case "contact": {
                await prisma.ynContact.deleteMany({
                    where: { id: { in: entityIDs } }
                })
            }
                break;
            case "category": {
                entityIDs.map(async (el) => {
                    // Find the "General" category
                    const generalCategory = await prisma.ynCategory.findFirst({
                        where: { name: 'General' },
                    });
                    const updateProduct = prisma.ynProduct.updateMany({
                        where: { categoryId: el },
                        data: { categoryId: generalCategory?.id }
                    })
                    const deleteCategory = prisma.ynCategory.delete({
                        where: { id: el },
                    })
                    await prisma.$transaction([updateProduct, deleteCategory])
                })
            }
                break;

            default: return { error: true, message: "Invalid delete request detected." };
        }
        const path = `/admin/admin${table === "user" ? "users" : table}`
        revalidatePath(path)
        return { error: false, message: `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully Deleted` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}

export const updateEntity = async (id: string, status: string, table: IDENTIFIED_TABLES) => {
    // const user = await verifyUser()
    const entityIDs = JSON.parse(id) as string[];
    try {
        switch (table) {
            case "user": {
                const value = status as unknown as $Enums.Status
                await prisma.ynUser.updateMany({
                    where: { id: { in: entityIDs } },
                    data: { status: value }
                })
            }
                break;
            case "logger": {
                const value = status as unknown as $Enums.ContactStatus
                await prisma.ynLogger.updateMany({
                    where: { id: { in: entityIDs } },
                    data: { status: value }
                })
            }
                break;
            case "order": {
                const value = status as unknown as $Enums.OrderStatus
                entityIDs.map(async (el) => {
                    const item = await prisma.ynOrder.update({
                        where: { id: el },
                        data: { status: value },
                        select: { id: true}
                    })
                    await prisma.ynOrderItem.updateMany({
                        where: { orderId: item.id },
                        data: { status: value },
                    })
                })
            }
                break;
            case "orderItems": {
                const value = status as unknown as $Enums.OrderStatus
                await prisma.ynOrderItem.updateMany({
                    where: { id: { in: entityIDs } },
                    data: { status: value }
                })
            }
                break;
            case "contact": {
                const value = status as unknown as $Enums.ContactStatus
                await prisma.ynContact.updateMany({
                    where: { id: { in: entityIDs } },
                    data: { status: value }
                })
            }
                break;
            case "product": {
                const value = status as unknown as $Enums.FoodStatus
                await prisma.ynProduct.updateMany({
                    where: { id: { in: entityIDs } },
                    data: { status: value }
                })
            }
                break;
            default: return { error: true, message: "Invalid update request detected." };
        }
        const pageName = table + `${table === "contact" || table === "user" ? "" : "s"}`
        const path = `/admin/${pageName}`
        revalidatePath(path)
        if (table !== "logger") {
            // await logAction({ userId: user.id, actionType: "update", message: `Activity: ${user.name} updated ${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} to ${status} in ${table} list. `, })
        }
        return { error: false, message: `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully updated` }
    } catch (error) {
        console.log({ error })
        // await logAction({ userId: user.id, actionType: "update", message: `Activity: ${user.name} could not update ${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} in ${table}. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}