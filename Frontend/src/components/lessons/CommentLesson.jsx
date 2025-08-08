import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
function CommentLesson() {
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
    reviews: [
      // {
      //   user: "john_doe",
      //   rating: 5,
      //   comment:
      //     "This lesson was very informative and well-structured. The examples were clear and helped me understand the concepts better.",
      // },
    ],
  };

  const [reviewForm, setReviewForm] = useState({
    reviewText: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      user: "user123",
      comment: reviewForm.reviewText,
    };
    courseData.reviews = [...(courseData.reviews || []), newReview];
    setReviewForm({ reviewText: "" });
    alert("Review submitted successfully!");
  };
  const handleDownloadPDF = () => {
    alert("PDF downloaded successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FaFilePdf className="text-blue-600" />
          <h3 className="text-xl font-bold">
            {courseData.reviews?.length ? "Your Comment" : "Comment"}
          </h3>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <FaFilePdf />
          Download PDF
        </button>
      </div>
      {courseData.reviews?.length ? (
        <div className="space-y-2">
          <p className="whitespace-pre-wrap">{courseData.reviews[0].comment}</p>
        </div>
      ) : (
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Comment</label>
              <textarea
                name="reviewText"
                value={reviewForm.reviewText}
                onChange={handleInputChange}
                placeholder="Write your comment here..."
                rows={4}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentLesson;
