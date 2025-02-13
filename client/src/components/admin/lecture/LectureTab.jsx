import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const LectureTab = () => {
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [title, setTitle] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const MEDIA_API = SERVER_URL+"upload";

  const fileInputHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgess(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-media`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          // console.log(res);
          setVideoInfo({
            videoUrl: res.data?.data?.secure_url || res.data?.data?.url,
            publicId: res?.data?.data?.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload failed");
      } finally {
        setMediaProgess(false);
      }
    }
  };

  const handleLectureEdit = () => {};

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between ">
          <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>
              Make changes and click save when done...
            </CardDescription>
          </div>
          <Button variant="destructive">Remove Lecture</Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 ">
          <div className="w-fit md:w-1/3">
            <Label htmlFor="title">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              value = {title}
              onChange={(e)=>setTitle(e.target.value)}
              placeHolder="Enter the lecture title"
            />
          </div>

          <div className="w-fit ">
            <Label htmlFor="video">
              Upload Video<span className="text-red-700 align-top">*</span>
            </Label>
            <Input
              type="file"
              accept="video/*"
              id="video"
              onChange={fileInputHandler}
              className="w-fit cursor-pointer"
            />
          </div>


          {
            mediaProgress && (
              <div className="mb-4 -mt-6 w-1/4 ">
                <Progress value={uploadProgress}/>
                <p>{uploadProgress-1}% uploaded</p>
              </div>
            )

          }
          <div className="w-fit">
            <div className="flex items-center space-x-2">
              <Switch
                id="switch"
                checked={isPreviewFree}
                onCheckedChange={setIsPreviewFree}
              />
              <Label htmlFor="switch" className="cursor-pointer ">
                Is this video FREE
              </Label>
            </div>
          </div>
          <div>
            <Button variant="secondary" onClick={handleLectureEdit} disabled={btnDisable}>
              Update Lecture
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureTab;
