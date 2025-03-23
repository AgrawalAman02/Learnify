import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignInOut from "./pages/SignInOut";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/student/HomePage";
import MyLearning from "./pages/student/MyLearning";
import EditProfile from "./pages/student/EditProfile";
import SideBar from "./pages/admin/SideBar";
import CourseTable from "./pages/admin/course/CourseTable";
import DashBoard from "./pages/admin/DashBoard";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetails from "./pages/student/CourseDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import VideoPlayer from "./pages/student/VideoPlayer";
import Search from "./pages/student/Search";
import { AdminUser, AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectPurchasedPage } from "./components/ProtectPurchasedPage";
import ResetPassword from "./pages/ResetPassword";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path : "/search",
        element : <Search/>
      },
      {
        path : "/courseDetails/:courseId",
        element : <ProtectedRoute><CourseDetails/></ProtectedRoute>
      },
      {
        path: "/auth",
        element: <AuthenticatedUser><SignInOut /></AuthenticatedUser>,
      },
      {
        path: "/resetPassword/:token",
        element: <AuthenticatedUser><ResetPassword /></AuthenticatedUser>,
      },
      {
        path: "/learning",
        element: <ProtectedRoute><MyLearning /></ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
      },
      {
        path : "/courseDetails/:courseId/success/video",
        element : <ProtectedRoute><ProtectPurchasedPage><VideoPlayer/></ProtectPurchasedPage> </ProtectedRoute>
      },
      {
        path: "/admin",
        element: <AdminUser><SideBar /></AdminUser>,
        children: [
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "dashboard",
            element: <DashBoard />,
          },
          {
            path : "course/create",
            element : <AddCourse/>
          },
          {
            path : `course/:courseId`,
            element : <EditCourse/>
          },
          {
            path : `course/:courseId/lecture`,
            element : <CreateLecture/>
          },
          {
            path : "course/:courseId/lecture/:lectureId",
            element : <EditLecture/>
          }
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
