import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const COURSE_URL = SERVER_URL + "course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_URL,
    credentials: "include",
  }),
  tagTypes: ["refetchListOfCourse"],

  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: ({ courseTitle, category, price }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category, price },
      }),
      invalidatesTags: ["refetchListOfCourse"],
    }),

    getCourse: builder.query({
      query: () => ({
        url: "/getCourse",
        method: "GET",
      }),
      providesTags: ["refetchListOfCourse"],
    }),

    updateCourse: builder.mutation({
      query: ({updatedData,courseId}) => ({
        url: `/updateCourse/${courseId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["refetchListOfCourse"],
    }),

    getCourseDetails : builder.query({
      query : (courseId)=>({
        url : `/getCourse/${courseId}`,
        method : "GET",
      }),
    })
  }),
});

export const { useAddCourseMutation, useGetCourseQuery ,useUpdateCourseMutation, useGetCourseDetailsQuery} = courseApi;
