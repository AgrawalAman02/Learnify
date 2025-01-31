import CourseListTable from '@/components/admin/course/CourseListTable'
import { Button } from '@/components/ui/button'
import React from 'react'

const CourseTable = () => {
  return (
    <div className='flex flex-col gap-6 items-start'>
      <div>
        <Button>Add Your Own Course </Button>
      </div>

      <div className=' flex items-center justify-center'>
        <CourseListTable/>
      </div>
    </div>
  )
}

export default CourseTable