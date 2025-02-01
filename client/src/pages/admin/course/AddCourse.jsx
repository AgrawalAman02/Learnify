import { useAddCourseMutation } from "@/apis/courseApi";
import SelectOne from "@/components/admin/course/SelectOne";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [price, setPrice] = useState("");
  const [addCourse,{isError, isLoading, isSuccess, error}] = useAddCourseMutation();
  

  const createCourseBtnHandler = async () => {
    await addCourse({courseTitle, category,price});
    navigate("/admin/course");
  };

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  useEffect(()=>{
    if(isError){
      toast.error(`${error?.data?.message}`);
      console.log(error);
      setPrice("");
      setCourseTitle("");
    }
    else if(isSuccess){
      toast.success("Course Added successfully...");
      setCategory("");
      setPrice("");
      setCourseTitle("");
    }
    
  },[isLoading,isSuccess,isError])
  return (
    <div>
      <div className="p-4 flex flex-col items-start flex-1">
        <p className="text-2xl font-bold">Do You wanna add new course?</p>
        <p className="text-sm font-medium mt-2 mb-2">
          {" "}
          So you are at right page. Lets add new course. Please provide full
          description of the course{" "}
        </p>
      </div>

      <div className="p-2 flex flex-col gap-3 ml-4 flex-1">
        <Label htmlFor="CourseName">Title</Label>
        <Input
          type="text "
          id="CourseName"
          placeholder="Your Course Name "
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
      </div>

      <div className="p-2 flex flex-col gap-3 ml-4 flex-1 w-80">
        <Label htmlFor="CoursePrice">Price</Label>
        <Input
          type="text"
          id="CoursePrice"
          placeholder="Enter the amount for the course..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="p-2 flex flex-col gap-3 ml-4  mt-2 flex-1">
        <SelectOne onSelectChange={handleSelectChange} />
      </div>

      <div className="flex gap-4 p-2 ml-4 mt-2 flex-1">
        <Button variant="outline" onClick={() => navigate("/admin/course")}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={createCourseBtnHandler}>
          {" "}
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please Wait...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
