'use client'
import Detail from '@/component/detail'
import ArticleProfile from '@/component/profile/article'
import { useParams } from 'next/navigation'
import React from 'react'


const Page = () => {
    const params = useParams<{ slug: string }>()
    const archive = params.slug
    switch (archive) {
        case "blog":
            return (
                <div className="">
                    <ArticleProfile blogName='blog' limit={10} />
                </div>
            )
        default:
            return <Detail />
    }

}

export default Page