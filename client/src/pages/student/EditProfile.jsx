import { useGetUserQuery } from "@/apis/profileApi";
import CoursesCard from "@/components/student/CoursesCard";
import EditProfileDialog from "@/components/student/EditProfileDialog";
import ShimmerCard from "@/components/student/ShimmerCard";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const {data,isLoading,isError,refetch}  = useGetUserQuery();
  const loggedInUser= useSelector((store)=>store.auth.user);
  if (isLoading) {
    return <div className="flex justify-center mt-20 animate-spin mx-auto"> <Loader2/> </div> ;
  }

  if (isError) {
    return <p>Error fetching user data: {isError.message}</p>;
  }
  
  const {name,email,enrolledAt} = data;  
  
  // const email = "aman"
  const myCourses = enrolledAt;
  return (
    <div className="max-w-3xl lg:max-w-[55rem]  mx-auto px-4 md:px-0 my-20">
      <h2 className="font-bold text-3xl text-center underline underline-offset-8 decoration-double decoration-1">
        Profile
      </h2>

      <div className="my-10 flex flex-col md:flex-row gap-4 items-center md:items-start md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="cursor-pointer w-56 h-60  ">
            <AvatarImage
              src={loggedInUser?.photoUrl}
              className="w-52 h-60 p-0.5 border-4 rounded-lg"
            />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg">Profile Photo</h2>
        </div>
        <div className="border-2 flex flex-col  gap-4 px-8 md:px-5 py-8 h-60 rounded-lg w-[22rem] md:w-[35rem]">
          <div className="flex gap-2 ">
            <h3 className="font-medium text-gray-950 dark:text-gray-50 ">
              Name :
            </h3>
            <h4 className="text-gray-700 dark:text-gray-200 font-mono font-medium">
              {loggedInUser?.name}
              
            </h4>
          </div>
          <div className="flex gap-2 ">
            <h3 className="font-medium text-gray-950 dark:text-gray-50 ">
              Email :{" "}
            </h3>
            <h4 className="text-gray-700 dark:text-gray-200 font-mono font-medium">
              <a
                href={`mailto:${email}`}
                className="hover:underline underline-offset-2"
              >
                {loggedInUser?.email}
              </a>
            </h4>
          </div>
          <div className="flex gap-2 ">
            <h3 className=" font-medium text-gray-950 dark:text-gray-50 ">
              Role :{" "}
            </h3>
            <h4 className="text-gray-700 dark:text-gray-200 font-mono font-medium">
              {loggedInUser?.role}
            </h4>
          </div>

          <EditProfileDialog name = {name} refetch={refetch}/>
        </div>
      </div>

      <h2 className="font-semibold text-2xl  underline underline-offset-8  decoration-2 mb-7">
        Enrolled Courses...
      </h2>

      <div>
        {myCourses.length === 0 ? (
          <p className="font-mono font-semibold text-sm text-gray-600 dark:text-gray-400 underline underline-offset-4 max-w-3xl  mx-auto">
            You hadn't enrolled to any courses until now! Please enroll to some
            courses to enjoy the learning experience at our platform! {" "}
            <br /> Hehe! Then this page will not look empty...{" "}
          </p>
        ) : isLoading ? (
          <ShimmerCard />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {myCourses.map((course) => (
              <CoursesCard key={course._id} course={course} />
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
