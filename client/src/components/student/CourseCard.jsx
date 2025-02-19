import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const CourseCard = ({ course }) => {
  const { currency, calculateAverageRating } = useContext(AppContext);
  return (
    <Link
      to={`/course/${course._id}`}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
      onClick={() => scrollTo(0, 0)}
    >
      <img src={course.courseThumbnail} alt="" className="w-full" />
      <div className="px-4 py-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">PallabIt</p>
        <div className="flex items-center space-x-2">
          <p>{calculateAverageRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateAverageRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-500">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
