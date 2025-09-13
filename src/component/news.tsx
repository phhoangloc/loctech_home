import { ApiAlert } from '@/api/client';
import React, { useEffect, useState } from 'react'
import { CardItemTop } from './card';

type NewsType = {
    title: string,
    link: string,
    content: string,
    pubDate: Date
}
const News = ({ limit }: { limit: number }) => {
    const [_items, set_items] = useState<NewsType[]>([])
    useEffect(() => {

        const getFeed = async () => {
            const result = await ApiAlert();
            if (result.success) {
                set_items(it => [...it, ...result.data])
            }
        }
        getFeed()
    }, [])

    return (
        _items.length ?
            <div className="">
                <div className="h-12"></div>
                <div className=" justify-end text-two/50 text-sm mb-1">news</div>
                <div className="bg-white p-2">
                    {_items.slice(0, limit).map((re, index) =>
                        <CardItemTop name={re.title} content={re.content} createAt={re.pubDate} key={index} category={''} author={''} slug={re.link} archive={''} />)}
                    <div className='text-center h-8 text-sm flex flex-col justify-'></div>
                </div>
            </div> :
            null)
}

export default News