'use client'
import React, { useEffect, useState } from 'react'
import store from '../store'
import { ApiCheckLogin } from '@/api/user'
import { setUser, UserType } from '../reducer/UserReduce'
import { NotiType } from '../reducer/NotificationReduce'

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {

    const [_currentRefresh, set_currentRefresh] = useState<number>(store.getState().refresh)
    const update = () => {
        store.subscribe(() => set_currentRefresh(store.getState().refresh))
    }
    useEffect(() => {
        update()
    }, [])

    const isLogin = async () => {
        const result = await ApiCheckLogin()
        if (result.success) {
            store.dispatch(setUser(result.data))
        } else {
            store.dispatch(setUser({} as UserType))
        }

    }

    useEffect(() => {
        isLogin()
    }, [_currentRefresh])

    return (
        children
    )
}

export default Provider