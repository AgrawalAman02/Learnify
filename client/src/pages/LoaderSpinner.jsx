import { Loader } from 'lucide-react'
import React from 'react'

const LoaderSpinner = () => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            <Loader className= "animate-spin h-16 w-16 text-blue-600 dark:text-blue-300" />
            <p className='mt-4 text-lg font-semibold text-gray-700 dark:text-gray-50'>  Loading Insights...</p>
            <p className='mt-1 text-sm font-mono text-blue-600 dark:text-blue-200'>Samajhne ki tayyari karo</p>

        </div>

    </div>
  )
}

export default LoaderSpinner