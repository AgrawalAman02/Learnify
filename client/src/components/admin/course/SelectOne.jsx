import React, { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";

const SelectOne = ({onSelectChange,defaultValue = "" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const [other, setOther] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(
    defaultValue && !predefinedCategories.includes(defaultValue)
  );


   // List of predefined categories
   const predefinedCategories = [
    "html", "data-Science", "javascript", "python", 
    "frontend-Developement", "backend-Developement", 
    "full-Stack-Developement", "react", "css", "tailwind", 
    "express", "mern-Stack", "nextJS", "docker", 
    "java-Spring", "mongoDb", "aiml"
  ];

  
  const handleValueChange = (value)=>{
    setSelectedValue(value)
    if(value ==="others"){
      setShowOtherInput(true);
    }else{
      setShowOtherInput(false);
      if (onSelectChange) {
        onSelectChange(value);
      }
    }
  }
  
  const handleOtherChange =(e)=>{
    const value = e.target.value;
    setOther(value);
    if (onSelectChange) {
      onSelectChange(value);
    }
  }


  return (
    <div>
      <Select value={selectedValue}  onValueChange={handleValueChange} >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="data-Science">Data Science</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="frontend-Developement">Frontend Developement</SelectItem>
            <SelectItem value="backend-Developement">Backend Developement</SelectItem>
            <SelectItem value="full-Stack-Developement">Full Stack Developement</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="tailwind">Tailwind-CSS</SelectItem>
            <SelectItem value="express">ExpressJs</SelectItem>
            <SelectItem value="mern-Stack">MERN Stack</SelectItem>
            <SelectItem value="nextJS">NextJS</SelectItem>
            <SelectItem value="docker">Docker</SelectItem>
            <SelectItem value="java-Spring">Java Spring</SelectItem>
            <SelectItem value="mongoDb">Mongo DB</SelectItem>
            <SelectItem value="aiml">AIML</SelectItem>
            <SelectItem value="others" >Others (specify) </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {
        showOtherInput && (
          <Input 
            type="text"
            placeholder="Specify category"
            className="mt-2"
            onChange={handleOtherChange}
            value={other}
            autoFocus
          />
        )
      }
    </div>
  );
};

export default SelectOne;
