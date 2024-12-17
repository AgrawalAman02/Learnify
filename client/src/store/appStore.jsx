import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/apis/authApi";
import {profileApi} from "@/apis/profileApi"

const appStore = configureStore({
    reducer : rootReducer,
    middleware : (d)=>d().concat(authApi.middleware,profileApi.middleware),
});
export default appStore;