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
import React, { useState } from "react";

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

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signUp") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setSignInInput({ ...signInInput, [name]: value });
    }
  };

  const buttonHandler  = (type)=>{
    const inputData = type==="signUp" ? signUpInput : signInInput;
    setSignInInput({
      email: "",
      password: "",
    });
    setSignUpInput({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="flex items-center justify-center mt-32">
      <Tabs defaultValue="signIn" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signUp">SignUp</TabsTrigger>
          <TabsTrigger value="signIn">SignIn</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Enter your details to create a new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={signUpInput.name}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  placeholder="Enter Your Name"
                  name="name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={signUpInput.email}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  id="email"
                  placeholder="abc@xyz.pqr"
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="........"
                  value={signUpInput.password}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>buttonHandler()}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signIn">
          <Card>
            <CardHeader>
              <CardTitle>Sign-In</CardTitle>
              <CardDescription>
                Bro, Kindly sign-in to track the courses where you had left...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => changeInputHandler(e, "signIn")}
                  value={signInInput.email}
                  placeholder="abc@xyz.pqr"
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => changeInputHandler(e, "signIn")}
                  value={signInInput.password}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>buttonHandler()}>Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SignInOut;