import { GraduationCap, Moon } from "lucide-react";
import React from "react";
import NavBarDropDown from "./NavBarDropDown";
import ThemeChanger from "./ThemeChanger";
import { Button } from "./ui/button";

const NavBar = () => {
  const isLoggedIn = true;

  return (
    <div className="h-16 fixed top-0 right-0 left-0 z-20 border bg-white dark:bg-slate-950 border-b-gray-200 dark:border-b-gray-800 flex items-center justify-between  px-2 md:px-28">
      <div className="flex items-center gap-2 ">
        <GraduationCap size={35} />
        <span className="hidden md:block text-2xl font-semibold font-serif">
          uDummy
        </span>
      </div>

      <div className=" flex items-center gap-6">
        <ThemeChanger />
        {isLoggedIn ? (
          <NavBarDropDown />
        ) : (
          <>
            <Button variant={"secondary"}>Sign In</Button>
            <Button variant={"secondary"}>Sign Up</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
