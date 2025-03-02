import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { useSelector } from "react-redux";

const CoursesCard = ({course}) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((store)=>store.auth.isAuthenticated);
  
  return (
    <Card className="group overflow-hidden rounded-xl dark:bg-slate-800/50 bg-white shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        <img
          src={course?.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
          alt="thumbnail"
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 z-20 bg-indigo-600/90 dark:bg-indigo-500/90 text-white px-3 py-1">
          {course?.courseLevel || "Beginner"}
        </Badge>
      </div>

      <CardContent className="p-5 flex flex-col gap-4 flex-grow">
        {/* Course Title */}
        <h1 
          className="font-bold text-lg hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer line-clamp-2"
          onClick={() => (isAuthenticated ? navigate(`courseDetails/${course?._id}`): navigate("auth"))}
        >
          {course?.courseTitle || "No Course Title Available..."}
        </h1>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course?.lectures?.length || 0} lectures</span>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-800">
              <AvatarImage 
                src={course?.creator?.photoUrl || "https://github.com/shadcn.png"} 
                alt={course?.creator?.name}
              />
              <AvatarFallback className="text-sm bg-indigo-100 dark:bg-indigo-900">
                {course?.creator?.name?.split(" ").map(n => n[0]).join("") || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{course?.creator?.name || "Anonymous"}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {course?.price ? `₹${course.price}` : "Free"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesCard;