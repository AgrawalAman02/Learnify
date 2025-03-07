import { useForgotPasswordMutation } from "@/apis/authApi";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "recharts";
import { toast } from "sonner";

const ForgotPassword = ({ setIsForget }) => {
  const [forgetPassword , {data,isLoading , isSuccess, isError, error}] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const buttonHandler =async()=>{
    await forgetPassword({email});
  }
  useEffect(()=>{
    if(isError) toast.error(error?.data?.message || error.message || "Error in sending link");
    if(isSuccess) toast.success(data?.message || "Pssword reset link sent successfully...");
  },[isSuccess, isError, error]);

  return (
    <div>
      <Tabs defaultValue="signIn" className="w-full">
        <TabsList className="grid w-full mb-6">
          <TabsTrigger
            value="signIn"
            className="w-full  rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:bg-indigo-500 py-1"
          >
            Forget Password
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
                    onClick={() => setIsForget(false)}
                  >
                    <ArrowLeft />
                  </Button>
                </div>
                <CardTitle>Reset your password</CardTitle>
                <CardDescription>
                  Just provide the email , we will send a reset link to your
                  email id..
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="you@example.com"
                    name="email"
                    className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                {
                  /* {
                    <div className="space-y-1">
                      <Label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        // onChange={(e) => changeInputHandler(e, "signIn")}
                        // value={signInInput.password}
                        name="password"
                        className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                          hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
                      />
                    </div>
                  } */
                }
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  disabled={isLoading}
                  onClick={() => buttonHandler()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Send Link
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ForgotPassword;
