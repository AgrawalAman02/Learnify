import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const DashBoard = () => {
  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Card className="w-56 h-24 flex items-center border-gray-500">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
      </Card>

      <Card className =" flex items-center border-gray-500">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
      </Card>
    </div>
  ) 
}

export default DashBoard