import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { course } from "./OverviewCourse";
export { course } from "../../../public/data/data";

function OverviewCourse() {
  const handleEpisodeClick = (episodeId) => {
    Navigate("/episode", {
      state: { episodeId: episodeId, courseId: course.id },
    });
  };
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Course Description</h2>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
        {course.episodes && course.episodes.length > 0 ? (
          <div className="space-y-4">
            {course.episodes.map((episode) => (
              <div
                key={episode.id}
                onClick={() => handleEpisodeClick(episode.id)}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-50 rounded-full text-pink-600">
                    <FaBook />
                  </div>
                  <div>
                    <h3 className="font-medium">{episode.title}</h3>
                    <p className="text-sm text-gray-500">
                      {episode.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No episodes available for this course</p>
        )}
      </div>
    </div>
  );
}

export default OverviewCourse;
