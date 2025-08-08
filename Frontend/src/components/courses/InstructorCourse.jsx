import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { course } from "./OverviewCourse"; 
function InstructorCourse() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center">
          <img
            src={course.doctor.image}
            alt="Instructor"
            className="w-full rounded-lg max-h-80 object-cover"
          />
        </div>
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">{course.doctor.name}</h2>
            <p className="text-gray-500 text-lg mb-6">
              {course.doctor.specialization}
            </p>

            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="text-pink-600 mr-3" />
                <a
                  href={`tel:${course.doctor.phone}`}
                  className="hover:text-pink-600"
                >
                  {course.doctor.phone}
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-pink-600 mr-3" />
                <a
                  href={`mailto:${course.doctor.email}`}
                  className="hover:text-pink-600"
                >
                  {course.doctor.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorCourse;
