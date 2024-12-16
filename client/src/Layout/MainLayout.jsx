import NavBar from '@/components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <NavBar/>
        <div className='mt-16'>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout