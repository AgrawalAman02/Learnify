import React, { useRef } from 'react';
import Courses from '@/components/student/Courses';
import HeroSection from '@/components/student/HeroSection';
import { motion } from 'framer-motion';
import Footer from '@/components/student/Footer';

const HomePage = () => {
  const coursesRef = useRef(null);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection onExplore={scrollToCourses} />
      <div ref={coursesRef}>
        <Courses />
      </div>
      <Footer/>
    </motion.div>
  );
};

export default HomePage;