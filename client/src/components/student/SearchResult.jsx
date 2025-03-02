import React from "react";
import { Badge } from "../ui/badge";

const SearchResult = ({courses =[]}) => {
  return (
    <div>
      <div className="mt-4 flex flex-col items-start gap-6 md:p-4 md:px-24 my-4 overflow-y-auto scrollbar-hide">
        {
          courses.length === 0 ? (
            <p className="text-center w-full py-8 text-gray-500">No courses found matching your criteria</p>
          ) : (
            courses.map((course, index) => (
              <div className="flex justify-between border rounded-lg w-full bg-gray-50 dark:bg-gray-950" key={course?._id}>
                <div>
                  <img
                    src={course?.thumbnail}
                    alt="coursethumbnail"
                    className="md:w-80 md:h-44 w-36 h-24 rounded-l-lg"
                  />
                </div>
  
                <div className="flex flex-col gap-2 w-1/2  p-4 ">
                  <h2 className="font-urbanist font-bold text-lg md:text-2xl">{course?.courseTitle}</h2>
                  <h3 className="font-outfit font-medium dark:text-gray-300 text-gray-700 text-sm ">{course?.courseSubTitle}</h3>
                  <p className="text-sm"> Instructor : <span className="font-bold font-outfit underline ">{course?.creator?.name}</span></p>
                  <Badge  className={"w-fit font-outfit text-sm"}>{course?.courseLevel}</Badge>
  
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default SearchResult;
