import { BadgeInfo } from 'lucide-react'
import React from 'react'

const CourseIntroSection = () => {
  return (
    <div className='bg-[#2D2F31]  w-screen text-white '>
        <div className='max-w-[75rem] mx-auto py-8 px-8 md:px-8 lg:px-0 flex flex-col gap-2'>
            <h1 className='font-bold text-xl md:text-3xl'>Course title</h1>
            <p className='font-medium text-base md:text-lg '>Course Subtitle</p>
            <p>Created by : <span className='text-[#c0c4fc] underline italic'> Padhaku Teacher</span></p>
            <p className='flex items-center gap-1 text-sm '><BadgeInfo size={16}/> <span> Last Updated at  <span className='italic'>2024:12:11</span> </span></p>
            <p>Students enrolled : </p>
        </div>
    </div>
  )
}

export default CourseIntroSection