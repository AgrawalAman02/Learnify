import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/apis/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/store/authSlice";

const NavBarDropDown = () => {
  const [logoutUser,{data,isSuccess , isError,error}] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.auth.user);
  const role = user?.role;
  
  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message);
      navigate("/");
    }
    if(isError){
      toast.error(error?.data?.message || "An error occurred");
      navigate("/auth")
    }
    
  },[isSuccess, isError, error])

  const handleLogOut = async ()=>{
    await logoutUser();
    dispatch(removeUser());
    navigate("/auth");
  }

 

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {role === "Instructor" && (
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            )}
            <DropdownMenuItem><Link to="/learning">My Learning</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/profile">Edit Profile</Link></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem><div className="cursor-pointer" onClick={handleLogOut}>Log Out</div></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBarDropDown;
