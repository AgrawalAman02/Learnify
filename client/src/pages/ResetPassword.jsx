import { useResetPasswordMutation } from "@/apis/authApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { BookOpenCheck } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, data, error, isError, isSuccess }] =
    useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const buttonHandler = async () => {
    if (!password || password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }
    if(password !== cnfPassword){
      toast.error("Password didn't matched..");
      return;
    }
    await resetPassword({
      token,
      password,
      cnfPassword,
    });
  };
  useEffect(() => {
    if (isError)
      toast.error(
        error?.data?.message || error.message || "Error in sending link"
      );
    if (isSuccess){
      toast.success(data?.message || "Password changed successfully! Redirecting to home page...");
      navigate("/");
    }
  }, [isSuccess, isError, error]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50 dark:from-slate-950 dark:to-slate-900 p-4 -mt-8"
      >
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />

        <div className="w-full max-w-md">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BookOpenCheck
              size={48}
              className="mx-auto mb-4 text-indigo-600 dark:text-indigo-400"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Welcome to Learnify
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Your gateway to endless learning possibilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Tabs defaultValue="signIn" className="w-full">
              <TabsList className="grid w-full mb-6">
                <TabsTrigger
                  value="signIn"
                  className="w-full  rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:bg-indigo-500 py-1"
                >
                  Reset Password
                </TabsTrigger>
              </TabsList>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-10" />

                <TabsContent value="signIn">
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    {/* ...existing SignIn Card content... */}
                    <CardHeader>
                      <div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full bg-gray-100 dark:bg-gray-800 mb-4"
                          onClick={() => navigate("/auth")}
                        >
                          <ArrowLeft />
                        </Button>
                      </div>
                      <CardTitle>Reset your password</CardTitle>
                      <CardDescription>
                        Create your new password so that you can continue your
                        learning experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          New Password
                        </Label>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Enter your new Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          name="password"
                          className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                          hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label
                          htmlFor="cnfPassword"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Confirm Password
                        </Label>
                        <Input
                          type="password"
                          id="cnfPassword"
                          placeholder="Please reEnter your new password"
                          onChange={(e) => setCnfPassword(e.target.value)}
                          value={cnfPassword}
                          name="cnfPassword"
                          className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                          hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        disabled={isLoading}
                        onClick={() => buttonHandler()}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-8 h-8 animate-spin" />{" "}
                            <span>Updating...</span>
                          </>
                        ) : (
                          <span>Update Changes</span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
