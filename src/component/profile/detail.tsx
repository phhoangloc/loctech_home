'use client'
import { ApiItem } from '@/api/client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ApiCreateItem, ApiDeleteItem, ApiUpdateItem } from '@/api/user'
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import DeleteIcon from '@mui/icons-material/Delete';
import { setNoti } from '@/redux/reducer/NotificationReduce'
const TextArea = dynamic(() => import("../input/textarea"), { ssr: false });

type PageType = {
    id: number,
    name: string,
    slug: string,
    content: string,
    categoryId?: number,
    category?: {
        name: string
    },
}
const DetailProfile = () => {
    const params = useParams<{ slug: string, slugp: string }>()
    const archive = params.slug
    const slug = params.slugp
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])
    const [_item, set_item] = useState<PageType>()

    const getItems = async (archive: string, slug: string) => {
        const result = await ApiItem({ archive, slug })
        if (result.success) {
            set_item(result.data[0])
        } else {
            set_item(undefined)
        }
    }
    useEffect(() => {
        getItems(archive, slug)
    }, [archive, slug])

    const [_id, set_id] = useState<number>(0)
    const [_categoryId, set_categoryId] = useState<number>()
    const [_name, set_name] = useState<string>("")
    const [_slug, set_slug] = useState<string>("")
    const [_content, set_content] = useState<string>("")
    const [_new_content, set_new_content] = useState<string>("")

    useEffect(() => {
        if (_item) {
            set_id(_item.id)
            set_name(_item.name)
            set_slug(_item.slug)
            set_content(_item.content)
            set_categoryId(_item.categoryId)
        }
    }, [_item])


    const updateItem = async (id: number, body: { name: string, slug: string, content: string, categoryId: number | undefined }) => {

        const result = await ApiUpdateItem({ position: _currentUser.position, archive: archive, id }, body)
        console.log(result)
    }

    const toPage = useRouter()
    const createItem = async (body: { name: string, slug: string, content: string, categoryId: number | undefined }) => {
        const result = await ApiCreateItem({ position: _currentUser.position, archive: archive }, body)
        if (result.success) {
            toPage.push("/")
        } else {
            store.dispatch(setNoti({ open: true, value: false, msg: "you have something wrong", type: "noti" }))
            setTimeout(() => {
                store.dispatch(setNoti({ open: false, value: false, msg: "", type: "noti" }))
            }, 3000);
        }
    }
    const deleteItem = async (id: number) => {
        const result = await ApiDeleteItem({ position: _currentUser.position, archive: archive, id })
        if (result.success) {
            toPage.push("/")
        } else {
            store.dispatch(setNoti({ open: true, value: false, msg: "you have something wrong", type: "noti" }))
            setTimeout(() => {
                store.dispatch(setNoti({ open: false, value: false, msg: "", type: "noti" }))
            }, 3000);
        }
    }
    const body = {
        name: _name,
        slug: _slug,
        content: _new_content || _content,
        categoryId: _categoryId
    }

    const [_category, set_category] = useState<{ name: string, id: number }[]>([])
    const getCategory = async () => {
        const result = await ApiItem({ archive: "category" })
        if (result.success) {
            set_category(result.data)
        } else {
            set_category([])
        }
    }
    useEffect(() => {
        getCategory()
    }, [archive, slug])

    return (
        <div className='pb-24'>
            <div>URL:</div>
            <div className='flex h-12'>
                <div className='h-full flex flex-col justify-center'>/{archive}/</div>
                <input className='w-60 bg-white shadow-md h-10 rounded-md px-2' value={_slug} onChange={(e) => set_slug(e.target.value)} onFocus={(e) => e.currentTarget.style.outline = "none"} />
            </div>
            <div>title</div>
            <div><input className='w-full bg-white shadow-md h-10 rounded-md px-2 font-sans' value={_name} onChange={(e) => set_name(e.target.value)} onFocus={(e) => e.currentTarget.style.outline = "none"} /></div>
            <div>content</div>
            <div className='bg-white px-1 pb-6'>
                <TextArea value={_content} onChange={(v) => set_new_content(v)} />
            </div>
            <div>category</div>
            {
                archive === "blog" ?
                    <select className='font-sans w-40 bg-white border border-three/25 h-12 block' value={_categoryId} onChange={(e) => set_categoryId(Number(e.currentTarget.value))}>
                        <option value={0} className='font-sans'>---</option>
                        {_category.map((_cate, index) => <option key={index} value={_cate.id} className='font-sans'>{_cate.name}</option>)}
                    </select> :
                    null
            }
            <div className="h-6"></div>
            <div className="flex justify-between">
                {_id != 0 ?
                    <button onClick={() => updateItem(_id, body)} className='!w-40 rounded-md h-12 bg-three text-white uppercase cursor-pointer' >Update</button>
                    : <button onClick={() => createItem(body)} className='!w-40 rounded-md h-12 bg-three text-white uppercase cursor-pointer' >create</button>

                }
                {_id != 0 ? <DeleteIcon className='!w-12 !h-12 p-2 text-three opacity-50 hover:opacity-100 cursor-pointer' onClick={() => deleteItem(_id)} /> : null}
            </div>
        </div>
    )
}

export default DetailProfile