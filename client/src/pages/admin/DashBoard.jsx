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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashBoard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetCourseStatsQuery();

  useEffect(() => {
    if (isSuccess)
      toast.success(data?.message || "Stats fetched successfully...");
    if (isError)
      toast.error(
        error?.data?.message || error?.message || "Error while fetching stats"
      );
  }, [isSuccess]);

  const stats = data?.stats;
  const courseStats = data?.courseStats;

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="flex flex-col gap-10 p-4 ">
      <div className="cursor-pointer lg:hidden -mb-4 -mt-4">
        <Link to="/admin/course">
          <Button>Go to Course Page</Button>
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <Card className=" border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300  ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Sales
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats?.totalCourseSold || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Revenue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {"₹" + (stats?.totalRevenue || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Published
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats?.publishedCourse || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Total Enrollments
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats?.totalEnrollments || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Unique Enrollments
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats?.uniqueStudents || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {courseStats && (
        <Card className="  border-gray-500 shadow-gray-400 dark:shadow-gray-900 shadow-lg hover:shadow-xl transition-shadow   duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Course Prices
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width={"100%"} height={350}>
              <LineChart
                width={400}
                height={400}
                data={courseStats}
                margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
              >
                <XAxis
                  dataKey="title"
                  className="text-xs font-urbanist"
                  tick={{ fill: "#ccc" }}
                  axisLine={{ stroke: "#555" }}
                />
                <YAxis
                  yAxisId={0}
                  tick={{ fill: "#4BC0C0" }}
                  axisLine={{ stroke: "#555" }}
                  label={{
                    value: "Sales",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#4BC0C0" },
                  }}
                />
                <YAxis
                  yAxisId={1}
                  orientation="right"
                  tick={{ fill: "#FF9F40" }}
                  axisLine={{ stroke: "#555" }}
                  label={{
                    value: "Price (₹)",
                    angle: -90,
                    position: "insideRight",
                    style: { fill: "#FF9F40" },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 30, 50, 0.8)",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "15px" }} />
                <CartesianGrid
                  stroke="#333"
                  strokeDasharray="3 3"
                  opacity={0.3}
                />
                <Line
                  type="monotone"
                  dataKey="salesCount"
                  name="Total Sales"
                  stroke="#4BC0C0"
                  strokeWidth={2}
                  dot={{
                    stroke: "#4BC0C0",
                    strokeWidth: 2,
                    r: 3,
                    fill: "#4BC0C0",
                  }}
                  yAxisId={0}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  name="Course Price (₹)"
                  stroke="#FF9F40"
                  strokeWidth={2}
                  dot={{
                    stroke: "#FF9F40",
                    strokeWidth: 2,
                    r: 3,
                    fill: "#FF9F40",
                  }}
                  yAxisId={1}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashBoard;
