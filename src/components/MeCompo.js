import Image from 'next/image';
import { me } from '../../public/assets'

function Me() {
    return (
        <>
            <Image  placeholder='blur'
                    blurDataURL={`${process.env.VERCEL_URL}/assets/me/me.jpg`}
                    src={me}
                    alt=""
                    width={160}
                    height={160}
                    className='w-[160px] h-[160px] border-2 rounded-full'
            />
        </>
    )
}

export default Me;