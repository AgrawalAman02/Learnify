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

const SelectOne = ({onSelectChange}) => {
  return (
    <div>
      <Select onValueChange={onSelectChange} >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="data-Science">Data Science</SelectItem>
            <SelectItem value="docker">Docker</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="nextJS">NextJS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="java-Spring">Java Spring</SelectItem>
            <SelectItem value="mern-Stack">MERN Stack</SelectItem>
            <SelectItem value="full-Stack-Developement">Full Stack Developement</SelectItem>
            <SelectItem value="backend-Developement">Backend Developement</SelectItem>
            <SelectItem value="frontend-Developement">Frontend Developement</SelectItem>
            <SelectItem value="mongoDb">Mongo DB</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOne;
