import { useGetCourseStatsQuery } from "@/apis/courseApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LoaderSpinner from "../LoaderSpinner";
import { toast } from "sonner";

const DashBoard = () => {

  const {data, isLoading , isSuccess, isError, error} = useGetCourseStatsQuery();
  
  useEffect(()=>{
    if(isSuccess) toast.success(data?.message || "Stats fetched successfully...");
    if(isError) toast.error(error?.data?.message || error?.message || "Error while fetching stats");
  },[isSuccess,isError, error])
  
  const stats = data?.stats;
  const courseStats =   data?.courseStats;
  
  if(isLoading) return <LoaderSpinner/>

  return (
    <div className="flex flex-col gap-10 p-4 ">
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <Card className=" border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300  ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Sales
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalCourseSold || 0}</p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Revenue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{"₹"+ stats?.totalRevenue || 0}</p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Published
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats?.publishedCourse || 0}</p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Enrollments
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalEnrollments || 0}</p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Unique Enrollments
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats?.uniqueStudents || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width={"100%"} height={250}>
            <LineChart
              width={400}
              height={400}
              data={courseStats}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="title" className="text-xs font-urbanist" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="enrolledCount" stroke="#ff7300" yAxisId={0} />
              <Line type="monotone" dataKey="salesCount" stroke="#387908" yAxisId={1} />
              <Line type="monotone" dataKey="price" stroke="#343249" yAxisId={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoard;
