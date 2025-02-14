import CourseIntroSection from "@/components/student/CourseIntroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlayCircle } from "lucide-react";
import React from "react";

const CourseDetails = () => {
  const isPurchased = true;
  return (
    <div>
      <CourseIntroSection />
      <div className="max-w-[75rem] mx-auto px-4 md:px-0 my-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-28 justify-between">
          <div className="w-full md:w-1/2 flex flex-col gap-4 p-2">
            <div>Description</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              officia beatae unde quo labore magnam, corrupti iure similique
              nihil blanditiis quia ea ipsum. Libero exercitationem iusto
              veritatis ad tempora sunt neque eum at corporis voluptas eos,
              consectetur optio unde. Pariatur corrupti aspernatur dolore optio
              ullam quidem, odio consequuntur animi aliquid quae, quia, natus
              beatae nesciunt, fugiat sint!
            </div>

            <div className="border rounded-lg flex flex-col gap-2 p-4 px-6 shadow-lg ">
              <h1 className="font-bold text-xl md:text-2xl">Course Content </h1>
              <h4 className="mb-3 -mt-1 text-sm md:text-base">n lectures</h4>

              <div className="flex gap-2 items-center">
                {" "}
                <PlayCircle size={16} /> <span>Introduction</span>{" "}
              </div>
            </div>
          </div>

          <div className="w-full  md:w-1/3">
            <Card>
              <CardContent className="p-4 flex flex-col ">
                <div className="w-full aspect-video mb-4">Video Ayga</div>
                <h1>Lecture Title</h1>
                <Separator className="my-2"/>
                <h1>Course Price</h1>
              </CardContent>

              <CardFooter>
                <Button>{isPurchased? "Continue Course" : "Purchase Course"}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
