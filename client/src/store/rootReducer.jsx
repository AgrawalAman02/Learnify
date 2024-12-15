import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/apis/authApi";   
import authReducer from "./authSlice"

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
});
export default rootReducer;