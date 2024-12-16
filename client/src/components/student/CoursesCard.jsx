import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const CoursesCard = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-[#302e2e3d] bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col gap-1.5">
        <div className="relative">
          <img
            src="https://i.ytimg.com/vi/RVFAyFWO4go/maxresdefault.jpg"
            alt="ReactCourseImg"
            className="w-full  h-40 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="px-3 flex flex-col gap-2">
          <h1 className="font-bold text-lg hover:underline truncate">
            React 9 Hours Full Course
          </h1>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <h4 className="text-sm font-normal">Akshay Saini</h4>
            </div>
            <Badge className="bg-indigo-600 dark:bg-indigo-600 dark:text-white p-2 px-4 rounded-full">Badge</Badge>
          </div>
          <div>
            <span className="font-medium">₹499</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesCard;
