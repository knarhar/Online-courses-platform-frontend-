import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';

const CourseProgress = ({ courseId }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/progress`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setProgress(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course progress:', error);
      }
    };

    fetchCourseProgress();
  }, [courseId]);

  if (loading) {
    return <p>Loading progress...</p>;
  }

  if (!progress) {
    return <p>No progress available for this course.</p>;
  }

  const { completedModules, completedLectures, totalModules, totalLectures } = progress;

  // Display progress using ProgressBar from react-bootstrap
  return (
    <div>
      <h2>Course Progress</h2>
      <ProgressBar variant="success" now={(completedModules / totalModules) * 100} />
      <p>Completed Modules: {completedModules} / {totalModules}</p>
      <ProgressBar variant="info" now={(completedLectures / totalLectures) * 100} />
      <p>Completed Lectures: {completedLectures} / {totalLectures}</p>
    </div>
  );
};

export default CourseProgress;
