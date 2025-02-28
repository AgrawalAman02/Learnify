import React from "react";
import { useUpdateLectureProgressMutation } from "@/apis/courseProgressApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const VideoContainer = ({ initialLecture, currentLecture, course, isLectureCompleted }) => {
  const {courseId} = useParams();
  const [updateLectureProgress,{isLoading}] = useUpdateLectureProgressMutation();
  const handleLectureProgress =async (lectureId)=>{
    try {
      !isLectureCompleted(lectureId) && await updateLectureProgress({ courseId, lectureId });
    } catch (err) {
      toast.error('Failed to update progress');
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full overflow-y-auto scrollbar-hide">
      <div>
        <video
          src={currentLecture?.videoUrl || initialLecture?.videoUrl}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; 
          }}
          controls
          className="w-full h-full max-w-7/8 md:rounded-lg rounded-sm "
          onPlay={()=>handleLectureProgress(currentLecture?._id || initialLecture?._id)}
        />
      </div>
      <div>
        <h2 className="text-2xl font-urbanist font-bold">
          {`Lecture ${
            course?.lectures?.findIndex(
              (lecture) =>
                lecture?._id === (currentLecture?._id || initialLecture?._id)
            ) + 1
          } -  ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
        </h2>
      </div>
    </div>
  );
};

export default VideoContainer;
