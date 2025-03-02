import React from "react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link instead of useNavigate

const SearchResult = ({ courses = [] }) => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  return (
    <div>
      <div className="mt-4 flex flex-col items-start gap-6 px-4 md:p-4 md:px-24 my-4 overflow-y-auto scrollbar-hide">
        {courses.length === 0 ? (
          <p className="text-center w-full py-8 text-gray-500">
            No courses found matching your criteria
          </p>
        ) : (
          courses.map((course) => (
            <Link
              to={isAuthenticated ? `/courseDetails/${course?._id}` : "/auth"}
              className="w-full"
              key={course?._id}
            >
              <div className="flex flex-col md:flex-row justify-between border rounded-lg w-full bg-gray-50 dark:bg-gray-950 cursor-pointer hover:shadow-md transition-shadow">
                <div>
                  <img
                    src={
                      course?.thumbnail ||
                      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    }
                    alt="coursethumbnail"
                    className="md:w-80 md:h-44 w-full h-40 rounded-l-lg object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full md:w-3/5 p-4 relative">
                  <h2 className="font-urbanist font-bold text-lg md:text-2xl">
                    {course?.courseTitle}
                  </h2>
                  <h3 className="font-outfit font-medium dark:text-gray-300 text-gray-700 text-sm">
                    {course?.courseSubTitle}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-800 rounded-full">
                      <AvatarImage
                        src={course?.creator?.photoUrl}
                        alt={course?.creator?.name}
                      />
                      <AvatarFallback className="text-sm bg-indigo-100 dark:bg-indigo-900">
                        {course?.creator?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {course?.creator?.name || "Anonymous"}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full justify-between">
                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {course?.price ? `₹${course.price}` : "Free"}
                    </div>
                    <Badge className="absolute bottom-4 md:bottom-6 lg:bottom-8 right-8 z-20 bg-indigo-600/90 dark:bg-indigo-500/90 text-white px-3 py-1">
                      {course?.courseLevel || "Beginner"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResult;