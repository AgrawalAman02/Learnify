import React from "react";
import CoursesCard from "./CoursesCard";
import ShimmerCard from "./ShimmerCard";

const Courses = () => {
  const isLoading = false;
  return (
    <div className="bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-3xl text-center mb-10">Our Coures</h1>  
        <div>
          {
          !isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CoursesCard />
            </div>
          ) : (
            <ShimmerCard/>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default Courses;
