import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import React from "react";

const EditProfile = () => {
  const email = "aman@gmail.com";
  const isLoading = false;
  return (
    <div className="max-w-3xl lg:max-w-[50rem]  mx-auto px-4 md:px-0 my-20">
      <h2 className="font-bold text-3xl text-center underline underline-offset-8 decoration-double decoration-1">
        Profile
      </h2>

      <div className="my-10 flex flex-col md:flex-row gap-4 items-center md:items-start md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="cursor-pointer w-56 h-60  ">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-52 h-60 p-0.5 border-4 rounded-lg"
            />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg">Profile Photo</h2>
        </div>
        <div className="border-2 flex flex-col  gap-4 px-8 md:px-5 py-8 h-60 rounded-lg w-[22rem] md:w-[35rem]">
          <div className="flex gap-2 ">
            <h3 className="font-medium text-gray-950 dark:text-gray-50 ">
              Name :{" "}
            </h3>
            <h4 className="text-gray-700 dark:text-gray-200 font-mono font-medium">
              {" "}
              AMAN AGRAWAL
            </h4>
          </div>
          <div className="flex gap-2 ">
            <h3 className="font-medium text-gray-950 dark:text-gray-50 ">
              Email :{" "}
            </h3>
            <h4 className="text-gray-700 dark:text-gray-200 font-mono font-medium">
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </h4>
          </div>
          <div className="flex gap-2 ">
            <h3 className=" font-medium text-gray-950 dark:text-gray-50 ">
              Role :{" "}
            </h3>
            <h4 className="text-gray-700 dark:text-gray-200 font-mono font-medium">
              INSTRUCTOR{" "}
            </h4>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-32 mt-4">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[390px] sm:max-w-[425px] md:max-w-[460px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Profile Photo
                  </Label>
                  <Input type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </div>
                  ) : (
                    <div>Save changes</div>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
