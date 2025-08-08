import React, { useState } from "react";
import { FaBook, FaChartLine, FaClock, FaGraduationCap } from "react-icons/fa";

import { course } from "../../../public/data/data";

function EnrollCourse() {
  const [enrollError, setEnrollError] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = () => {
    setEnrolling(true);
    setEnrollError(null);
    setEnrollSuccess(false);

    setTimeout(() => {
      setEnrollSuccess(true);
      setEnrolling(false);
    }, 1500);
  };
  return (
    <div>
      {/* COURSE CARD */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <img src={course.image} alt="Course Thumbnail" className="w-full" />
        <div className="p-4">
          {enrollError && (
            <p className="text-red-500 text-sm mb-3">{enrollError}</p>
          )}
          {enrollSuccess && (
            <p className="text-green-500 text-sm mb-3">
              Successfully enrolled in course!
            </p>
          )}
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <FaGraduationCap className="mr-2" />
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* COURSE DETAILS */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">This course includes</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <FaBook className="text-pink-600 mr-3" />
              <span>Episodes</span>
            </div>
            <span className="text-gray-500">
              {course.episodes?.length || 0}
            </span>
          </li>
          <li className="border-t border-gray-100"></li>
          <li className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <FaClock className="text-pink-600 mr-3" />
              <span>Date</span>
            </div>
            <span className="text-gray-500">{course.date}</span>
          </li>
          <li className="border-t border-gray-100"></li>
          <li className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <FaChartLine className="text-pink-600 mr-3" />
              <span>Category</span>
            </div>
            <span className="text-gray-500">{course.category}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EnrollCourse;
