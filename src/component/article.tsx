import React, { useEffect, useState } from 'react'
import { ItemType } from '@/app/page'
import axios from 'axios'
import { CardArticleTop } from './card'
import { ApiItem } from '@/api/client'

type Props = {
    blogName?: string,
    limit: number
}
const Article = ({ blogName, limit }: Props) => {
    const [_items, set_items] = useState<ItemType[]>([])
    const getItem = async (category: string, limit: number) => {
        const result = await ApiItem({ archive: "blog", category, limit })
        set_items(result.data)
    }
    useEffect(() => {
        if (blogName) {
            getItem(blogName, limit)
        } else {
            getItem("", limit)
        }
    }, [blogName, limit])

    return (
        <div className="w-full">
            <div className="h-12"></div>
            <div className=" justify-end text-two/50 text-sm mb-1">{blogName ? blogName : "current article"} </div>
            <div className="flex flex-col gap-3 w-full">
                {_items.length ?
                    _items.map((re, index) =>
                        <CardArticleTop archive={re.archive} category={re.category.name} name={re.name} slug={re.slug} content={re.content} createAt={re.createdAt} author={re.host.username} key={index} />
                    )
                    : "there are no blog yet!"}

            </div>
        </div>
    )
}

export default Article