import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import SignInOut from "./pages/SignInOut";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/student/HomePage";
import { RouterProvider } from "react-router";
import MyLearning from "./pages/student/MyLearning";
import EditProfile from "./pages/student/EditProfile";
import SideBar from "./pages/admin/SideBar";
import CourseTable from "./pages/admin/course/CourseTable";
import DashBoard from "./pages/admin/DashBoard";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <SignInOut />,
      },
      {
        path: "/learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <EditProfile />,
      },
      {
        path: "/admin",
        element: <SideBar />,
        children: [
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "dashboard",
            element: <DashBoard />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
