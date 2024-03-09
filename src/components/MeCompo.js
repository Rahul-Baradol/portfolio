import Image from 'next/image';
import { me, meBlur } from '../../public/assets'

function Me() {
    return (
        <>
            <Image placeholder='blur' blurDataURL="/assets/me/me.jpg" src={me} alt="" width={160} height={160} className='w-[160px] h-[160px] border-2 rounded-full' />
        </>
    )
}

export default Me;