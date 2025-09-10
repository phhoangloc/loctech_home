import { NotiType, setNoti } from '@/redux/reducer/NotificationReduce'
import store from '@/redux/store'
import React, { useEffect, useState } from 'react'

export const ModalNoti = () => {

    const [_currentNoti, set_currentNoti] = useState<NotiType>(store.getState().noti)
    const update = () => {
        store.subscribe(() => set_currentNoti(store.getState().noti))
    }
    useEffect(() => {
        update()
    }, [])

    switch (_currentNoti.type) {
        case "confirm":
            return (
                <div className={`w-screen h-screen fixed top-0 left-0 z-1 overflow-hidden ${_currentNoti.open ? "block" : "hidden"}`}>
                    <div className={`absolute bottom-4 right-4 bg-three text-white p-2 rounded-lg shadow-md transition-all duration-1000 ${_currentNoti.open ? "translate-y-[0%]" : "translate-y-[200%]"}`}>
                        <div>{_currentNoti.msg}</div>
                        <div className="h-1"></div>
                        <div className="flex justify-center">
                            <div className='uppercase hover:text-five w-10 cursor-pointer text-sm' onClick={() => store.dispatch(setNoti({ open: false, msg: "", value: true, type: "" }))}>yes</div>
                            <div className='uppercase hover:text-five w-10 cursor-pointer text-sm' onClick={() => store.dispatch(setNoti({ open: false, msg: "", value: false, type: "" }))}>No</div>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className={`w-screen h-screen fixed top-0 left-0 z-1 overflow-hidden ${_currentNoti.open ? "block" : "hidden"}`}>
                    <div className={`absolute bottom-4 right-4 bg-three text-white p-2 rounded-lg shadow-md transition-all duration-1000 ${_currentNoti.open ? "translate-y-[0%]" : "translate-y-[200%]"}`}>{_currentNoti.msg}</div>
                </div>
            )
    }

}

