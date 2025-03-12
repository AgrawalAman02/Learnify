import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const getInitialState = ()=>{
    if(location.pathname.includes("/admin/course")){
      return "courses";
    }
    return "dashboard";
  }

  const [selected , setSelected] = useState(getInitialState);

  useEffect(()=>{
    if(location.pathname.includes("/admin/course")){
      setSelected("courses");
    }
    else setSelected("dashboard");
  },[location.pathname]);

  const handleSidebar = (val)=>{
    setSelected(val);
  }

  return (
    <div className="flex">
      <div className="hidden lg:block  w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 p-5 sticky top-0  h-screen">
        <div className="space-y-4">
          <Link to="dashboard" className={`flex gap-2 items-center  p-2 pl-4 ${selected=='dashboard' ? "bg-blue-300 dark:bg-blue-700 rounded-s-xl" : "hover:bg-blue-50 rounded-s-xl dark:hover:bg-[#4f4fdd2c]"}`}  onClick={()=>handleSidebar('dashboard')}>
            <ChartNoAxesColumn size={22} />
            <h1>DashBoard</h1>
          </Link>

          <Link to="/admin/course" className={`flex gap-2 items-center p-2 pl-4 ${selected=='courses' ? " bg-blue-300 dark:bg-blue-700 rounded-s-xl" : "hover:bg-blue-50 rounded-s-xl dark:hover:bg-[#4f4fdd2c]"}`} onClick={()=>handleSidebar('courses')}>
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="mt-8 w-[400px] md:w-[700px] lg:w-[1100px] mx-auto">
        <Outlet/>
      </div>
    </div>
  );
};

export default SideBar;
