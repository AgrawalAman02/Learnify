import React from "react";
import NavBarDropDown from "./NavBarDropDown";
import ThemeChanger from "./ThemeChanger";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Moon, Sparkles,BookOpenCheck  } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const isLoggedIn = useSelector((store) => store.auth.isAuthenticated);

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-20 fixed top-0 right-0 left-0 z-20 backdrop-blur-lg bg-white/70 dark:bg-slate-950/80 border-b border-b-gray-200/50 dark:border-b-gray-800/50 flex items-center justify-between px-4 md:px-28"
    >
      <Link to="/">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <BookOpenCheck size={38} className="text-indigo-600 dark:text-indigo-400" />
            <motion.div 
              className="absolute -inset-1 bg-indigo-500/20 rounded-lg blur"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text font-outfit">
              Learnify
            </span>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden md:block"
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>
          </div>
        </motion.div>
      </Link>

      <div className="flex items-center gap-6">
        <ThemeChanger />
        {isLoggedIn ? (
          <NavBarDropDown />
        ) : (
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <Link to="/auth">
              <Button className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full">
                Sign In
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NavBar;