import { GraduationCap, Moon } from 'lucide-react'
import React from 'react'
import NavBarDropDown from './NavBarDropDown'
import ThemeChanger from './ThemeChanger'

const NavBar = () => {
  return (
    <div className='h-16 fixed top-0 right-0 left-0 z-20 border bg-white dark:bg-[#0A0A0A] border-b-gray-200 dark:border-b-gray-800 flex items-center justify-between  px-2 md:px-28'>
        
        <div className='flex items-center gap-2 '>
            <GraduationCap size={35}/>
            <span className='hidden md:block text-2xl font-semibold font-serif'>uDummy</span>
        </div>
        <div className=' flex items-center gap-8'>
            <ThemeChanger/>
            <NavBarDropDown/>
            
        </div>
    </div>
  )
}

export default NavBar