import React, { useEffect, useState } from "react";
import CoursesCard from "./CoursesCard";
import ShimmerCard from "./ShimmerCard";
import { useGetPublishedCourseQuery } from "@/apis/courseApi";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Paginations from "./Paginations";

const Courses = () => {
  const [courseQuery , setCourseQuery] = useState({
    page:1,
    limit:8,
  })
  const { data, isLoading, error, isError } = useGetPublishedCourseQuery(courseQuery);

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || "Error while fetching the course ");
  }, [isError, error]);

  const courses = data?.courses;

  const handlePage =(newPage)=>{
    setCourseQuery(prev=>({
      ...prev,
      page:newPage,
    }))
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Explore Our Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-xs md:text-base">
              Discover a wide range of courses taught by expert instructors
            </p>
          </motion.div>
        </motion.div>


        <div>
          {!isLoading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {courses?.length > 0 ? (
                courses.map((course, index) => (
                  <motion.div 
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CoursesCard course={course} />
                  </motion.div>
                ))  
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No courses available at the moment
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <ShimmerCard />
          )}
          <Paginations data={data?.pagination} handlePage={handlePage} from="home"/>
        </div>
      </div>
    </div>
  );
};

export default Courses;