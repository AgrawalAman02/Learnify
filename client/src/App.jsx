// import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import SignInOut from './pages/SignInOut'
import { ThemeProvider } from "@/components/themeProvider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col'>
      <NavBar/>
      <SignInOut/>
    </div>
    </ThemeProvider>
    
  )
}

export default App
