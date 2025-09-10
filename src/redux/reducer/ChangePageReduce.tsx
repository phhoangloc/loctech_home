
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

export type ChangePageType = {
    time: number,
    nextPage: string
}
const ChangePageReducer = createSlice({
    name: "ChangePage",
    initialState: { time: 0, nextPage: "" } as ChangePageType,
    reducers: {
        setChangePage: {
            reducer: (state: ChangePageType, action: PayloadAction<ChangePageType>) => {
                return (state = action.payload)
            },
            prepare: (msg: ChangePageType) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = ChangePageReducer
export const { setChangePage } = actions;

export default ChangePageReducer