import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaClock } from "react-icons/fa";
import { coursesData } from "../../../public/data/data.jsx";
import { useState } from "react";

function SingleCourse() {
  const [viewMode, setViewMode] = useState("grid");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;

  const filteredCourses = coursesData.filter(
    (course) => category === "" || course.category === category
  );
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );
  const handleCourseClick = (courseId) => {
    console.log(`Navigating to course with ID: ${courseId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };
  return (
    <div className="container mx-auto py-12 px-4">
      <div
        className={`grid ${
          viewMode === "list"
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        } gap-6`}
      >
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {course.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>

              <div className="flex items-center mb-3">
                {renderStars(course.rating)}
                <span className="text-gray-600 text-sm ml-2">
                  {course.rating}/5
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <FaClock className="text-red-500 mr-1" />
                  {course.date}
                </span>
                <span>{course.lessons} lessons</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
    </div>
  );
}

export default SingleCourse;
