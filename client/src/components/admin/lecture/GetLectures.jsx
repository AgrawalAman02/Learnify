import { useGetLectureQuery } from "@/apis/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const GetLectures = () => {
  const params = useParams();
  const { courseId } = params;

  const { data, isLoading, isSuccess, isError, error } =
    useGetLectureQuery(courseId);
  const lectures = data?.lectures;
  const navigate = useNavigate();
  console.log(data);

  return (
    <div className="flex flex-col gap-2 w-full ml-6 ">
      {!lectures || lectures.length === 0 ? (
        <p>No lectures found</p>
      ) : (
        lectures.map((lecture, index) => (
          <div
            key={lecture?._id}
            className="flex justify-between items-center h-10  p-4 rounded-lg  bg-gray-100 w-[1100px]  dark:bg-slate-700 border "
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
