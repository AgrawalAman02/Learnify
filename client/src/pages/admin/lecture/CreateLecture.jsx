import {
  useAddCourseMutation,
  useCreateLectureMutation,
} from "@/apis/courseApi";
import SelectOne from "@/components/admin/course/SelectOne";
import GetLectures from "@/components/admin/lecture/GetLectures";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { courseId } = params;

  const [createLecture, { data, isLoading, isError, error, isSuccess }] =
    useCreateLectureMutation();
  const createLectureBtnHandler = async () => {
    await createLecture({ courseId, lectureTitle });
    setLectureTitle("");
  };

  useEffect(() => {
    if (isError) toast.error("Kuch toh gadbad hai! Sayad ", error.message);
    else if (isSuccess) toast.success("Bravo! Lecture added successfully");
  }, [isSuccess, error, isError]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="p-4 flex flex-col items-start flex-1">
          <p className="text-2xl font-bold">Lets add new lectures...</p>
          <p className="text-sm font-medium mt-2 mb-2">
            {" "}
            Please provide full details for your new lecture{" "}
          </p>
        </div>

        <div className="p-2 flex flex-col gap-3 ml-4 flex-1">
          <Label htmlFor="LectureName">Title</Label>
          <Input
            type="text "
            id="LectureName"
            placeholder="Your Lecture Name "
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex gap-4 p-2 ml-4 mt-2 flex-1">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureBtnHandler}>
            {" "}
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please Wait...
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>

      <div>
        <GetLectures/>
      </div>
    </div>
  );
};

export default CreateLecture;
