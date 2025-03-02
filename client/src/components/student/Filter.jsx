import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Filter = ({ handleFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    difficultyLevel: [],
    // rating : 0,
    duration: [0, 20],
  });

  const categories = [
    { id: "data-Science", label: "Data Science" },
    { id: "docker", label: "Docker" },
    { id: "python", label: "Python" },
    { id: "nextJS", label: "NextJS" },
    { id: "javascript", label: "JavaScript" },
    { id: "mern-Stack", label: "MERN Stack" },
    { id: "full-Stack-Developement", label: "Full Stack Developement" },
    { id: "backend-Developement", label: "Backend Developement" },
    { id: "frontend-Developement", label: "Frontend Developement" },
    { id: "mongoDb", label: "Mongo DB" },
    { id: "html", label: "HTML" },
    { id: "css", label: "CSS" },
    { id: "tailwind", label: "Tailwind-CSS" },
    { id: "expressjs", label: "ExpressJs" },
    { id: "react", label: "React" },
    { id: "aiml", label: "AIML" },
  ];

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleCheckbox = (checked, categoryId) => {
    if (checked) {
      setSelectedFilters({
        ...selectedFilters,
        categories: [...selectedFilters.categories, categoryId],
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        categories: selectedFilters.categories.filter((c) => c !== categoryId),
      });
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-dashed hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
            {(selectedFilters?.categories?.length +
              selectedFilters?.difficultyLevel?.length >
              0 ||
              selectedFilters?.duration[0] > 0 ||
              selectedFilters?.duration[1] < 20) && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {selectedFilters?.categories?.length +
                  selectedFilters?.difficultyLevel?.length +
                  (selectedFilters?.duration[0] > 0 ||
                  selectedFilters?.duration[1] < 20
                    ? 1
                    : 0)}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">
              Filter Courses
            </SheetTitle>
            <SheetDescription>
              Narrow down your search results with these filters
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-8">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <div
                    className="flex items-center space-x-2"
                    key={category.id || index}
                  >
                    <Checkbox
                      id={category.id || index}
                      onCheckedChange={(checked) => {
                        handleCheckbox(checked, category.id);
                      }}
                    />
                    <Label htmlFor={category.id || index}>
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Difficulty Level</h3>
              <div className="flex flex-wrap gap-3">
                {difficultyLevels.map((difficultyLevel) => (
                  <Button
                    key={difficultyLevel}
                    variant={
                      selectedFilters.difficultyLevel.includes(difficultyLevel)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      if (
                        selectedFilters.difficultyLevel.includes(
                          difficultyLevel
                        )
                      ) {
                        setSelectedFilters({
                          ...selectedFilters,
                          difficultyLevel:
                            selectedFilters.difficultyLevel.filter(
                              (l) => l !== difficultyLevel
                            ),
                        });
                      } else {
                        setSelectedFilters({
                          ...selectedFilters,
                          difficultyLevel: [
                            ...selectedFilters.difficultyLevel,
                            difficultyLevel,
                          ],
                        });
                      }
                    }}
                  >
                    {difficultyLevel}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Duration */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-base font-medium">Course Duration</h3>
                <span className="text-sm font-medium">
                  {selectedFilters.duration[0]}-
                  {selectedFilters.duration[1] || 20} hours
                </span>
              </div>
              <Slider
                defaultValue={[0, 20]}
                min={0}
                max={50}
                step={1}
                onValueChange={(value) => {
                  setSelectedFilters({ ...selectedFilters, duration: value });
                }}
              />
            </div>
          </div>

          <SheetFooter className="flex flex-col sm:flex-row gap-3 pt-2 border-t">
            <Button
              variant="outline"
              onClick={() =>
                setSelectedFilters({
                  categories: [],
                  difficultyLevel: [],
                  // rating: 0,
                  duration: [0, 20],
                })
              }
            >
              Reset All
            </Button>
            <SheetClose asChild>
              <Button onClick={() => handleFilter(selectedFilters)}>
                Apply Filters
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Filter;
