import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const COURSE_URL = SERVER_URL+"course";

export const courseApi = createApi({
    reducerPath : "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl : COURSE_URL,
        credentials : "include",
    }),
    
    endpoints : (builder)=>({
        addCourse : builder.mutation({
            query : ({courseTitle, category,price})=>({
                url : "/",
                method : "POST",
                body: {courseTitle,category,price},
            }),
        })
    })

})

export const { useAddCourseMutation } = courseApi;