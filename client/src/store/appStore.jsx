import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/apis/authApi";
import {profileApi} from "@/apis/profileApi"
import { courseApi } from "@/apis/courseApi";

const appStore = configureStore({
    reducer : rootReducer,
    middleware : (d)=>d().concat(authApi.middleware,profileApi.middleware, courseApi.middleware),
});
export default appStore;

const initializeApp = async ()=>{
    await appStore.dispatch(profileApi.endpoints.getUser.initiate({},{forceRefetch : true}))
}
initializeApp();