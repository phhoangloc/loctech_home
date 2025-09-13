'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Article from '@/component/article'
import PageDetail from '@/component/page.detail'
import ProfileDetail from '@/component/profile.detail'
import News from '@/component/news'
const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    switch (archive) {
        case "news":
            return (<News limit={15} />)
        case "blog":
            return (<Article limit={10} />)
        case "profile":
            return (<ProfileDetail />)
        default:
            return (<PageDetail />)
    }
}

export default Page