import SelectOne from "@/components/admin/course/SelectOne";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="p-4 flex flex-col items-start flex-1">
        <p className="text-xl font-bold">Do You wanna add new course?</p>
        <p className="text-sm font-medium">
          {" "}
          So you are at right page. Lets add new course. Please provide full
          description of the course{" "}
        </p>
      </div>

      <div  className="p-2 flex flex-col gap-3 ml-4 flex-1">
        <Label htmlFor="CourseName">Title</Label>
        <Input type = "text " id="CourseName" placeholder="Your Course Name "/>
      </div>

      <div className="p-2 flex flex-col gap-3 ml-4 flex-1">
        <SelectOne/>
      </div>

      <div className="flex gap-4 p-2 ml-4 mt-2 flex-1">
        <Button variant="outline" onClick={()=>navigate("/admin/course")} >Cancel</Button>
        <Button> Create</Button>
      </div>
    </div>
  );
};

export default AddCourse;
