import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

function Sidebar() {
  const courseData = {
    _id: "course123",
    title: "Advanced React Development",
    sections: [
      {
        _id: "section1",
        title: "Getting Started",
        lessons: [
          {
            _id: "lesson1",
            title: "Introduction to React",
            videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            isCompleted: false,
          },
          {
            _id: "lesson2",
            title: "Setting Up Environment",
            videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            isCompleted: false,
          },
        ],
      },
      {
        _id: "section2",
        title: "Core Concepts",
        lessons: [
          {
            _id: "lesson3",
            title: "Components and Props",
            videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            isCompleted: false,
          },
          {
            _id: "lesson4",
            title: "State and Lifecycle",
            videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            isCompleted: false,
          },
        ],
      },
    ],
    reviews: [],
  };

  const [expandedSections, setExpandedSections] = useState([
    courseData.sections[0]._id,
  ]);

  const [currentLecture, setCurrentLecture] = useState(
    courseData.sections[0].lessons[0]
  );

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigateToLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const calculateCompletion = () => {
    const totalLessons = courseData.sections.reduce(
      (sum, section) => sum + section.lessons.length,
      0
    );
    const completedLessons = courseData.sections.reduce(
      (sum, section) =>
        sum + section.lessons.filter((l) => l.isCompleted).length,
      0
    );
    return {
      completionCoursePercentage: Math.round(
        (completedLessons / totalLessons) * 100
      ),
    };
  };
  const completionStats = calculateCompletion();
  return (
    <div className="w-full max-w-sm border-l overflow-auto">
      <div className="p-4 border-b">
        <h3 className="font-bold">Course Content</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {completionStats.completionCoursePercentage}% Complete
          </span>
          <div className="w-24 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{
                width: `${completionStats.completionCoursePercentage}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="divide-y">
        {courseData.sections.map((section) => (
          <div key={section._id} className="py-2">
            <div
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection(section._id)}
            >
              <h4 className="font-medium">{section.title}</h4>
              <span>{expandedSections.includes(section._id) ? "−" : "+"}</span>
            </div>
            {expandedSections.includes(section._id) && (
              <div className="pl-6">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className={`p-3 cursor-pointer ${
                      lesson._id === currentLecture._id
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => navigateToLecture(lesson)}
                  >
                    <div className="flex items-center gap-2">
                      {lesson.isCompleted ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
                      )}
                      <span>{lesson.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
