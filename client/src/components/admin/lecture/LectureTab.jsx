import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const LectureTab = () => {
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
              Title<span className="text-red-700 align-top">*</span>
            </Label>
            <Input
              type="text"
              id="title"
              placeHolder="Enter the lecture title"
            />
          </div>

          <div className="w-fit ">
            <Label htmlFor="video">
              Upload Video<span className="text-red-700 align-top">*</span>
            </Label>
            <Input type="file" accept="video/*" id="video" className="w-fit" />
          </div>

          <div className="w-fit">
            <div className="flex items-center space-x-2">
              <Switch id="switch" />
              <Label htmlFor="switch">Is this video FREE</Label>
            </div>
          </div>

          <div>
            <Button variant="secondary">
              Update Lecture
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureTab;
