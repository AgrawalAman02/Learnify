import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const PROGRESS_URL = SERVER_URL+"progress";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl : PROGRESS_URL,
    credentials : "include",
  }),

  endpoints  : (builder)=>({
    getCourseProgress : builder.query({
      query : ({courseId})=>({
        url : `/getCourseProgress/${courseId}`,
        method : "GET",
      }),
      providesTags : ["refetchCourseProgress"],
    }),

    updateLectureProgress : builder.mutation({
      query: ({courseId, lectureId})=>({
        url : `/updateLectureProgress/${courseId}/lecture/${lectureId}`,
        method : "POST",
      }),
      invalidatesTags : ["refetchCourseProgress"],
    }),

    markAsComplete : builder.mutation({
      query : ({courseId})=>({
        url : `markAsComplete/${courseId}`,
        method : "POST",
      }),
      invalidatesTags : ["refetchCourseProgress"],
    }),

    markAsIncomplete : builder.mutation({
      query : ({courseId}) =>({
        url : `markAsIncomplete/${courseId}`,
        method : "POST",
      }),
      invalidatesTags : ["refetchCourseProgress"],
    }),
  })

});
