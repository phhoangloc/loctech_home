'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Article from '@/component/article'
import Items from '@/component/items'
import Detail from '@/component/detail'
import PageDetail from '@/component/page.detail'
import ProfileDetail from '@/component/profile.detail'
const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    switch (archive) {
        case "news":
            return (<Items archive={archive} limit={10} />)
        case "blog":
            return (<Article limit={10} />)
        case "profile":
            return (<ProfileDetail />)
        default:
            return (<PageDetail />)
    }
}

export default Page