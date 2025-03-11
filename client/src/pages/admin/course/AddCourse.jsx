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
  const [formErrors, setFormErrors] = useState({});
  const [addCourse, { data, isError, isLoading, isSuccess, error }] = useAddCourseMutation();

  const validateForm = () => {
    const errors = {};
    if (!courseTitle.trim()) errors.courseTitle = "Course title is required";
    if (!category.trim()) errors.category = "Category is required";
    if (!price.trim()) errors.price = "Price is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createCourseBtnHandler = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      await addCourse({ courseTitle, category, price });
      // Navigation will happen in useEffect after success
    } catch (err) {
      console.error("Failed to add course:", err);
    }
  };

  const handleSelectChange = (value) => {
    setCategory(value);
    if (formErrors.category) {
      setFormErrors(prev => ({ ...prev, category: "" }));
    }
  };
  console.log(data);
  

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message || "Failed to add course"}`);
      console.log(error);
    } else if (isSuccess) {
      toast.success("Course Added successfully!");
      setCategory("");
      setPrice("");
      setCourseTitle("");
      navigate(`/admin/course/${data?.id}`);
    }
  }, [isLoading, isSuccess, isError, error, navigate]);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 flex flex-col items-start">
        <h1 className="text-2xl font-bold">Add a New Course</h1>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          Create your new course by providing the details below
        </p>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <Label htmlFor="CourseName" className="text-sm font-medium">
          Course Title <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="CourseName"
          placeholder="Enter the course title"
          value={courseTitle}
          onChange={(e) => {
            setCourseTitle(e.target.value);
            if (formErrors.courseTitle) {
              setFormErrors(prev => ({ ...prev, courseTitle: "" }));
            }
          }}
          className={formErrors.courseTitle ? "border-red-500" : ""}
        />
        {formErrors.courseTitle && (
          <p className="text-red-500 text-xs">{formErrors.courseTitle}</p>
        )}
      </div>

      <div className="p-2 flex flex-col gap-2">
        <Label htmlFor="CoursePrice" className="text-sm font-medium">
          Price <span className="text-red-500">*</span>
        </Label>
        <Input
          type="number"
          id="CoursePrice"
          placeholder="Enter the course price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            if (formErrors.price) {
              setFormErrors(prev => ({ ...prev, price: "" }));
            }
          }}
          className={`max-w-xs ${formErrors.price ? "border-red-500" : ""}`}
        />
        {formErrors.price && (
          <p className="text-red-500 text-xs">{formErrors.price}</p>
        )}
      </div>

      <div className="p-2 flex flex-col gap-2">
        <SelectOne onSelectChange={handleSelectChange} />
        {formErrors.category && (
          <p className="text-red-500 text-xs">{formErrors.category}</p>
        )}
      </div>

      <div className="flex gap-4 p-2 mt-4">
        <Button variant="outline" onClick={() => navigate("/admin/course")}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={createCourseBtnHandler}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please Wait...
            </>
          ) : (
            "Create Course"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;