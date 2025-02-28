import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/apis/authApi";   
import authReducer from "./authSlice"
import { profileApi } from "@/apis/profileApi";
import { courseApi } from "@/apis/courseApi";
import { paymentApi } from "@/apis/paymentApi";
import { courseProgressApi } from "@/apis/courseProgressApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer,
    [paymentApi.reducerPath] : paymentApi.reducer,
    [courseProgressApi.reducerPath] : courseProgressApi.reducer,
    auth:authReducer
});
export default rootReducer;