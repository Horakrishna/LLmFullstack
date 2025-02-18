import React from "react";
import CallToAction from "../../components/student/CallToAction";
import Companies from "../../components/student/Companies";
import CourseSection from "../../components/student/CourseSection";
import Hero from "../../components/student/Hero";
import TestimonialSection from "../../components/student/TestimonialSection";
import Footer from "../../components/student/TestimonialSection";


const Home = () => {
  return (
    <div className=" flex flex-col items-center space-y- text-center">
      <Hero />
      <Companies />
      <CourseSection />
      <TestimonialSection />
      <CallToAction />
      <Footer/>
    </div>
  );
};

export default Home;
