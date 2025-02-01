import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import SelectOne from "./SelectOne";
import SelectOneCourseLevel from "./SelectOneCourseLevel";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
  const navigate = useNavigate();
  const [previewThumbnail , setPreviewThumbnail] = useState("");
  const [input, setInput] = useState({
    courseTitle: "",
    courseSubtitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const handleSelectChange = (value) => {
    setInput({ ...input, category: value });
  };
  const handleFile = (e)=>{
    const file = e.target.files?.[0];
    if(file) {
        setInput({...input,thumbnail:file});
        const fileReader = new FileReader();
        fileReader.onloadend=()=>setPreviewThumbnail(fileReader.result);
        fileReader.readAsDataURL(file);
    }
  }

  const handleSaveBtn = ()=>{
    console.log(input);
  }

  const isPublished = true;
  const isLoading = false;
  return (
    <div>
      <Card className="flex flex-col p-4 gap-6">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Basic Course Information </CardTitle>
            <CardDescription>
              Make Changes to your courses here. Click save when you're done
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button>Remove Course</Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label htmlFor="courseTitle">Title</Label>
              <Input
                type="text"
                id="courseTitle"
                name="courseTitle"
                placeholder="Enter the course title"
                value={input.courseTitle}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="courseSubtitle">Subtitle</Label>
              <Input
                type="text"
                id="courseSubtitle"
                name="courseSubtitle"
                placeholder="Enter the appropriate subtitle"
                value={input.courseSubtitle}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <RichTextEditor
                id="description"
                name="description"
                input={input}
                setInput={setInput}
              />
            </div>

            <div className="flex items-center gap-5 pt-2">
              <div>
                <Label htmlFor="category">Category</Label>
              </div>
              <div>
                <SelectOne
                  id="category"
                  name="category"
                  onSelectChange={handleSelectChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <div>
                <Label htmlFor="level">Level</Label>
              </div>
              <div id="level">
                <SelectOneCourseLevel
                  name="level"
                  onSelectChange={(value) =>
                    setInput({ ...input, level: value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <div>
                <Label htmlFor="price">Price</Label>
              </div>
              <div>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Leave Empty if free "
                  value={input.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div>
                <Label htmlFor={"thumbnail"}>Thumbnail</Label>
              </div>
              <div>
                <Input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  className="w-fit mt-1"
                  accept="image/*"
                  onChange={handleFile}
                />
                {
                    previewThumbnail && (
                        <img src={previewThumbnail} alt="thumbnailPreview" className="max-w-60 max-h-44 aspect-auto" />
                    )
                }
              </div>
              <div className="flex gap-4 mt-2 ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate("/admin/course");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={isLoading}
                  onClick={handleSaveBtn}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className=" h-2 w-2 animate-spin" />
                      <p>Please wait</p>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
