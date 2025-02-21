import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowDownCircle } from "lucide-react";

const HeroSection = ({ onExplore }) => {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-800 dark:from-slate-900 dark:via-purple-950 dark:to-slate-950 overflow-hidden">
      {/* Enhanced animated background shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-white/5 dark:bg-white/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* New floating elements */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-300/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <div className="relative px-4 py-24 text-center flex flex-col items-center justify-center min-h-[90vh] backdrop-blur-sm">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Unlock Your Potential with
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 mt-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Premium Courses
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-gray-100 text-lg md:text-xl dark:text-gray-200 mb-12 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of learners from around the globe and transform your career with our expert-led courses
          </motion.p>

          <motion.form 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Input
              type="text"
              className="rounded-full bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl text-white placeholder:text-gray-300 max-w-md w-full focus-visible:ring-2 ring-white/50 px-6 py-7 border-0 shadow-lg"
              placeholder="What do you want to learn today?"
            />
            <Button className="rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-8 py-7 w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25">
              Search Courses
            </Button>
          </motion.form>

          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            onClick={onExplore}
            className="rounded-full bg-white dark:bg-slate-900 text-indigo-700 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
          >
            <span className="inline-flex items-center gap-2">
              Explore Courses
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDownCircle/>
              </motion.span>
            </span>
          </Button>
        </motion.div>

          {/* Enhanced Stats */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { number: "500+", label: "Courses" },
              { number: "50k+", label: "Students" },
              { number: "200+", label: "Instructors" },
              { number: "15+", label: "Categories" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-slate-900/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-white to-gray-100 dark:from-white dark:to-gray-300 text-transparent bg-clip-text"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-200 dark:text-gray-300 text-sm font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;