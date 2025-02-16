import { BadgeInfo } from 'lucide-react'
import React from 'react'

const CourseIntroSection = ({course}) => {
  return (
    <div className='bg-[#2D2F31]  w-screen text-white '>
        <div className='max-w-[75rem] mx-auto py-8 px-8 md:px-8 lg:px-0 flex flex-col gap-2'>
            <h1 className='font-bold text-xl md:text-3xl'>{course?.courseTitle}</h1>
            <p className='font-medium text-base md:text-lg '>{course?.courseSubTitle || "No Subtitle Present.Title is sufficient for this course..."} </p>
            <p>Created by : <span className='text-[#c0c4fc] underline italic'>{course?.creator?.name}</span></p>
            <p className='flex items-center gap-1 text-sm '><BadgeInfo size={16}/> <span> Last Updated at  <span className='italic'>{new Date(course?.updatedAt).toLocaleDateString()}</span> </span></p>
            <p>Students enrolled : {course?.enrolledStudents.length>0 ? course?.enrolledStudents.length : "Be the first one to explore this course and share experience with others..."}</p>
        </div>
    </div>
  )
}

export default CourseIntroSection