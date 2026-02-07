import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader';

const ShortenUrlPage = () => {
    const { url } = useParams();

    useEffect(() => {
        if (url) {
            window.location.href = import.meta.env.VITE_BACKEND_URL + `${url}`;
        }
    }, [url]);
    return <>
        <p className='text-center text-[80px] font-bold text-slate-800'>Redirecting to Your URL...</p>
        <Loader />
    </>;
}

export default ShortenUrlPage