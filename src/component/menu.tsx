import { setMenu } from '@/redux/reducer/MenuReduce'
import store from '@/redux/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type MenuType = {
    name: string,
    link: string
}
export const MenuModal = () => {
    const [_current_menu, set_current_menu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => set_current_menu(store.getState().menu))
    }
    useEffect(() => {
        update()
    }, [])
    const [_item, set_item] = useState<MenuType[]>([])
    const getItem = async () => {
        const result = await axios.get("/data/menu.json")
        set_item(result.data)
    }
    useEffect(() => {
        getItem()
    }, [])
    const toPage = useRouter()
    return (
        <div className={`w-40 px-1 bg-white absolute rounded-md shadow-md right-2 ${_current_menu ? "block" : "hidden"}`}>
            {_item.map((it: MenuType, index: number) =>
                <div key={index} className='h-12 flex flex-col justify-center px-1 border-b border-one' onClick={() => { store.dispatch(setMenu(false)); toPage.push(it.link) }}>{it.name}</div>
            )}
        </div>)
}
export const MenuComponent = () => {
    const [_item, set_item] = useState<MenuType[]>([])
    const getItem = async () => {
        const result = await axios.get("/data/menu.json")
        set_item(result.data)
    }
    useEffect(() => {
        getItem()
    }, [])
    const toPage = useRouter()
    return (
        <div className={`w-full px-1 sticky top-0`}>
            {_item.map((it: MenuType, index: number) =>
                <div className='h-12 flex flex-col justify-center cursor-pointer px-1 rounded-md uppercase text-three hover:bg-three/25 hover:font-bold' key={index} onClick={() => { toPage.push(it.link) }}>{it.name}</div>
            )}
        </div>)
}
export const MenuModalProfile = () => {
    const [_current_menu, set_current_menu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => set_current_menu(store.getState().menu))
    }
    useEffect(() => {
        update()
    }, [])
    const [_item, set_item] = useState<MenuType[]>([])
    const getItem = async () => {
        const result = await axios.get("/data/menuprofile.json")
        set_item(result.data)
    }
    useEffect(() => {
        getItem()
    }, [])
    const toPage = useRouter()
    return (
        <div className={`w-40 px-1 bg-white absolute rounded-md shadow-md right-2 ${_current_menu ? "block" : "hidden"}`}>
            {_item.map((it: MenuType, index: number) =>
                <div key={index} className='h-12 flex flex-col justify-center px-1 border-b border-one cursor-pointer' onClick={() => { store.dispatch(setMenu(false)); toPage.push("/profile/" + it.link) }}>{it.name}</div>
            )}
        </div>)
}
export const MenuProfile = () => {
    const [_item, set_item] = useState<MenuType[]>([])
    const getItem = async () => {
        const result = await axios.get("/data/menuprofile.json")
        set_item(result.data)
    }
    useEffect(() => {
        getItem()
    }, [])
    const toPage = useRouter()
    return (
        <div className={`w-full px-1 sticky top-0`}>
            {_item.map((it: MenuType, index: number) =>
                <div className='h-12 flex flex-col justify-center cursor-pointer px-1 rounded-md uppercase text-three hover:bg-three/25 hover:font-bold' key={index} onClick={() => { toPage.push("/profile/" + it.link) }}>{it.name}</div>
            )}
        </div>)
}