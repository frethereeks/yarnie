import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { FaUserEdit } from 'react-icons/fa'

export default async function DashImage() {
    const data = await getServerSession(authOptions)
    return (
        <>
            <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 relative bg-primary rounded-full overflow-hidden">
                {
                    data?.user?.image ? <Image src={data?.user?.image} alt={`${data.user.name}`} fill className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" /> :
                        <FaUserEdit className='text-lg flex-shrink-0' />
                }
            </div>
        </>
    )
}
