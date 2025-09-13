import { ItemType } from '@/app/page'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Article from './article'
import { CardArticleDetail } from './card'
import { LikeOutline } from '@/icon/like'
import { Comment } from '@/icon/comment'
import { ApiItem } from '@/api/client'
import Items from './items'


const PageDetail = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    const [_item, set_item] = useState<ItemType>()
    const getItem = async (archive: string) => {
        const result = await ApiItem({ archive: "page", slug: archive })
        set_item(result.data[0])
    }
    useEffect(() => {
        getItem(archive)
    }, [archive])


    return (
        <div className="w-full max-w-(--md)" >
            <div className="h-12"></div>
            <div className=" justify-end text-two/50 text-sm mb-1">{_item?.category?.name} </div>
            {
                _item ?
                    <CardArticleDetail archive={archive} category={""} name={_item?.name} slug={""} content={_item?.content} createAt={_item?.createdAt} author={""} /> :
                    <div className='text-center font-bold font-serif text-2xl'>Page Not Found!</div>
            }
        </div>
    )
}

export default PageDetail