import { GraduationCap, Moon } from "lucide-react";
import React from "react";
import NavBarDropDown from "./NavBarDropDown";
import ThemeChanger from "./ThemeChanger";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLoggedIn = useSelector((store)=>store.auth.isAuthenticated);

  return (
    <div className="h-16 fixed top-0 right-0 left-0 z-20 border bg-gray-50 dark:bg-slate-950 border-b-gray-200 dark:border-b-gray-800 flex items-center justify-between  px-2 md:px-28">
      <Link to="/">
        <div className="flex items-center gap-2 ">
          <GraduationCap size={35} />
          <span className="hidden md:block text-2xl font-semibold font-serif">
            uDummy
          </span>
        </div>
      </Link>

      <div className=" flex items-center gap-6">
        <ThemeChanger />
        {isLoggedIn ? (
          <NavBarDropDown />
        ) : (
          <>
            <Link to="/auth"><Button >Sign In</Button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
