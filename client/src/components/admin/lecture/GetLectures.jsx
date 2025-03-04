import { useGetLectureQuery } from "@/apis/courseApi";
import { Edit, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const GetLectures = () => {
  const params = useParams();
  const { courseId } = params;

  const { data, isLoading, isSuccess, isError, error } =
    useGetLectureQuery(courseId);
  const lectures = data?.lectures;
  const navigate = useNavigate();

  if(isLoading) return <div className="flex mt-4 justify-center"> <Loader2 className="animate-spin text-blue-900 text-lg "/></div>
 
  return (
    <div className="flex flex-col gap-2 px-4 md:px-1  md:max-w-7xl md:ml-6 ">
      {!lectures || lectures.length === 0 ? (
        <p className="font-mono">No lectures found</p>
      ) : (
        lectures.map((lecture, index) => (
          <div
            key={lecture?._id}
            className="flex justify-between items-center h-10  p-4 rounded-lg  bg-gray-100 w-full  dark:bg-slate-700 border "
          >
            <div className=" font-bold text-gray-800 dark:text-gray-100">
              {" "}
              <span>Lecture-{index + 1} : </span> {lecture.lectureTitle}
            </div>
            <div>
              <Edit
                size={20}
                onClick={() => {
                  navigate(`${lecture._id}`);
                }}
                className="cursor-pointer text-gray-800 dark:text-gray-100  hover:text-blue-900 dark:hover:text-blue-400 "
              />{" "}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetLectures;
