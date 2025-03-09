import { fetchDashboardData } from '@/action'
import React from 'react'
import { GrUserWorker } from 'react-icons/gr'
// import { IoFastFoodSharp } from 'react-icons/io5'
import { LuScrollText, LuUtensilsCrossed } from 'react-icons/lu'
import { CategoryContainer } from './components'
import prisma from '@/lib/prisma'

export default async function DashboardContainer() {
  const [sales, allTotalFoodPrice, allTotalCategory, users] = await prisma.$transaction([
    prisma.sale.aggregate({
      _sum: { alcohol: true, drink: true, food: true },
    }),
    prisma.menu.groupBy({
      by: ["status"],
      _count: { id: true },
      _sum: { price: true },
      orderBy: { status: "desc" }
    }),
    prisma.menu.groupBy({
      by: ['categoryId'], // Group menus by `categoryId`
      _count: { id: true }, // Count menus in each category
      _sum: { price: true }, // Sum the prices of menus in each category
      orderBy: { categoryId: "desc" },
    }),
    prisma.user.groupBy({
      by: ["role"],
      _count: { id: true },
      orderBy: { role: "desc" }
    })
  ])
  const admins = users.map(({ _count, role }) => ({ _count: _count?.valueOf(), role }))
  console.log(sales, allTotalFoodPrice, allTotalCategory, users, admins)

  const res = await fetchDashboardData()
  const totalAlcohol = sales._sum.alcohol ?? 0
  const totalDrink = sales._sum.drink ?? 0
  const totalFood = sales._sum.food ?? 0
  const allAdmins = res?.data?.users.filter(el => el.role === "ADMIN").length ?? 0
  const allUsers = res?.data?.users.filter(el => el.role === "USER").length ?? 0
  const totalSales = totalAlcohol + totalDrink + totalFood;
  const totalMenu = res?.data?.menu.reduce((oldValue, item) => item.price * oldValue, 0)
  const activeMenu = res.data?.menu.filter(el => el.status === "VISIBLE")
  const inActiveMenu = res.data?.menu.filter(el => el.status === "HIDDEN")
  const totalUsers = res?.data?.users.length

  return (
    <main className='flex flex-col gap-8'>
      <section className="flex flex-wrap gap-4">
        <aside className="max-w-xs flex-shrink-0 bg-white p-4 rounded-md shadow shadow-slate-200 flex flex-col">
          <div className="flex-1 flex-shrink-0">
            <h2 className="text-xsmall font-medium">Hello, <span className="heading-three text-secondary font-semibold">{res?.data?.user.firstname} {res?.data?.user.lastname}</span></h2>
            <p className="text-xsmall font-urbanist opacity-75">Here you can manage your online store</p>
          </div>
          <div style={{ borderTop: "1px solid #ddd", paddingTop: '.45rem' }} className="text-xxsmall font-urbanist flex justify-end gap-4">
            <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-primary flex-shrink-0"></span> {res?.data?.user?.role === "ROOT" ? "MAIN ADMIN" : res?.data?.user?.role}</p>
          </div>
        </aside>
        <div className="flex-1 flex flex-wrap gap-4">
          <aside className="w-1/2 md:w-1/4 bg-white p-4 rounded-md shadow shadow-slate-200 flex-1 flex-shrink-0 flex flex-col">
            <div className="flex-1 flex justify-between">
              <div className="flex-shrink-0 h-10 w-10 rounded-md grid place-items-center bg-primary text-white">
                <LuScrollText className='text-xl flex-shrink-0' />
              </div>
              <div className="flex flex-col items-end">
                <p style={{ opacity: .7 }} className="text-xxsmall font-urbanist opacity-75 text-right">Sales</p>
                <h2 className="flex-shrink-0 text-lg text-right font-bold">&#8358;{totalSales?.toLocaleString()}</h2>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #ddd", paddingTop: '.45rem' }} className="text-xxsmall font-urbanist flex justify-end gap-4">
              {/* <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-primary flex-shrink-0"></span> {allFood.toLocaleString()} Food</p>
              <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-secondary flex-shrink-0"></span> {allAlcohol.toLocaleString()} Alcohol</p>
              <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-red-500 flex-shrink-0"></span> {allDrink.toLocaleString()} Drink</p> */}
            </div>
          </aside>
          <aside className="w-1/2 md:w-1/4 bg-white p-4 rounded-md shadow shadow-slate-200 flex-1 flex-shrink-0 flex flex-col">
            <div className="flex-1 flex justify-between">
              <div className="flex-shrink-0 h-10 w-10 rounded-md grid place-items-center bg-primary text-white">
                <LuUtensilsCrossed className='text-xl flex-shrink-0' />
              </div>
              <div className="flex flex-col items-end">
                <p style={{ opacity: .7 }} className="text-xxsmall font-urbanist opacity-75 text-right">Food</p>
                <h2 className="flex-shrink-0 text-lg text-right font-bold">&#8358;{totalMenu?.toLocaleString()}</h2>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #ddd", paddingTop: '.45rem' }} className="text-xxsmall font-urbanist flex justify-end gap-4">
              <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-primary flex-shrink-0"></span> {activeMenu?.length.toLocaleString()} Active</p>
              <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-secondary flex-shrink-0"></span> {inActiveMenu?.length.toLocaleString()} Inactive</p>
            </div>
          </aside>
          <aside className="w-1/2 md:w-1/4 bg-white p-4 rounded-md shadow shadow-slate-200 flex-1 flex-shrink-0 flex flex-col">
            <div className="flex-1 flex justify-between">
              <div className="flex-shrink-0 h-10 w-10 rounded-md grid place-items-center bg-primary text-white">
                <GrUserWorker className='text-xl flex-shrink-0' />
              </div>
              <div className="flex flex-col items-end">
                <p style={{ opacity: .7 }} className="text-xxsmall font-urbanist opacity-75 text-right">Staff</p>
                <h2 className="flex-shrink-0 text-lg text-right font-bold">{totalUsers?.toLocaleString()}</h2>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #ddd", paddingTop: '.45rem' }} className="text-xxsmall font-urbanist flex justify-end gap-4">
              {/* <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-primary flex-shrink-0"></span> {allMainAdmins?.toLocaleString()} Food</p> */}
              {/* {
                users.map(({ _count: { id }, role }) => (
                  <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-primary flex-shrink-0"></span> {_count?.valueOf().toLocaleString()} {role}</p>
                ))
              } */}
              <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-primary flex-shrink-0"></span> {allAdmins.toLocaleString()} Admins</p>
              <p className='flex items-center gap-1 text-xs'><span className="grid h-2 w-2 bg-red-500 flex-shrink-0"></span> {allUsers.toLocaleString()} Staff</p>
            </div>
          </aside>
        </div>
      </section>
      <CategoryContainer data={res.data?.category} role={res.role!} />
    </main>
  )
}
