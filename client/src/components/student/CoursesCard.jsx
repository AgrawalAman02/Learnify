import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const CoursesCard = ({course}) => {  // getting course from the Course.jsx
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-[#302e2e3d] bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col gap-1.5">
        {/*  thumbnail */}
        <div className="relative">
          <img
            src={ course?.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
            alt="thumbnail"
            className="w-full  h-40 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="px-3 flex flex-col gap-2">
          {/* course title */}
          <h1 className="font-bold text-lg hover:underline truncate">
            {course?.courseTitle || "No Course Title Available..."} 
          </h1>
          {/* course Description */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar className="w-6 h-6">
                <AvatarImage src= { course?.creator?.photoUrl ||course?.creator?.name.split(" ")[0][0] +course?.creator?.name.split(" ")[1][0]  || course?.creator?.name.split(" ")[0][0] || "https://github.com/shadcn.png"} />
                <AvatarFallback className=" text-sm ">{course?.creator?.name.split(" ")[0][0] +course?.creator?.name.split(" ")[1][0]  || course?.creator?.name.split(" ")[0][0] } </AvatarFallback>
              </Avatar>
              {/* creater Name */}
              <h4 className="text-sm font-normal">{course?.creator?.name || "Anonymous"}</h4>
            </div>
            {/* Course Level */}
            <Badge className="bg-indigo-600 dark:bg-indigo-600 dark:text-white p-1.5 px-2 rounded-full">{course?.courseLevel || "Beginner"}</Badge>
          </div>
          {/* Course Price */}
          <div>
            <span className="font-medium">₹{course?.price || "Free"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesCard;
