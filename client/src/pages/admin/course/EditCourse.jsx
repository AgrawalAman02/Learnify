import CourseTab from "@/components/admin/course/CourseTab";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const EditCourse = () => {
  return (
    <div className="flex-1 ">
      < div className="flex justify-between mb-5 items-center w-[300px] md:w-[700px] lg:w-[1100px]">
        <h1 className="font-bold text-xl  ">Add detailed information regarding course...</h1>
        <Link to={"lecture"}>
          <Button variant="outline" className="hover:text-blue-800 dark:hover:text-blue-500">
            Go to Lectures Page
          </Button>
        </Link>
      </div>

      <div>
        <CourseTab/>
      </div>
    </div>
  );
};

export default EditCourse;
