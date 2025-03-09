"use server"

import { IDENTIFIED_TABLES } from "@/constants";
import { generateSlug } from "@/lib";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { appRoutePaths } from "@/routes/paths";
import { TCategory, TCategoryProps, TMenuProps, TSaleProps, TUserProps } from "@/types";
import { $Enums, Menu } from "@prisma/client";
import bcryptjs from "bcryptjs"
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const fetchUser = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const data = await prisma.user.findFirst({
        where: {
            email: user?.email?.toLowerCase() as string
        },
    })
    if (!data) {
        signOut()
        redirect(appRoutePaths.signin)
    }
    return data;
}

// common form data
const userData = (data: FormData) => ({
    firstname: data?.get("firstname")?.valueOf() as string,
    lastname: data?.get("lastname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    image: data?.get("image")?.valueOf() as string || "",
    plainPassword: data?.get("password")?.valueOf() as string,
    verifyPassword: data?.get("verifyPassword")?.valueOf() as string,
    role: data?.get("role")?.valueOf() as $Enums.Role || "ROOT",
})

const saleData = (data: FormData) => ({
    food: Number(data?.get("food")?.valueOf() as string),
    drink: Number(data?.get("drink")?.valueOf() as string),
    alcohol: Number(data?.get("alcohol")?.valueOf() as string),
    createdAt: data?.get("createdAt")?.valueOf() as string,
})

const menuData = (data: FormData) => ({
    name: data?.get("name")?.valueOf() as string,
    price: Number(data?.get("price")?.valueOf()),
    image: data?.get("image")?.valueOf() as string,
    popular: data?.get("popular")?.valueOf() as string,
    status: data?.get("status")?.valueOf() as $Enums.FoodStatus,
    description: data?.get("description")?.valueOf() as string,
    categoryId: data?.get("categoryId")?.valueOf() as string,
})

export const createUser = async (data: FormData) => {
    const { firstname, lastname, email, plainPassword, role, } = userData(data)
    // }
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const imageList = ["/profile1.png", "/profile2.png", "/profile3.png", "/profile4.png", "/profile5.png",
    ]
    const image = Math.random() > 0.8 ? imageList[0] : Math.random() > 0.6 ? imageList[1] : Math.random() > 0.4 ? imageList[2] : Math.random() > 0.2 ? imageList[3] : imageList[4]
    // check duplicates
    const alreadyExists = await prisma.user.findFirst({
        where: { email: email.toLowerCase(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A user already exists with the same email`
        }
    }
    try {
        await prisma.user.create({
            data: {
                firstname, lastname, email, password, role, image, token: ""
            }
        })
        return { error: false, message: `New User Created Successfully. Please, check your email to complete the registration`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this user account`, }
    }

}

export const createSale = async (data: FormData) => {
    const user = await fetchUser()
    const { alcohol, drink, food, createdAt } = saleData(data)
    const alreadyExists = await prisma.sale.findFirst({
        where: { createdAt: new Date(createdAt).toISOString(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `There is an existing Sales Report for this Day. Feel free to modify it`
        }
    }
    try {
        await prisma.sale.create({
            data: {
                alcohol, drink, food, createdAt: new Date(createdAt).toISOString(), userId: user.id
            }
        })
        return { error: false, message: `New Sale Record Created Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this record`, }
    }

}

export const createCategory = async (data: FormData) => {
    const user = await fetchUser()
    const name = data?.get("name")?.valueOf() as string;
    // check duplicates
    const alreadyExists = await prisma.category.findFirst({
        where: { name: name.toLowerCase(), }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A category already exists with the same name`
        }
    }
    try {
        await prisma.category.create({
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
        await prisma.contact.create({
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

export const createMenu = async (data: FormData) => {
    const user = await fetchUser()
    const { name, price, image, description, categoryId, status, popular } = menuData(data)
    const slug = generateSlug(name)
    // check duplicates
    const alreadyExists = await prisma.menu.findFirst({
        where: {
            AND: [{ name: name.toLowerCase(), categoryId }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A menu already exists with the same name under this category`
        }
    }
    try {
        await prisma.menu.create({
            data: {
                name, slug, price, image, description, categoryId, userId: user.id, status: status as $Enums.FoodStatus, popular: popular === "on" ? true : false
            }
        })
        revalidatePath(appRoutePaths.adminmenu)
        return { error: false, message: `New Menu Record Created Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to create this menu record`, }
    }
}

// ACCOUNT RESET
export const handleReset = async (email: string) => {
    const validMail = await prisma.user.findFirst({ where: { email } })
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
        // await prisma.user.update({
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
    const validMail = await prisma.user.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have a member with this email...Please, confirm and try again` };
    try {
        await prisma.user.update({
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
        const validMail = await prisma.user.findFirst({ where: { email, token } })
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
        let data = await prisma.user.findMany({
            include: {
                category: { select: { id: true } },
                menu: { select: { id: true } }
            },
            orderBy: { createdAt: "desc" }
        }) as TUserProps[]
        data = user.role === "ROOT" ? data : data.filter((el) => el.role !== "ROOT")
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user.role }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchSales = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.sale.findMany({
            include: {
                user: {
                    select: {
                        id: true, firstname: true, lastname: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        }) as TSaleProps[]
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user.role }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchDashboardData = async () => {
    const user = await fetchUser()
    try {
        const [sales, menu, users, category] = await prisma.$transaction([
            prisma.sale.findMany({ select: { alcohol: true, drink: true, food: true } }),
            prisma.menu.findMany({ select: { id: true, status: true, price: true } }),
            prisma.user.findMany({ select: { id: true, status: true, role: true } }),
            prisma.category.findMany({
                include: {
                    menu: { select: { id: true, name: true } },
                    user: { select: { firstname: true, lastname: true, id: true } },
                },
                orderBy: { createdAt: "desc" }
            })
        ])
        return { error: false, message: `Record Retrieved Successfully.`, data: { sales, menu, users, category, user }, role: user.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchMessage = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.contact.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { error: false, message: `Record Retrieved Successfully.`, data, role: user.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchMenu = async () => {
    const user = await fetchUser()
    try {
        const data = await prisma.menu.findMany({
            include: {
                category: { select: { name: true } },
                user: { select: { firstname: true, lastname: true, id: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as TMenuProps[]
        const category = await prisma.category.findMany({
            where: { status: "VISIBLE" },
        }) as TCategory[]

        return { error: false, message: `Record Retrieved Successfully.`, data: { data, category }, role: user.role }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const fetchSearch = async (query: string) => {
    try {
        const data = await prisma.menu.findMany({
            where: {
                OR: [
                    {
                        name: { contains: query },
                    },
                    {
                        description: { contains: query }
                    },
                    {
                        category: {
                            name: { contains: query }
                        }
                    },
                ]
            },
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as Menu[]
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
        const menu = await prisma.menu.findMany({
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as Menu[]
        const category = await prisma.category.findMany({
            where: { status: "VISIBLE" },
            include: {
                menu: { select: { id: true, name: true } },
                user: { select: { firstname: true, lastname: true, id: true } },
            }
        }) as TCategoryProps[]

        return { error: false, message: `Record Retrieved Successfully.`, data: { menu, category } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

export const getSinglePageMenu = async ({ slug }: { slug: string }) => {
    let similar;
    try {
        const menu = await prisma.menu.findFirst({
            where: { slug },
            include: {
                category: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" }
        }) as (Menu & { category: { name: string } })
        if (menu) {
            similar = await prisma.menu.findMany({
                where: {
                    categoryId: menu.categoryId
                },
                take: 6
            })
        }
        else {
            similar = await prisma.menu.findMany({
                take: 6
            })
        }
        return { error: false, message: `Record Retrieved Successfully.`, data: { menu, similar } }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: `Unable to fetch this record`, }
    }
}

// UPDATE LOGICS
export const updateUser = async (data: FormData) => {
    const user = await fetchUser()
    const id = data?.get("id")?.valueOf() as string;
    const status = data?.get("status")?.valueOf() as $Enums.Status;
    const { firstname, lastname, email, plainPassword, role, image, verifyPassword } = userData(data)

    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    // check duplicates
    const alreadyExists = await prisma.user.findFirst({
        where: {
            id,
            NOT: [{ email: { contains: email.toLowerCase(), } }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `Another user already exists with the same email`
        }
    }
    try {
        const passwordMatched = await bcryptjs.compare(verifyPassword, user.password)
        if (passwordMatched) {
            if (plainPassword !== "") {
                await prisma.user.update({
                    data: { firstname, lastname, email, password, role, image, status, },
                    where: { id }
                })
            }
            else {
                await prisma.user.update({
                    data: { firstname, lastname, email, role, image, status, },
                    where: { id }
                })
            }
        }
        else {
            return { error: true, message: `The Password you have supplied is incorrect.`}
        }
        revalidatePath(appRoutePaths.adminprofile)
        return { error: false, message: `Record Updated Successfully.` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }
}

export const updateSale = async (data: FormData) => {
    const user = await fetchUser()
    const { alcohol, drink, food, createdAt } = saleData(data)
    const id = data?.get("id")?.valueOf() as string;

    const alreadyExists = await prisma.sale.findFirst({
        where: {
            createdAt: new Date(createdAt).toISOString(),
            NOT: [{ id }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `There is an existing Sales Report for this Day.`
        }
    }
    try {
        await prisma.sale.update({
            data: {
                alcohol, drink, food, createdAt: new Date(createdAt).toISOString(), userId: user.id
            },
            where: { id }
        })
        return { error: false, message: `Sale Record updated Successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }

}

export const updateMenu = async (data: FormData) => {
    const user = await fetchUser()
    const id = data?.get("id")?.valueOf() as string
    const { name, price, image, description, categoryId, status, popular } = menuData(data)
    const slug = generateSlug(name)
    // check duplicates
    const alreadyExists = await prisma.menu.findFirst({
        where: {
            AND: [{ name: name.toLowerCase(), categoryId }],
            NOT: [{ id }]
        }
    })
    if (alreadyExists) {
        return {
            error: true, message: `A menu already exists with the same name under this category`
        }
    }
    try {
        await prisma.menu.update({
            data: {
                name, slug, price, image, description, categoryId, userId: user.id, status: status as $Enums.FoodStatus, popular: popular === "on" ? true : false
            },
            where: { id }
        })
        revalidatePath(appRoutePaths.adminmenu)
        return { error: false, message: `Menu record updated successfully.`, }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this menu record`, }
    }
}

export const updateStatus = async (payload: { id: string, status: string }, table: IDENTIFIED_TABLES) => {
    const { id, status } = payload
    try {
        switch (table) {
            case "user": {
                prisma.user.update({
                    data: { status: status as $Enums.Status },
                    where: { id: id }
                })
            }
                break;
            case "menu": {
                prisma.menu.update({
                    data: { status: status as $Enums.FoodStatus },
                    where: { id: id }
                })
            }
                break;
            case "contact": {
                prisma.contact.update({
                    data: { status: status as $Enums.ContactStatus },
                    where: { id: id }
                })
            }
                break;
            case "category": {
                prisma.category.update({
                    data: { status: status as $Enums.FoodStatus },
                    where: { id: id }
                })
            }
                break;

            default: return null;
        }
        // table === "user" ? revalidatePath(appRoutePaths.adminuser) :
        // table === "menu" ? revalidatePath(appRoutePaths.adminmenu) :
        // table === "category" ? revalidatePath(appRoutePaths.admindashboard) :
        // table === "contact" ? revalidatePath(appRoutePaths.admincontact) :
        // revalidatePath(appRoutePaths.adminsales)
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
    const alreadyExists = await prisma.category.findFirst({
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
        await prisma.category.update({
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
                entityIDs.map(async (el) => {
                    await prisma.user.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "sales": {
                entityIDs.map(async (el) => {
                    await prisma.sale.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "menu": {
                entityIDs.map(async (el) => {
                    await prisma.menu.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "contact": {
                entityIDs.map(async (el) => {
                    await prisma.contact.delete({
                        where: { id: el }
                    })
                })
            }
                break;
            case "category": {
                entityIDs.map(async (el) => {
                    // Find the "General" category
                    const generalCategory = await prisma.category.findFirst({
                        where: { name: 'General' },
                    });
                    const updateMenu = prisma.menu.updateMany({
                        where: { categoryId: el },
                        data: { categoryId: generalCategory?.id }
                    })
                    const deleteCategory = prisma.category.delete({
                        where: { id: el },
                    })
                    await prisma.$transaction([updateMenu, deleteCategory])
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