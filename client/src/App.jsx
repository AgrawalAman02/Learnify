// import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignInOut from './pages/SignInOut'
import AuthPage from './pages/auth'

function App() {

  return (
    <SignInOut/>
    // <div>
    //   <Routes>
    //     <Route path="/auth"  element={<AuthPage/>} />
    //     <Route path='/login' element={<SignInOut/>} />
    //   </Routes>
    // </div>

    // <div className='flex flex-col justify-center items-center'>
    //   <SignInOut/>
    // </div>
  )
}

export default App
