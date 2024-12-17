import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const PROFILE_URL = SERVER_URL+"profile/";

export const profileApi = createApi({
    reducerPath : "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: PROFILE_URL,
        credentials : "include",
    }),
    endpoints : (builder)=>({
        getUser : builder.query({
            query : ()=>({
                url : "getProfile",
                method : "GET",
            }),
        })
    })
})

export const {
    useGetUserQuery,
} = profileApi