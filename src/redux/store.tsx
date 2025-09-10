import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/MenuReduce";
import ChangePageReducer from "./reducer/ChangePageReduce";
import UserReducer from "./reducer/UserReduce";
import NotificationReducer from "./reducer/NotificationReduce";
import LoginRefreshReducer from "./reducer/LoginRefreshReduce";
const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        user: UserReducer.reducer,
        changePage: ChangePageReducer.reducer,
        noti: NotificationReducer.reducer,
        refresh: LoginRefreshReducer.reducer
    }
})

export default store