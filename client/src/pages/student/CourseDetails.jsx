import { useGetCoursePurchasedDetailsQuery } from "@/apis/courseApi";
import CourseIntroSection from "@/components/student/CourseIntroSection";
import PaymentButton from "@/components/student/PaymentButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { data } = useGetCoursePurchasedDetailsQuery(courseId);
  const course = data?.course;
  const loggedInUser = data?.user;
  const isPurchased = data?.isPurchased;
  const description =
    course?.description ||
    "<h3>No description available for this course.</h3> </hr> <p> So please help us to update our description based on your experience and comments.Please explore our course because the instructor had done a lots of hardword for your bright future. </hr> Have a nice Experience! </p>";
  return (
    <div>
      <CourseIntroSection course={course} />
      <div className="max-w-[75rem] mx-auto px-4 md:px-0 my-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-28 justify-between">
          <div className="w-full md:w-1/2 flex flex-col gap-4 p-2">
            <div>Description</div>
            <div dangerouslySetInnerHTML={{ __html: description }} />

            <div className="border rounded-lg flex flex-col gap-2 p-4 px-6 shadow-lg ">
              <h1 className="font-bold text-xl md:text-2xl">Course Content </h1>
              <h4 className="mb-3 -mt-1 text-sm md:text-base">
                {course?.lectures.length}{" "}
                {course?.lectures.length > 1 ? "lectures" : "lecture"}
              </h4>

              <div>
                {course?.lectures.map((lecture) => (
                  <div key={lecture._id}  className="flex gap-2 items-center mb-2 border p-2 rounded-xl">
                    {lecture?.isPreviewFree ? <PlayCircle size={16} /> : <Lock size={16}/>} <span>{lecture?.lectureTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full  md:w-1/3">
            <Card>
              <CardContent className="p-4 flex flex-col ">
                <div className="w-full aspect-video mb-4">Video Ayga</div>
                <h1>{course?.lectures[0].lectureTitle}</h1>
                <Separator className="my-2" />
                <h1>{course?.price}</h1>
              </CardContent>

              <CardFooter>
                <PaymentButton isPurchased = {isPurchased} loggedInUser = {loggedInUser} />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
