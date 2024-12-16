import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import SignInOut from './pages/SignInOut'
import MainLayout from './Layout/MainLayout'
import HomePage from './pages/student/HomePage'
import { RouterProvider } from 'react-router'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children :[
      {
        path: "/",
        element : <HomePage/>,
      },
      {
        path : "/auth",
        element : <SignInOut/>
      }
    ]
  }
])


function App() {
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default App
