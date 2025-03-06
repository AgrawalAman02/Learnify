import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import VideoContainer from "@/components/student/VideoContainer";
import { CheckCircle2, Loader2, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useGetCourseProgressQuery, useMarkAsCompleteMutation, useMarkAsIncompleteMutation } from "@/apis/courseProgressApi";
import { toast } from "sonner";
import LoaderSpinner from "../LoaderSpinner";

const VideoPlayer = () => {
  const { courseId } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { data, isLoading, isError, error } =
    useGetCourseProgressQuery(courseId);
  const [localIsCompleted, setLocalIsCompleted] = useState(false);
  const [markAsComplete,{data:markCompleteData,isLoading:marking, isSuccess:markedCompleteSuccess}] = useMarkAsCompleteMutation();
  const [markAsIncomplete,{data:markIncompleteData,isLoading:unmarking, isSuccess:markedIncompleteSuccess}] = useMarkAsIncompleteMutation();
  const [currentLecture, setCurrentlecture] = useState(null);

  const course = data?.data?.courseDetails;
  const isCompleted = data?.data?.isCompleted;
  const progress = data?.data?.progress;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };

    checkScreenSize();
    // Add listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || error?.message);
  }, [isError, error]);

  useEffect(() => {
    setLocalIsCompleted(isCompleted);
  }, [isCompleted]);

  const initialLecture =
    currentLecture || (course?.lectures && course?.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some(
      (lecture) => lecture?.lectureId === lectureId && lecture.isViewed 
    );
  };

  const handleComplete =async ()=>{
    try {
      setLocalIsCompleted(true); 
      const response = await markAsComplete(courseId);
      toast.success(response?.message || "Course marked complete successfully...");
    } catch (error) {
      setLocalIsCompleted(false); 
      toast.error('Failed to mark complete');
    }
  }

  const handleIncomplete =async ()=>{
    try {
      setLocalIsCompleted(false); 
      const response = await markAsIncomplete(courseId);
      toast.success(response?.message || "Course marked incomplete successfully...");
    } catch (error) {
      setLocalIsCompleted(true); 
      toast.error('Failed to mark incomplete');
    }
  }

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="mt-20 p-4 h-[calc(100vh-80px)]">
      <ResizablePanelGroup
        direction={`${isMobile ? "vertical" : "horizontal"}`}
        className="h-full w-full rounded-lg border shadow-md"
      >
        {/* left side panel */}
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center p-6">
            <VideoContainer
              initialLecture={initialLecture}
              currentLecture={currentLecture}
              course={course}
              isLectureCompleted={isLectureCompleted}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* right side panel */}
        <ResizablePanel defaultSize={40}>
          <ResizablePanelGroup direction="vertical">
            {/* right top panel */}
            <ResizablePanel defaultSize={20}>
              <div className="flex flex-col h-full items-center justify-start my-auto p-6">
                <div className="flex justify-between mb-4 w-full max-h-full ">
                  <h1 className="text-3xl font-urbanist font-bold underline underline-offset-2">
                    {course?.courseTitle || "Course Title"}
                  </h1>
                  <Button
                    onClick={isCompleted ? handleIncomplete : handleComplete}
                  
                  >{(marking || unmarking )? <><Loader2 className="w-8 h-8 animate-spin"/> Marking...</>:(localIsCompleted ? "Reset" : "Mark as Complete") } </Button>
                </div>

                <div className="flex items-center justify-start w-full px-4 font-lekton text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    {course?.courseSubTitle? course?.courseSubTitle : ""}
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />

            {/* right bottom panel */}
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6  overflow-y-auto scrollbar-hide ">
                <div className={`w-full h-full flex flex-col gap-2 `}>
                  {course?.lectures.map((lecture, index) => (
                    <div
                      key={lecture?._id}
                      className={`flex gap-4 items-center mb-2 justify-between border p-2 rounded-xl pl-4 w-full min-h-16 hover:cursor-pointer transition-transform ${
                        lecture?._id === currentLecture?._id
                          ? "bg-gray-200 dark:bg-gray-800"
                          : ""
                      }`}
                      onClick={() => setCurrentlecture(lecture)}
                    >
                      <div className="flex gap-4">
                        {isLectureCompleted(lecture?._id) ? (
                          <CheckCircle2
                            size={24}
                            className="text-green-700 dark:text-green-500 "
                          />
                        ) : (
                          <PlayCircle size={24} />
                        )}
                        <span>{`${index + 1}.  ${lecture.lectureTitle}`}</span>
                      </div>
                      {isLectureCompleted(lecture?._id) && (
                        <Badge
                          variant={"outline"}
                          className={
                            "text-green-600 bg-[#94fb9495] dark:bg-[#00800033]"
                          }
                        >
                          Completed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default VideoPlayer;
