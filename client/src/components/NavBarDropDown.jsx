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
import { motion } from "framer-motion";
import { BookOpen, Layout, LogOut, User } from "lucide-react"; // Added missing Lucide icons
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar className="cursor-pointer border-2 border-indigo-500/20 hover:border-indigo-500/50 transition-colors">
              <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                {user?.name?.split(" ").map(n => n[0]).join("") || "A"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 backdrop-blur-lg bg-white/90 dark:bg-slate-950/90">
          <DropdownMenuLabel className="font-outfit">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {role === "Instructor" && (
              <Link to="/admin/dashboard" >
                <DropdownMenuItem className="gap-2 text-blue-700 dark:text-blue-300">
                  <Layout size={16} />
                  <div>Dashboard</div>
                </DropdownMenuItem>
              </Link>
            )}
            <Link to="/learning">
              <DropdownMenuItem className="gap-2 text-blue-700 dark:text-blue-300">
                <BookOpen size={16} />
                My Learning
              </DropdownMenuItem>
            </Link>
            <Link to="/profile">
              <DropdownMenuItem className="gap-2 text-blue-700 dark:text-blue-300">
                <User size={16} />
                Edit Profile
            </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 text-red-500 dark:text-red-400" onClick={handleLogOut}>
            <LogOut size={16} />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBarDropDown;