
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
export type NotiType = {
    type: string,
    open: boolean
    msg: string,
    value: boolean,

}
const NotificationReducer = createSlice({
    name: "Notification",
    initialState: {} as NotiType,
    reducers: {
        setNoti: {
            reducer: (state: NotiType, action: PayloadAction<NotiType>) => {
                return (state = action.payload)
            },
            prepare: (msg: NotiType) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = NotificationReducer
export const { setNoti } = actions;

export default NotificationReducer