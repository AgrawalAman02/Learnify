import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { addLoggedInUser } from "@/store/authSlice";
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
            providesTags : ["refetchProfile"],
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(addLoggedInUser({ user: result.data}))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser : builder.mutation({
            query: (formData)=>({
                url:"update",
                method : "PUT",
                body : formData,
                credentials : "include",
            })
        }),

        instructor : builder.mutation({
            query : ()=>({
                url : "/instructor",
                method : "POST",
            }),
            invalidatesTags: ["refetchProfile"],
        })
    })
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useInstructorMutation,
} = profileApi