import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const COURSE_URL = SERVER_URL + "course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_URL,
    credentials: "include",
  }),
  tagTypes: ["refetchListOfCourse", "refetchLectures","refetchLectureDetails"],

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
      query: ({ updatedData, courseId }) => ({
        url: `/updateCourse/${courseId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["refetchListOfCourse"],
    }),

    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `/getCourse/${courseId}`,
        method: "GET",
      }),
    }),

    publishCourse : builder.mutation({
      query : ({courseId,query})=>({
        url : `/publishCourse/${courseId}?publish=${query}`,
        method : "PUT",
      }),
      invalidatesTags : ["refetchListOfCourse"],
    }),

    getPublishedCourse : builder.query({
      query : ()=>({
        url : "/getPublishedCourse",
        method : "GET",
      }),
    }),

    getCoursePurchasedDetails : builder.query({
      query : (courseId)=>({
        url : `getCourseDetails/${courseId}`,
        method : "GET",
      }),
    }),

    searchCourse : builder.query({
      query : ({query, categories, sortByPrice, difficultyLevel})=>{
        
        let queryString = `/search?query=${query ? encodeURIComponent(query) : ""}`;

        // append category 
        if(categories && categories.length>0 ){
          const categoryString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoryString}`;
        }

        // append sortByPrice 
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        // append difficultyLevel
        if(difficultyLevel && difficultyLevel.length > 0){
          const levelString = difficultyLevel.map(encodeURIComponent).join(",");
          queryString += `&difficultyLevel=${levelString}`;
        }
        
        return {
          url : queryString,
          method : "GET",
        }
      },
    }),

    // creating api for lectures here ...

    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `${courseId}/createLecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["refetchLectures"],
    }),

    getLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/getLecture`,
        method: "GET",
      }),
      providesTags: ["refetchLectures"],
    }),

    editLecture: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
      invalidatesTags: ["refetchLectures", "refetchLectureDetails"],
    }),

    deleteLecture: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `${courseId}/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refetchLectures"],
    }),

    getLectureById: builder.query({
      query: ({ courseId, lectureId }) => ({
        url: `${courseId}/getLecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["refetchLectureDetails"],
    }),
  }),
});



export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetCourseDetailsQuery,
  usePublishCourseMutation,
  useGetPublishedCourseQuery,
  useCreateLectureMutation,
  useGetLectureQuery,
  useEditLectureMutation,
  useDeleteLectureMutation,
  useGetLectureByIdQuery,
  useGetCoursePurchasedDetailsQuery,
  useSearchCourseQuery,
} = courseApi;
