import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { otherData } from '../../constants/constants'

require('dotenv').config({ path: '.env.local' });

export default function Home(props) {
    const [HomeCompo, setHomeCompo] = useState(null);

    useEffect(() => {
        setHomeCompo(() => {
            return dynamic(() => import('../components/HomeRecipe'), {
                ssr: false,
                loading: () => <h1>Loading...</h1>
            });
        })
    }, [setHomeCompo]);

    return (
        <>
            {
                HomeCompo ? <HomeCompo aboutme={props.otherData.aboutme} /> : <></>
            }
        </>
    )
}

export async function getStaticProps() {
    return { props: { otherData } }
}