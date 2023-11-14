import Image from 'next/image';
import { me } from '../../public/assets'

function Me() {
    return (
        <>
            <Image src={me} alt="" width={160} height={160} className='w-[160px] h-[160px] border-2 rounded-full' />
        </>
    )
}

export default Me;