import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardItemTop } from './card'
import { ItemType } from '@/app/page'
import { ApiItem } from '@/api/client'

type Props = {
    archive: string
    limit: number
}

const Items = ({ archive, limit }: Props) => {
    const [_items, set_items] = useState<ItemType[]>([])
    const getItem = async (archive: string, limit: number) => {
        const result = await ApiItem({ archive, limit })
        // console.log(result)
        set_items(result.data)
    }
    useEffect(() => {

        getItem(archive, limit)

    }, [archive, limit])

    return (
        <div className="">
            <div className="h-12"></div>
            <div className=" justify-end text-two/50 text-sm mb-1">news</div>
            <div className="flex flex-col gap-3">
                {_items ?
                    _items.map((re, index) => <CardItemTop archive={re.archive} name={re.name} content={re.content} createAt={re.createdAt} key={index} category={''} author={''} slug={re.slug} />)
                    : null}
            </div>
        </div>
    )
}

export default Items