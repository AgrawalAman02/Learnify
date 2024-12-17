import React from "react";
import { Skeleton } from "../ui/skeleton";

const ShimmerCard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0c0c0c3a] shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
          >
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-5 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerCard;
