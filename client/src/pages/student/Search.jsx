import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <motion.form
        className="flex flex-row items-center justify-center gap-3 mb-6 px-4 w-full max-w-7xl mx-auto mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          type="text"
          className="rounded-full bg-slate-100/90 dark:bg-slate-900/50 backdrop-blur-xl text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-300 w-full focus-visible:ring-2 ring-indigo-500/50 text-xs sm:text-base px-4 py-5 sm:px-8 sm:py-6 border-0 shadow-lg"
          placeholder="What do you want to learn today?"
        />

        <Button className="rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-xs sm:text-base px-4 py-5 sm:px-8 sm:py-6 min-w-[50px] sm:min-w-[120px] whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25 flex-shrink-0">
          <SearchIcon className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Search Courses</span>
        </Button>
      </motion.form>
    </div>
  );
};

export default Search;