import CourseTab from "@/components/admin/course/CourseTab";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const EditCourse = () => {
  return (
    <div className="flex-1 ">
      < div className="flex flex-col justify-between mb-5 items-center w-[370px] md:w-[700px] lg:w-[1100px]">
        <div className="flex w-full justify-between p-2 ">
          <Link to={`/admin/course`}>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <ArrowLeft size={16} />
              </Button>
            </Link>
          <Link to={"lecture"}>
            <Button  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-urbanist font-bold md:px-6 md:text-lg ">
              Click to add Lectures
            </Button>
          </Link>
        </div>
        <div className="flex  items-center w-full jsuti bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mt-2 ml-4  text-indigo-600 dark:text-indigo-400 font-lekton">
          <h1 className="font-bold text-xl md:text-3xl">Add detailed information regarding course...</h1>
        </div>
      </div>

      <div className="p-2">
        <CourseTab/>
      </div>
    </div>
  );
};

export default EditCourse;
