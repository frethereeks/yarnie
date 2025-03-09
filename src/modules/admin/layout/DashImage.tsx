import { fetchUser } from '@/action'
import Image from 'next/image'

export default async function DashImage() {
    const { image, firstname, lastname } = await fetchUser()
    return (
        <>
            <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 relative bg-primary rounded-full overflow-hidden">
                <Image src={image!} alt={`${firstname} ${lastname}`} fill className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" />
            </div>
        </>
    )
}
