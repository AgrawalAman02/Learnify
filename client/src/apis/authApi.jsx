import { addLoggedInUser } from "@/store/authSlice";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
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
        // logoutUser : builder.mutation({
        //     query : (inputData)=>({
        //         url:"logout",
        //         method : "POST",
        //         body : inputData
        //     }),
        // }),
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    
} = authApi