import { Loader } from 'lucide-react'
import React, { useMemo } from 'react'

const LoaderSpinner = () => {
  // Define message categories and their variations
  const loadingMessages = {
    insights: [
      "Brewing knowledge just for you...",
      "Gathering wisdom from the digital realm...",
      "Loading brain fuel...",
      "Preparing your learning adventure...",
      "Collecting bytes of wisdom...",
      "Initializing knowledge transfer..."
    ],
    funny: [
      "Teaching the bits and bytes to dance...",
      "Convincing AI to share its secrets...",
      "Turning coffee into knowledge...",
      "Debugging the learning matrix...",
      "Herding digital sheep...",
      "Asking ChatGPT for answers...",
      "Converting caffeine to code...",
      "Unleashing the power of CTRL+C CTRL+V..."
    ],
    motivational: [
      "Your next skill is loading...",
      "Excellence is worth the wait...",
      "Creating your success story...",
      "Preparing something awesome...",
      "Building your future, byte by byte...",
      "Every second brings new knowledge...",
      "Growth happens while waiting..."
    ],
    tech: [
      "Compiling knowledge modules...",
      "Optimizing neural pathways...",
      "Downloading experience points...",
      "Buffering brilliance...",
      "Loading progress: 42%..."
    ],
    hindi: [
      "Gyaan ki tayyari ho rahi hai...",
      "Vidya ka pitara khul raha hai...",
      "Samajhdari loading...",
      "Padhai ka safar shuru ho raha hai...",
      "Ruko zara, sabar karo..."
    ]
  }

  // Get random messages for both primary and secondary text
  const { primaryMessage, secondaryMessage } = useMemo(() => {
    const categories = Object.keys(loadingMessages)
    const randomCategory1 = categories[Math.floor(Math.random() * categories.length)]
    
    // Ensuring second category is different from the first
    let randomCategory2
    do {
      randomCategory2 = categories[Math.floor(Math.random() * categories.length)]
    } while (randomCategory2 === randomCategory1)
    
    const primaryMessage = loadingMessages[randomCategory1][
      Math.floor(Math.random() * loadingMessages[randomCategory1].length)
    ]
    const secondaryMessage = loadingMessages[randomCategory2][
      Math.floor(Math.random() * loadingMessages[randomCategory2].length)
    ]

    return { primaryMessage, secondaryMessage }
  }, []) // Empty dependency array means this runs once when component mounts

  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <Loader className="animate-spin h-16 w-16 text-blue-600 dark:text-blue-300" />
        <p className='mt-4 tet-lg md:text-2xl font-semibold font-urbanist text-gray-700 dark:text-gray-50'>
          {primaryMessage}
        </p>
        <p className='mt-1 text-sm md:text-base font-mono text-blue-600 dark:text-blue-200'>
          {secondaryMessage}
        </p>
      </div>
    </div>
  )
}

export default LoaderSpinner