import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/apis/authApi";   
import authReducer from "./authSlice"
import { profileApi } from "@/apis/profileApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    auth:authReducer
});
export default rootReducer;