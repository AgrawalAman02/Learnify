import CourseListTable from '@/components/admin/course/CourseListTable'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CourseTable = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-6 items-start'>
      <div className='flex justify-between w-full'>
        <Link to={`/admin/dashboard`}>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <ArrowLeft size={16} />
            </Button>
          </Link>
        <div><Button onClick={()=>navigate("create")} >Add Your Own Course </Button></div>
      </div>

      <div className=' flex items-center justify-center'>
        <CourseListTable/>
      </div>
    </div>
  )
}

export default CourseTable