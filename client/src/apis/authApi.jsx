import { addLoggedInUser } from "@/store/authSlice";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { profileApi } from "./profileApi";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const USER_URL = SERVER_URL+"user/";

export const authApi = createApi({
    reducerPath : "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_URL,
        credentials : "include",
    }),
    endpoints : (builder)=>({
        registerUser : builder.mutation({
            query : (inputData)=>({
                url : "register",
                method : "POST",
                body: inputData
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(addLoggedInUser({ user: result.data}))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loginUser : builder.mutation({
            query : (inputData)=>({
                url : "login",
                method : "POST",
                body: inputData
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(addLoggedInUser({ user: result.data}))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser : builder.mutation({
            query : ()=>({
                url:"logout",
                method : "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // This will fix both the My Learning and Edit Profile pages
                    dispatch(profileApi.util.invalidateTags(['refetchProfile']));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = authApi