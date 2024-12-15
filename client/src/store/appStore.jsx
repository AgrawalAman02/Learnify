import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/apis/authApi";

const appStore = configureStore({
    reducer : rootReducer,
    middleware : (d)=>d().concat(authApi.middleware),
});
export default appStore;