import React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const SelectOneCourseLevel = ({onSelectChange}) => {
  return (
      <div>
        <Select onValueChange={onSelectChange} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select course level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course Level</SelectLabel>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
}

export default SelectOneCourseLevel