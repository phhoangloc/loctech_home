
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

const LoginRefreshReducer = createSlice({
    name: "LoginRefresh",
    initialState: 0,
    reducers: {
        setLoginReFresh: (state) => {
            return (state = state + 1)
        }
    }
})

export const { actions, reducer } = LoginRefreshReducer
export const { setLoginReFresh } = actions;

export default LoginRefreshReducer