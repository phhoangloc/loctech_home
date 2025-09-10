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


const Detail = () => {
    const params = useParams<{ archive: string, slug: string }>()
    const slug = params.slug
    const archive = params.archive
    const [_item, set_item] = useState<ItemType>()
    const getItem = async (archive: string, slug: string) => {
        const result = await ApiItem({ archive, slug })
        set_item(result.data[0])
    }
    useEffect(() => {
        getItem(archive, slug)
    }, [archive, slug])


    return (
        <div className="w-full max-w-(--md)" >
            <div className="h-12"></div>
            <div className=" justify-end text-two/50 text-sm mb-1">{_item?.category?.name} </div>
            {
                _item ?
                    <CardArticleDetail archive={archive} category={_item?.category?.name} name={_item?.name} slug={_item?.slug} content={_item?.content} createAt={_item?.createdAt} author={_item?.host.username} /> :
                    null
            }
            <div className="h-12 flex gap-4">
                <div className="flex">
                    <LikeOutline sx="p-2 fill-four" />
                    <div className="h-full flex flex-col justify-center font-bold text-four">12</div>
                </div>
                <div className="">
                    <Comment sx='p-2 fill-four' />
                </div>
            </div>
            {archive === "blog" ? <Article limit={3} /> : <Items archive={archive} limit={3} />}
        </div>
    )
}

export default Detail