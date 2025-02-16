import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/apis/authApi";   
import authReducer from "./authSlice"
import { profileApi } from "@/apis/profileApi";
import { courseApi } from "@/apis/courseApi";
import { paymentApi } from "@/apis/paymentApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer,
    [paymentApi.reducerPath] : paymentApi.reducer,
    auth:authReducer
});
export default rootReducer;