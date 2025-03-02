import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import Filter from "@/components/student/Filter";
import Sort from "@/components/student/Sort";
import { Separator } from "@/components/ui/separator";
import SearchResult from "@/components/student/SearchResult";
import { useSearchCourseQuery } from "@/apis/courseApi";
import SearchSkeleton from "@/components/SearchSkeleton";
import Paginations from "@/components/student/Paginations";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState({
    query: "",
    categories: [],
    sortByPrice: "",
    difficultyLevel: [],
    page:1,
    limit:"",
  });

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useSearchCourseQuery(searchQuery);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSearchQuery((prev) => ({
      ...prev,
      query: searchInput || "",
      page:1,
    }));

    setSearchInput("");
  };

  const handleFilter = (filterData) => {
    setSearchQuery((prev) => ({
      ...prev,
      categories: filterData.categories,
      difficultyLevel: filterData.difficultyLevel,
      page:1,
    }));
  };

  const handleSort = (sortData) => {
    setSearchQuery((prev) => ({
      ...prev,
      sortByPrice: sortData,
      page :1,
    }));
  };

  const handlePage = (newPage)=>{
    setSearchQuery(prev=>({
      ...prev,
      page : newPage,
      limit : 5
    }))
  }

  if (data) console.log(data);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-1 h-[100vh]  ">
      <header>
        <motion.form
          className="flex flex-row items-center justify-center gap-3 mb-6 px-4 w-full max-w-7xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <Input
            type="text"
            className="rounded-full bg-slate-100/90 dark:bg-slate-900/50 backdrop-blur-xl text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-300 w-full focus-visible:ring-2 ring-indigo-500/50 text-xs sm:text-base px-4 py-5 sm:px-8 sm:py-6 border-0 shadow-lg"
            placeholder="What do you want to learn today?"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />

          <Button className="rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-xs sm:text-base px-4 py-5 sm:px-8 sm:py-6 min-w-[50px] sm:min-w-[120px] whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25 flex-shrink-0">
            <SearchIcon className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Search Courses</span>
          </Button>
        </motion.form>
      </header>

      <Separator />

      <div className="flex flex-col p-4 border my-4 rounded-2xl mb-2 bg-slate-100/90 dark:bg-slate-900/50 backdrop-blur-xl text-slate-900 dark:text-white">
        {/* Header section with result count and filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <span className="pl-2 md:pl-6 font-semibold font-lekton text-center md:text-left">
            {searchQuery.query !== "" ? (
              <>
                Showing search results for:{" "}
                <span className="italic underline">{searchQuery.query}</span>
              </>
            ) : (
              <>All published courses</>
            )}
            <div className="text-sm text-gray-600">
              Showing {(data?.pagination?.page - 1) * data?.pagination?.limit + 1} to {Math.min(data?.pagination?.page * data?.pagination?.limit, data?.pagination?.total)} of {data?.pagination?.total} results
            </div>
          </span>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 px-2 md:px-6 w-full md:w-auto">
            <Filter handleFilter={handleFilter} />
            <Sort handleSort={handleSort} />
          </div>
        </div>

        {/* Results section */}
        <div className="max-h-[55vh] overflow-y-auto scrollbar-hide px-2">
          {isLoading ? (
            <SearchSkeleton />
          ) : (
            <SearchResult courses={data?.courses || []} />
          )}
        </div>

        <Paginations data={data?.pagination} handlePage={handlePage}/>
      </div>

      
    </div>
  );
};

export default Search;
