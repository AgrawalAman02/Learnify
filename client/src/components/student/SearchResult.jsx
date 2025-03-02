import React from "react";
import { Badge } from "../ui/badge";

const SearchResult = () => {
  return (
    <div>
      <div className="mt-4 flex flex-col items-start gap-6 md:p-4 md:px-24 my-4 overflow-y-auto scrollbar-hide">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 123].map((_, index) => (
          <div className="flex justify-between border rounded-lg w-full bg-gray-50 dark:bg-gray-950" key={index}>
            <div>
              <img
                src="https://res.cloudinary.com/dj5dijps9/image/upload/v1740070590/nhx2zeg99lrgbuvireoc.webp"
                alt="coursethumbnail"
                className="md:w-80 md:h-44 w-36 h-24 rounded-l-lg"
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2  p-4 ">
              <h2 className="font-urbanist font-bold text-lg md:text-2xl">Course Title</h2>
              <h3 className="font-outfit font-medium dark:text-gray-300 text-gray-700 text-sm ">subtitle</h3>
              <p className="text-sm"> Instructor : <span className="font-bold font-outfit underline ">Its me!</span></p>
              <Badge  className={"w-fit font-outfit text-sm"}>Beginner</Badge>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
