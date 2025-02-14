import React, { useEffect } from "react";
import CoursesCard from "./CoursesCard";
import ShimmerCard from "./ShimmerCard";
import { useGetPublishedCourseQuery } from "@/apis/courseApi";
import { toast } from "sonner";

const Courses = () => {
  const { data, isLoading,  error, isError } =
    useGetPublishedCourseQuery();

  useEffect(()=>{
    if(isError) toast.error(error?.data?.message || "Error while fetching the course ");
  },[isError, error])
  const courses = data?.courses;
  return (
    <div className="bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-3xl text-center mb-10">Our Coures</h1>
        <div>
          {!isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.length > 0 ? (
                courses.map((course)=>(
                  <div key={course._id}> <CoursesCard course={course}/> </div>
                ))
              ) : (
                <>
                  <p>No Courses available</p>
                </>
              )}
            </div>
          ) : (
            <ShimmerCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
