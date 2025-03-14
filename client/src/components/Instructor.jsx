import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSelector } from "react-redux";
import { BookOpen, CheckCircle2, GraduationCap, Sparkles } from "lucide-react";
import { useInstructorMutation } from "@/apis/profileApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Instructor = () => {
  const { user } = useSelector((store) => store.auth);
  const [instructor, { isLoading }] = useInstructorMutation();
  const navigate = useNavigate();

  const handleinstructor = async () => {
    try {
      await instructor().unwrap();
    toast.success("You're now an instructor!", {
      description: "Check your dashboard in the dropdown menu to start creating courses",
      duration: 5000,
      action: {
        label: "Open Dashboard",
        onClick: () => navigate("/admin/dashboard")
      },
    });
    // window.location.reload();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to become instructor");
    }
  };

  // Don't show the button if already an instructor
  if (user?.role === "Instructor") return null;

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium text-[11px] md:text-base px-3 md:px-6 py-1 md:py-5 rounded-full flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Become an Instructor
            </Button>
          </DrawerTrigger>
          
          <DrawerContent className="bg-gradient-to-b from-white to-indigo-50 dark:from-slate-900 dark:to-slate-950">
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="text-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex justify-center mb-4"
                >
                  <div className="relative">
                    <GraduationCap className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
                    <motion.div
                      className="absolute -inset-1 rounded-full blur"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                        background: [
                          "rgba(99, 102, 241, 0.4)",
                          "rgba(168, 85, 247, 0.4)",
                          "rgba(99, 102, 241, 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
                
                <DrawerTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text font-bold flex items-center justify-center">
                  Become an Instructor
                </DrawerTitle>
                
                <DrawerDescription className="mt-2 text-center max-w-md mx-auto">
                  Join our community of educators and share your knowledge with learners around the world.
                </DrawerDescription>
              </DrawerHeader>
              
              <div className="p-4">
                <div className="grid gap-5 mb-6">
                  {[
                    {
                      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
                      title: "Create engaging courses",
                      description: "Build your own curriculum with our easy-to-use platform"
                    },
                    {
                      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
                      title: "Earn revenue",
                      description: "Get paid for your expertise as students enroll in your courses"
                    },
                    {
                      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                      title: "Join a global community",
                      description: "Connect with educators and learners from around the world"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h3 className="font-medium text-indigo-800 dark:text-indigo-300">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <DrawerFooter>
                <Button 
                  onClick={handleinstructor}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white w-full"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span> 
                      Processing...
                    </>
                  ) : "Start Teaching Today"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="border-indigo-200 dark:border-indigo-900">
                    Maybe later
                  </Button>
                </DrawerClose>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  By becoming an instructor, you agree to our Terms of Service and Instructor Guidelines
                </p>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </div>
  );
};

export default Instructor;