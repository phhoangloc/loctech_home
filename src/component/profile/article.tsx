import React, { useEffect, useState } from 'react'
import { ItemType } from '@/app/page'
import { CardArticleProfile } from '../card'
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import { ApiItemUser } from '@/api/user'
import { useRouter } from 'next/navigation'

type Props = {
    blogName?: string,
    limit: number
}
const ArticleProfile = ({ blogName, limit }: Props) => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)

    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])

    const [_items, set_items] = useState<ItemType[]>([])
    const getItem = async (position: string, limit: number) => {
        const result = await ApiItemUser({ position, archive: "blog", limit })
        set_items(result.data)
    }
    useEffect(() => {
        if (_currentUser) {
            getItem(_currentUser.position, limit)
        } else {
            getItem("", limit)
        }
    }, [_currentUser, limit])
    const toPage = useRouter()

    return (
        <div className="w-full">
            <div className="h-12"></div>
            <div className="flex gap-2">
                <div className="text-three uppercase h-12 flex flex-col justify-center text-2xl font-bold ">{blogName ? blogName : "current article"} </div>
                <button className='h-6 text-sm rounded-md my-auto px-2 bg-three text-white cursor-pointer' onClick={() => toPage.push("/profile/blog/news")}>new blog</button>
            </div>
            <div className=" w-full bg-white shadow-md rounded-md overflow-hidden">
                <div className="h-12 bg-three text-white px-2 flex flex-col justify-center">title</div>
                <div className="px-2">
                    {_items?.length ?
                        _items.map((re, index) =>
                            <CardArticleProfile archive={re.archive} category={re.category.name} name={re.name} slug={re.slug} content={re.content} createAt={re.createdAt} author={re.host.username} key={index} />
                        )
                        : <div className='h-12 flex flex-col justify-center text-center text-four'>there are no blog yet!</div>}
                </div>

            </div>
        </div>
    )
}

export default ArticleProfile