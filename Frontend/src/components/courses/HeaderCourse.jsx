import React from "react";
import { FaStar, FaGraduationCap, FaInfoCircle } from "react-icons/fa";
import { course } from "../../../public/data/data";
function HeaderCourse() {
  return (
    <div className="py-8 pb-0 mb-0 text-white bg-gradient-to-r from-secondary to-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center bg-white/25 text-white rounded-full px-3 py-1 w-fit mb-4">
          {course.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-lg mb-6 max-w-3xl">{course.description}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <FaStar className="mr-1" />
            <span>4.5/5.0</span>
          </div>
          <div className="flex items-center">
            <FaGraduationCap className="mr-1" />
            <span>1234+ enrolled</span>
          </div>
          <div className="flex items-center">
            <FaInfoCircle className="mr-1" />
            <span>Last updated {course.date}</span>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <img
            src={course.doctor.image}
            alt="Instructor"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="text-white font-medium">{course.doctor.name}</h3>
            <p className="text-sm text-white/80">
              {course.doctor.specialization}
            </p>
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full block"
      >
        <path
          fill="#FFFFFF"
          fillOpacity="1"
          d="M0,256L48,240C96,224,192,192,288,154.7C384,117,480,75,576,96C672,117,768,203,864,197.3C960,192,1056,96,1152,69.3C1248,43,1344,85,1392,106.7L1440,128L1440,320L1440,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}

export default HeaderCourse;
