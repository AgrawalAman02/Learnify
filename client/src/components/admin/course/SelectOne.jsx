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

const SelectOne = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="data-Science">Data Science</SelectItem>
            <SelectItem value="docker">Docker</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="nextjs">NextJS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="spring">Java Spring</SelectItem>
            <SelectItem value="mern">MERN Stack</SelectItem>
            <SelectItem value="full-stack">Full Stack Developement</SelectItem>
            <SelectItem value="backend">Backend Developement</SelectItem>
            <SelectItem value="frontend">Frontend Developement</SelectItem>
            <SelectItem value="mongoDb">Mongo DB</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOne;
