import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import CommentLesson from "./CommentLesson";
import Sidebar from "./Sidebar";

const WatchCoursePage = () => {
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

  const [currentLecture, setCurrentLecture] = useState(
    courseData.sections[0].lessons[0]
  );
  const [isPurchased, setIsPurchased] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isPurchased) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need to buy this course to watch it
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Purchase Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header at the top */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">{courseData.title}</h1>
            <p className="text-sm text-gray-500">
              {
                courseData.sections.find((s) =>
                  s.lessons.some((l) => l._id === currentLecture._id)
                )?.title
              }{" "}
              - <span className="font-medium">{currentLecture.title}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 p-4 gap-4 overflow-auto">
          <div className="w-full flex-1 bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${
                currentLecture.videoLink.split("v=")[1]
              }`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
          <CommentLesson />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default WatchCoursePage;
