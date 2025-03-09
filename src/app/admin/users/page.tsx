import { fetchUsers } from '@/action'
import UsersContainer from '@/modules/admin/users/UsersContainer'
import { TUserProps } from '@/types';
import { Role, Status } from '@prisma/client';
import React from 'react'

export type TData = ({ category: { id: string; }[]; menu: { id: string; }[]; } & { id: string; firstname: string; lastname: string; image: string | null; email: string; password: string; status: Status; role: Role; token: string | null; createdAt: Date; updatedAt: Date; })[]

export default async function AdminUsersPage() {
  const fetch = await fetchUsers()
  const data = fetch.data as unknown as TUserProps[];

  return (
    <main>
      <UsersContainer data={data} role={fetch.role!} />
    </main>
  )
}
