import CoursesCard from "@/components/student/CoursesCard";
import ShimmerCard from "@/components/student/ShimmerCard";
import React from "react";

const MyLearning = () => {
  const isLoading = false;
  const myCourses = [];
  return (
    <div className="max-w-[75rem] mx-auto px-4 md:px-0 my-20">
      <h2 className="font-bold text-2xl text-center underline underline-offset-8 decoration-double decoration-1">My Learning</h2>

      <div className="my-10">
        { myCourses.length === 0 ? (
            <p className="font-mono font-semibold text-base underline underline-offset-4 max-w-3xl  mx-auto">
            You hadn't enrolled to any courses until now! Please enroll to some
            courses to enjoy the learning experience at our platform! <br /> <br />{" "}
            Hehe! Then this page will not look empty...{" "}
          </p>
          
        ) : isLoading ?(
            <ShimmerCard />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CoursesCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
