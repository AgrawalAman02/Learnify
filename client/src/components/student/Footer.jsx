import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  BookOpenCheck,
  Heart,
  ExternalLink,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Custom X (formerly Twitter) icon since Lucide might not have it updated
const XIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16.99 3H20.298L13.821 10.297L21.573 21H15.587L10.876 14.671L5.412 21H2.103L9.043 13.175L1.598 3H7.702L11.96 8.756L16.99 3ZM16.412 19.13H18.233L6.83 4.792H4.881L16.412 19.13Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Logo and tagline section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="relative">
              <BookOpenCheck
                size={38}
                className="text-indigo-600 dark:text-indigo-400"
              />
              <motion.div
                className="absolute -inset-1 bg-indigo-500/20 rounded-lg blur"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Learnify
            </span>
          </motion.div>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md text-sm">
            Empowering education through technology, connecting instructors and
            learners worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              About Learnify
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              An intuitive platform for online education, making learning
              accessible to everyone. Create, share, and discover courses on a
              wide range of topics.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/AgrawalAman02/Learnify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <ExternalLink size={14} className="mr-1" /> View Project
                Repository
              </a>
            </div>
          </div>

          {/* Student Links - Simplified */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Student Resources
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <Link
                  to="/search"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Search Courses
                </Link>
              </p>
              <p>
                <Link
                  to="/auth"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Login/Register
                </Link>
              </p>
              <p>
                <Link
                  to="/profile"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Edit Profile
                </Link>
              </p>
              <p>
                <Link
                  to="/learning"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  My Learning
                </Link>
              </p>
            </div>
          </div>

          {/* Instructor Links - Simplified */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Instructor Resources
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <Link
                  to="/admin/course/create"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Create New Course
                </Link>
              </p>
              <p>
                <Link
                  to="/admin/course"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Course Management
                </Link>
              </p>
              <p>
                <Link
                  to="/admin/dashboard"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Analytics Dashboard
                </Link>
              </p>
              <p>
                <a
                  href="https://github.com/AgrawalAman02/Learnify/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Report Issues
                </a>
              </p>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Connect with Developer
            </h3>
            <div className="flex items-center gap-4 py-2">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/AgrawalAman02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors shadow-sm hover:shadow-md"
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com/in/aman-agrawal02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors shadow-sm hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com/algoaman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors shadow-sm hover:shadow-md"
                aria-label="X (Twitter)"
              >
                <XIcon size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:agrawal.aman0203@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors shadow-sm hover:shadow-md"
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Want to contribute to Learnify?
              </p>
              <a
                href="https://github.com/AgrawalAman02/Learnify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm rounded-full transition-all duration-300 hover:shadow-lg"
              >
                <Star size={16} fill="white" /> Star on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Join Community */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-bold mb-2">Start Learning Today</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Find the perfect course to advance your skills and career
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full text-sm transition-all duration-300 hover:shadow-lg"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm flex flex-wrap items-center justify-center gap-1 px-2">
            © {new Date().getFullYear()} Learnify. Made with{" "}
            <Heart
              size={14}
              className="text-indigo-600 dark:text-indigo-400 inline"
              fill="currentColor"
            />{" "}
            by{" "}
            <a
              href="https://github.com/AgrawalAman02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Aman Agrawal
            </a>
          </p>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap justify-center gap-x-2">
            <span>All rights reserved</span>
            <span className="hidden sm:inline">|</span>
            <Link to="/" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
