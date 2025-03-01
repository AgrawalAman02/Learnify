import React from "react";

const SearchResult = () => {
  return (
    <div>
      <div className="mt-4 flex flex-col items-start gap-6 md:p-4 md:px-24 my-4 overflow-y-auto scrollbar-hide">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 123].map((_, index) => (
          <div className="flex justify-between border rounded-lg w-full">
            <div>
              <img
                src="https://res.cloudinary.com/dj5dijps9/image/upload/v1740070590/nhx2zeg99lrgbuvireoc.webp"
                alt="coursethumbnail"
                className="md:w-72 md:h-44 w-36 h-24 rounded-l-lg"
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2   ">
              <h2>Course Title</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
