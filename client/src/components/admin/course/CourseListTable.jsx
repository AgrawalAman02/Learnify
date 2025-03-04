import { useGetCourseQuery } from "@/apis/courseApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoaderSpinner from "@/pages/LoaderSpinner";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CourseListTable = () => {
  const { data, isLoading, isSuccess, error, isError } = useGetCourseQuery();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError]);

  // Handle responsive layout detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="w-full flex justify-center">
      <div className={`${isMobile ? 'w-full px-4' : 'w-full'}`}>
        {isMobile ? (
          // Mobile Card View
          <div className="space-y-4">
            {data?.courseList?.map((course) => (
              <div
                key={course._id}
                className="border rounded-lg p-4 shadow-sm bg-slate-100 dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-900"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{course.courseTitle}</h3>
                  <Button variant="ghost" size="sm">
                    <Link to={course._id}>
                      <Edit size={16} />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500 dark:text-gray-400">Price:</div>
                  <div>{course?.price || "Free"}</div>
                  
                  <div className="text-gray-500 dark:text-gray-400">Category:</div>
                  <div>{course?.category?.toUpperCase()}</div>
                  
                  <div className="text-gray-500 dark:text-gray-400">Status:</div>
                  <div>
                    {course?.isPublished ? (
                      <Badge className="bg-green-600 dark:bg-green-400">Published</Badge>
                    ) : (
                      <Badge className="bg-red-600 dark:bg-red-400">Draft</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-sm text-center text-gray-500 pt-2">
              A list of your courses...
            </div>
          </div>
        ) : (
          // Desktop Table View - Fixed width and alignment
          <div className="w-full overflow-x-auto border rounded-lg shadow-sm ">
            <Table>
              <TableCaption>A list of your courses...</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start w-1/3">Title</TableHead>
                  <TableHead className="w-1/6">Price</TableHead>
                  <TableHead className="w-1/6">Category</TableHead>
                  <TableHead className="w-1/6">Status</TableHead>
                  <TableHead className="text-right w-1/6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.courseList?.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium text-start">
                      {course.courseTitle}
                    </TableCell>
                    <TableCell>{course?.price || "Free"}</TableCell>
                    <TableCell>{course?.category?.toUpperCase()}</TableCell>
                    <TableCell>
                      {course?.isPublished ? (
                        <Badge className="bg-green-600 dark:bg-green-400">
                          Published
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600 dark:bg-red-400">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" className="w-15 items-end">
                        <Link to={course._id}>
                          <Edit />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListTable;