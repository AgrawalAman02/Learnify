import { useLoginUserMutation, useRegisterUserMutation } from "@/apis/authApi";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { BookOpenCheck } from "lucide-react";

export function SignInOut() {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isRegisterSuccess && registerData) {
      toast.success(registerData?.message || "User sign-up successful!");
      navigate("/");
    } else if (registerError) {
      toast.error(registerError?.data?.message || "Sign Up Failed!");
    } else if (loginError) {
      toast.error(loginError?.data?.message || "Login In Falied!");
    } else if (isLoginSuccess && loginData) {
      toast.success(loginData?.message || "Login successful!");
      navigate("/");
    }
  }, [
    isLoginLoading,
    isRegisterLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  const changeInputHandler = (e, type) => {
    if(!e || !e.target ) return;
    const { name, value } = e.target;
    if (type === "signUp") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setSignInInput({ ...signInInput, [name]: value });
    }
  };

  const buttonHandler = async (type) => {
    const inputData = type === "signUp" ? signUpInput : signInInput;
    const action = type === "signUp" ? registerUser : loginUser;
    await action(inputData);
    setSignInInput({
      email: "",
      password: "",
    });
    setSignUpInput({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
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
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="signIn"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:bg-indigo-500"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signUp"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:bg-indigo-500"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-10" />

              <TabsContent value="signIn">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  {/* ...existing SignIn Card content... */}
                  <CardHeader>
                    <CardTitle>Sign In to Your Account</CardTitle>
                    <CardDescription>
                    Continue your learning journey and access your enrolled courses.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        onChange={(e) => changeInputHandler(e, "signIn")}
                        value={signInInput.email}
                        placeholder="you@example.com"
                        name="email"
                        className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        onChange={(e) => changeInputHandler(e, "signIn")}
                        value={signInInput.password}
                        name="password"
                        className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      disabled={isLoginLoading}
                      onClick={() => buttonHandler("signIn")}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      {isLoginLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="signUp">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  {/* ...existing SignUp Card content... */}
                  <CardHeader>
                    <CardTitle>Start Learning Today</CardTitle>
                    <CardDescription>
                    Join our community of learners and unlock access to premium courses.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={signUpInput.name}
                        onChange={(e) => changeInputHandler(e, "signUp")}
                        placeholder="Enter Your Name"
                        name="name"
                        className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={signUpInput.email}
                        onChange={(e) => changeInputHandler(e, "signUp")}
                        id="email"
                        placeholder="you@example.com"
                        name="email"
                        className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={signUpInput.password}
                        onChange={(e) => changeInputHandler(e, "signUp")}
                        name="password"
                        className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      disabled={isRegisterLoading}
                      onClick={() => buttonHandler("signUp")}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      {isRegisterLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        "Create Account"
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
  );
}

export default SignInOut;
