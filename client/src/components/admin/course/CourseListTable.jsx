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
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CourseListTable = () => {
  const { data, isLoading, isSuccess, error, isError } = useGetCourseQuery();

  useEffect(()=>{
    if(isError) toast.error(error.message);
  },[isError]);

  return (
    <div className="w-[1150px]">
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Table>
            <TableCaption>A list of your courses...</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px] text-start">Title</TableHead>
                <TableHead className="w-[200px]">Price</TableHead>
                <TableHead className="w-[300px]">Category</TableHead>
                <TableHead className="w-[200px]">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.courseList?.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium text-start">
                    {course.courseTitle}
                  </TableCell>
                  <TableCell>{ course?.price || "Free"}</TableCell>
                  <TableCell>{ course?.category.toUpperCase() }</TableCell>
                  <TableCell> {course?.isPublished? <Badge className="bg-green-600 dark:bg-green-400">Published </Badge> : <Badge className="bg-red-600 dark:bg-red-400">Draft</Badge>}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="w-15 items-end">
                      <Link to={course._id}><Edit/></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CourseListTable;
