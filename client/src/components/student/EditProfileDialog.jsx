import React, { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useUpdateUserMutation } from "@/apis/profileApi";
import { toast } from "sonner";

const EditProfileDialog = ({ name , refetch}) => {
  const [newName, setNewName] = useState(name);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [updateUser, { data, isLoading,isError,isSuccess,error }] = useUpdateUserMutation();

  const handleEditProfileButton = async () => {
    const formData = new FormData();
    formData.append("name", newName);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    await updateUser(formData);
  };

  useEffect(()=>{
    if(isSuccess){
      refetch();
      console.log(data);
      toast.success(data.message);
    }
    if(isError){
      toast.error(error.message || "Unable to update profile");
    }
  },[isError,isSuccess,error])

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-32 mt-4">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[390px] sm:max-w-[425px] md:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Profile Photo
              </Label>
              <Input
                type="file"
                accept="image/*"
                className="col-span-3"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProfilePhoto(file);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={() => handleEditProfileButton()}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </div>
              ) : (
                <div>Save changes</div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
