'use client'
import { Menu } from '@/icon/menu'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { User } from '@/icon/user'
import { MenuModal, MenuModalProfile } from './menu'
import store from '@/redux/store'
import { setMenu } from '@/redux/reducer/MenuReduce'
import { UserType } from '@/redux/reducer/UserReduce'
import { ApiLogout } from '../api/user'
import { NotiType, setNoti } from '@/redux/reducer/NotificationReduce'
import { setLoginReFresh } from '@/redux/reducer/LoginRefreshReduce'
const Header = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const [_currentNoti, set_currentNoti] = useState<NotiType>(store.getState().noti)

    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
        store.subscribe(() => set_currentNoti(store.getState().noti))
    }
    useEffect(() => {
        update()
    }, [])

    const [_openAccount, set_openAccount] = useState<boolean>(false)
    const toPage = useRouter()


    const [_isLogout, set_isLogout] = useState<boolean>(false)

    useEffect(() => {
        const logout = async () => {
            const result = await ApiLogout({ position: _currentUser.position })
            if (result.success) {
                store.dispatch(setNoti({ open: true, value: false, msg: result.data, type: "noti" }))
                setTimeout(() => {
                    store.dispatch(setNoti({ open: false, value: false, msg: "", type: "noti" }))
                    store.dispatch(setLoginReFresh())
                    toPage.push("/")
                }, 3000);
            } else {
                store.dispatch(setNoti({ open: true, value: false, msg: result.data, type: "noti" }))
                setTimeout(() => {
                    store.dispatch(setNoti({ open: false, value: false, msg: "", type: "noti" }))
                }, 3000);
            }
        }
        if (_isLogout && _currentNoti.value) {
            set_isLogout(false)
            logout()
        }
    }, [_isLogout, _currentNoti.value, _currentUser.position, toPage])

    return (
        <div className={`h-12 flex justify-between w-full max-w-(--md) lg:max-w-(--lg) xl:max-w-(--xl) m-auto relative z-1 text-three`}>
            <div className='w-max text-3xl font-bold px-2 tracking-wie cursor-pointer' onClick={() => toPage.push("/")}>LOCTECH</div>
            <div className='flex'>
                <div onClick={() => set_openAccount(!_openAccount)} className='flex cursor-pointer'><User sx="p-2 " /><div className='h-full justify-center flex flex-col'>{_currentUser.username}</div></div>
                <div onClick={() => store.dispatch(setMenu(!store.getState().menu))} className='cursor-pointer'><Menu sx="p-2  lg:hidden" /></div>
            </div>
            <div className='absolute top-12 w-full max-w-(--xl) m-auto'>
                {archive === "profile" ? <MenuModalProfile /> : <MenuModal />}
                {_currentUser.id ?
                    <div className={`w-40 bg-white absolute rounded-md shadow-md right-12 p-1 ${_openAccount ? "block" : "hidden"}`}>
                        <div className='h-12 flex flex-col justify-center px-1 cursor-pointer rounded-md hover:bg-three/25 border-b border-one' onClick={() => { set_openAccount(false); toPage.push("/profile/blog/news") }}>create blog</div>
                        <div className='h-12 flex flex-col justify-center px-1 cursor-pointer rounded-md hover:bg-three/25 border-b border-one' onClick={() => { set_openAccount(false); toPage.push("/profile") }}>profile</div>
                        <div className='h-12 flex flex-col justify-center px-1 cursor-pointer rounded-md hover:bg-three/25' onClick={() => { set_openAccount(false); set_isLogout(true); store.dispatch(setNoti({ open: true, msg: "do you want to log out", type: "confirm", value: false })) }}>Log out</div>
                    </div> : <div className={`w-40 bg-white absolute rounded-md shadow-md right-12 p-1 ${_openAccount ? "block" : "hidden"}`}>
                        <div className='h-12 flex flex-col justify-center px-1 cursor-pointer rounded-md hover:bg-three/25 border-b border-one' onClick={() => { set_openAccount(false); toPage.push("/login") }}>Log In</div>
                        <div className='h-12 flex flex-col justify-center px-1 cursor-pointer rounded-md hover:bg-three/25' onClick={() => { set_openAccount(false); toPage.push("/signup") }}>Sign Up</div>
                    </div>}
            </div>
        </div>
    )
}

export default Header