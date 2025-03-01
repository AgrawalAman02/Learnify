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

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    level: [],
    rating: 0,
    duration: [0, 20],
  });
  
  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "Mathematics",
    "Language",
    "Photography"
  ];
  
  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 border-dashed">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter Courses</span>
            {Object.values(selectedFilters).flat().filter(Boolean).length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {Object.values(selectedFilters).flat().filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Filter Courses</SheetTitle>
            <SheetDescription>
              Narrow down your search results with these filters
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-8">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div className="flex items-center space-x-2" key={category}>
                    <Checkbox 
                      id={category} 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFilters({
                            ...selectedFilters,
                            categories: [...selectedFilters.categories, category]
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            categories: selectedFilters.categories.filter(c => c !== category)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Difficulty Level */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Difficulty Level</h3>
              <div className="flex flex-wrap gap-3">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedFilters.level.includes(level) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (selectedFilters.level.includes(level)) {
                        setSelectedFilters({
                          ...selectedFilters,
                          level: selectedFilters.level.filter(l => l !== level)
                        });
                      } else {
                        setSelectedFilters({
                          ...selectedFilters,
                          level: [...selectedFilters.level, level]
                        });
                      }
                    }}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Rating */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-base font-medium">Minimum Rating</h3>
                <span className="text-sm font-medium">{selectedFilters.rating}+ stars</span>
              </div>
              <Slider 
                defaultValue={[0]} 
                max={5} 
                step={0.5} 
                onValueChange={(value) => {
                  setSelectedFilters({...selectedFilters, rating: value[0]})
                }}
              />
            </div>
            
            {/* Course Duration */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-base font-medium">Course Duration</h3>
                <span className="text-sm font-medium">{selectedFilters.duration[0]}-{selectedFilters.duration[1]} hours</span>
              </div>
              <Slider 
                defaultValue={[0, 20]} 
                min={0}
                max={50}
                step={1}
                onValueChange={(value) => {
                  setSelectedFilters({...selectedFilters, duration: value})
                }}
              />
            </div>
          </div>

          <SheetFooter className="flex flex-col sm:flex-row gap-3 pt-2 border-t">
            <Button 
              variant="outline" 
              onClick={() => setSelectedFilters({
                categories: [],
                level: [],
                rating: 0,
                duration: [0, 20],
              })}
            >
              Reset All
            </Button>
            <SheetClose asChild>
              <Button>Apply Filters</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Filter;