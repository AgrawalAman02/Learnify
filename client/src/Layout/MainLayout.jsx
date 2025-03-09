import NavBar from '@/components/NavBar'
import ScrollToTop from '@/components/ScrollToTop'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='font-questrial'>
        <ScrollToTop/>
        <NavBar/>
        <div className='mt-16'>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout