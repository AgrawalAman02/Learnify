import LectureTab from "@/components/admin/lecture/LectureTab";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

const EditLecture = () => {
  const params = useParams();
  const { lectureId, courseId } = params;
  return (
    <div>
      <div className="flex flex-col  justify-center mb-5 gap-6">
        <div className="flex items-center gap-4">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <ArrowLeft size={16} />
            </Button>
          </Link>

          <h1 className="border  bg-gray-100 w-full dark:bg-gray-800 h-10 font-bold text-lg rounded-lg p-4 flex items-center">
            Update Your Lecture Here
          </h1>
        </div>

        <LectureTab/>
      </div>
    </div>
  );
};

export default EditLecture;
