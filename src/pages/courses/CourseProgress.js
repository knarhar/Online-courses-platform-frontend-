import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';

const CourseProgress = ({ courseId }) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/progress`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.data) {
          setProgress(response.data);
        } else {
          setError("No progress data found.");
        }
      } catch (error) {
        console.error("Error fetching course progress:", error);
        setError("An error occurred while fetching progress data.");
      }
    };
    fetchCourseProgress();
  }, [courseId]);

  if (!progress) {
    return <p>Loading progress...</p>;
  }

  const { completed_modules, completed_lectures, total_modules, total_lectures } = progress;

  const moduleProgress = (completed_modules.length / total_modules) * 100;
  const lectureProgress = (completed_lectures.length / total_lectures) * 100;

  return (
    <div>
      <h2>Course Progress</h2>


      <div>
        <p>Module Progress</p>
        
        {moduleProgress === 100 ? (<p>You completed all modules!</p>) :
        <ProgressBar now={moduleProgress} label={`${moduleProgress.toFixed(2)}%`} />

        }
      </div>
      <div>
        <p>Lecture Progress</p>
        {lectureProgress === 100 ? (<p>You completed all lectures!</p>) :
          <ProgressBar now={lectureProgress} label={`${lectureProgress.toFixed(2)}%`} />
        }

      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CourseProgress;
