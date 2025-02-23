import { useAuth, useUser } from "@clerk/clerk-react";
import humanizeDuration from "humanize-duration";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const curruncy = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState(true);
  const navigate = useNavigate();
  //backend token
  const { getToken } = useAuth();
  const { user } = useUser();

  //   Fetching all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  //   function to calculating average rating course
  const calculateAverageRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  //calculate course Chapter time
  const calculateCourseTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Funnction to calculate Currse Duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) => {
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration)
      );
    });

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate No of Lectures
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };
  //Fetch Student Enrolled Course
  const fetchUserEnrolledourse = async () => {
    setEnrolledCourses(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledourse();
  }, []);
  //generate Token
  const logToken = async () => {
    console.log(await getToken());
  };
  // user Role useEffect
  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user]);
  const value = {
    curruncy,
    allCourses,
    fetchAllCourses,
    navigate,
    calculateAverageRating,
    isEducator,
    setIsEducator,
    calculateCourseTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledourse,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
