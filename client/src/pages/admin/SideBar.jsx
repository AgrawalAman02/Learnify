import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex gap-8">
      <div className="hidden lg:block  w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 p-5 sticky top-0  h-screen    ">
        <div className="space-y-6">
          <Link to="dashboard" className="flex gap-2 items-center ">
            <ChartNoAxesColumn size={22} />
            <h1>DashBoard</h1>
          </Link>

          <Link to="/admin/course" className="flex gap-2 items-center ">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <Outlet/>
      </div>
    </div>
  );
};

export default SideBar;
