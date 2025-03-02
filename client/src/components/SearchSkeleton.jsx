import React from "react";
import { Skeleton } from "./ui/skeleton";

const SearchSkeleton = () => {
  return (
    <div>
      <div>
        <div className="mt-4 flex flex-col items-start gap-6 md:p-4 md:px-24 my-4 overflow-y-auto scrollbar-hide">
          {[1, 2, 3].map((_, index) => (
            <div
              className="flex justify-between border rounded-lg w-full"
              key={index}
            >
              <div>
                <Skeleton className="md:w-80 md:h-44 w-36 h-24 rounded-l-lg" />
              </div>

              <div className="flex flex-col gap-2 w-1/2  p-4 ">
                <Skeleton className={"w-52 h-6"}/>
                <Skeleton className="w-20 h-4 "/>
                <Skeleton className={"w-40 h-5"}/>

                <Skeleton className={"w-32 h-7 mt-2"}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSkeleton;
