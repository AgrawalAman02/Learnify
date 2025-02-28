import React from "react";

const VideoContainer = ({ initialLecture, currentLecture, course }) => {
  return (
    <div className="flex flex-col gap-6 w-full h-full overflow-y-auto scrollbar-hide">
      <div>
        <video
          src={currentLecture?.videoUrl || initialLecture?.videoUrl}
          controls
          className="w-full h-full max-w-7/8 md:rounded-lg rounded-sm "
        />
      </div>
      <div>
        <h2 className="text-2xl font-urbanist font-bold">
          {`Lecture ${
            course.lectures.findIndex(
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
