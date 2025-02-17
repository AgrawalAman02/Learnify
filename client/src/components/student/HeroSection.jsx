import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-tr from-blue-500 to-indigo-700 dark:from-slate-600 dark:to-slate-950 px-4 py-24 text-center  ">
      <div className="max-w-3xl mx-auto">
        <h1 className=" text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {" "}
          Find the best courses for you!
        </h1>
        <p className=" text-gray-200 text-xs md:text-base dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide ranges of courses{" "}
        </p>
        <form action="" className="flex items-center mb-6">
          <Input
            type="text"
            className="rounded-s-full bg-white dark:bg-gray-50 text-black max-w-xl focus-visible:ring-0 px-6 py-3 ml-4 md:ml-16 shadow-lg"
            placeholder="Ahh! You can even find your desired courses"
          />
          <Button className="text-white rounded-e-full focus-within:ring-0 bg-indigo-700 hover:bg-blue-600 dark:hover:bg-indigo-600 shadow-lg">Search</Button>
        </form>
        <Button className="text-indigo-700 rounded-full focus-within:ring-0 bg-white hover:bg-blue-100 dark:hover:bg-slate-200 shadow-lg">Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;
