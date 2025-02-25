import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const PAYMENT_URL = SERVER_URL+"payment";

export const paymentApi = createApi({
    reducerPath : "paymentApi",
    baseQuery : fetchBaseQuery({
        baseUrl : PAYMENT_URL,
        credentials : "include",
    }),
    endpoints : (builder)=>({
        createOrder : builder.mutation({
            query : (courseId)=>({
                url : "/createOrder",
                method : "POST",
                body : {courseId},
            }),
        }),
        getCoursePaymentStatus : builder.mutation({
            query : (courseId)=>({
                url : "/getCoursePaymentStatus",
                method : "POST",
                body : {courseId},
            }),
        }),
    })
})

export const { useCreateOrderMutation ,
    useGetCoursePaymentStatusMutation,
} = paymentApi;