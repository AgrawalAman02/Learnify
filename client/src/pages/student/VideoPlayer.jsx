import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import VideoContainer from "@/components/student/VideoContainer";
import { CheckCircle2, PlayCircle, TicketCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VideoPlayer = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
        };

        checkScreenSize();
        // Add listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
 } ,[])


    const isCompleted = false;
  return (
    <div className="mt-20 p-4 h-[calc(100vh-80px)]">
      <ResizablePanelGroup
        direction={`${isMobile ? "vertical" : "horizontal"}`}
        className="h-full w-full rounded-lg border shadow-md"
      >
        {/* left side panel */}
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center p-6">
            <VideoContainer/>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* right side panel */}
        <ResizablePanel defaultSize={40}>
          <ResizablePanelGroup direction="vertical">

            {/* right top panel */}
            <ResizablePanel defaultSize={20}>
              <div className="flex h-full items-center justify-center my-auto p-6">
                <div className="flex justify-between mb-4 w-full max-h-full ">
                    <h1 className="text-3xl font-urbanist font-bold">Course Title</h1>
                    <Button>Mark as Complete</Button>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />

            {/* right bottom panel */}
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6  overflow-y-auto scrollbar-hide ">
              <div className="w-full h-full flex flex-col gap-2">
                {[1,2,3,4,5,6,7].map((index) => (
                  <div  
                    key={index}
                    className="flex gap-4 items-center mb-2 justify-between border p-2 rounded-xl pl-4 w-full min-h-16 hover:cursor-pointer transition-transform"
                  >
                    <div className="flex gap-4">
                    {isCompleted ? (
                        <CheckCircle2 size={24} className="text-green-700 dark:text-green-500 "/>
                    ) : (
                        <PlayCircle size={24} />
                    )}
                    <span>Introduction</span>
                    </div>
                    {isCompleted && <Badge variant={"outline"} className={"text-green-600 bg-[#94fb9495] dark:bg-[#00800033]"}>Completed</Badge> }
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
