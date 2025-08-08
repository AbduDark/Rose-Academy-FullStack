import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaUser } from "react-icons/fa";
import { course } from "./OverviewCourse";

function ReviewCorse() {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewError(null);
    setReviewSuccess(false);

    if (!reviewRating || !reviewText) {
      setReviewError("Please provide both rating and review text");
      return;
    }

    setTimeout(() => {
      const newReview = {
        id: course.comments.length + 1,
        user: {
          name: "Current User",
          image: "../../../public/images/Rose_Logo.png",
        },
        comment: reviewText,
        rate: reviewRating,
        created_at: new Date().toISOString().split("T")[0],
      };

      course.comments.push(newReview);
      setReviewSuccess(true);
      setReviewText("");
      setReviewRating(0);
    }, 1000);
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

      {course.comments && course.comments.length > 0 ? (
        <>
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-5xl font-bold mb-2">4.5</h3>
                <div className="flex justify-center md:justify-start mb-2">
                  {renderStars(4.5)}
                </div>
                <p className="text-gray-500">(Based on average review)</p>
              </div>
              <div>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-yellow-400 h-1.5 rounded-full"
                            style={{
                              width: `${
                                rating === 5
                                  ? 100
                                  : rating === 4
                                  ? 80
                                  : rating === 3
                                  ? 60
                                  : rating === 2
                                  ? 40
                                  : 20
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          {rating}
                        </span>
                        <FaStar className="text-yellow-400 text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* REVIEW LIST */}
          <div className="space-y-6">
            {course.comments.map((comment, index) => (
              <div key={comment.id}>
                <div className="flex pb-6 mb-6 border-b border-gray-100">
                  <img
                    src={comment.user.image}
                    alt={comment.user.name}
                    className="w-16 h-16 rounded-full mr-6"
                  />
                  <div>
                    <h3 className="font-bold">{comment.user.name}</h3>
                    <div className="flex mb-2">{renderStars(comment.rate)}</div>
                    <p className="text-gray-600 mb-2">{comment.comment}</p>
                    <p className="text-sm text-gray-400">
                      {comment.created_at}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No reviews yet</p>
      )}

      {/* REVIEW FORM */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        {reviewError && <p className="text-red-500 mb-4">{reviewError}</p>}
        {reviewSuccess && (
          <p className="text-green-500 mb-4">Review submitted successfully!</p>
        )}
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= reviewRating ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="review-text" className="block text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="review-text"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center"
                disabled={!reviewRating || !reviewText}
              >
                <FaUser className="mr-2" />
                Post Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewCorse;
