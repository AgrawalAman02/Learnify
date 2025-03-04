import { useGetUserQuery } from "@/apis/profileApi";
import CoursesCard from "@/components/student/CoursesCard";
import ShimmerCard from "@/components/student/ShimmerCard";
import React from "react";

const MyLearning = () => {

  const {data,isLoading}  = useGetUserQuery();
  const myCourses = data?.enrolledAt;
  const length = myCourses?.length || 0;
  return (
    <div className="max-w-[75rem] mx-auto px-4 md:px-0 my-20">
      <h2 className="font-bold text-2xl text-center underline underline-offset-8 decoration-double decoration-1">My Learning</h2>

      <div className="my-10">
        { length === 0 ? (
            <p className="font-mono font-semibold text-sm underline underline-offset-4 max-w-3xl  mx-auto">
            You hadn't enrolled to any courses until now! Please enroll to some
            courses to enjoy the learning experience at our platform! <br /> <br />{" "}
            Hehe! Then this page will not look empty...{" "}
          </p>
          
        ) : isLoading ?(
            <ShimmerCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {myCourses.map((course) => (
              <CoursesCard key={course._id} course={course} />
            ))}
            
          </div>  
          
        )}
      </div>
    </div>
  );
};

export default MyLearning;
