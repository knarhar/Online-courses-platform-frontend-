import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'; // Correct import statement
import '../../statics/css/courseprogress.css'


const CourseProgress = ({ courseId }) => {
  const [progress, setProgress] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
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

  useEffect(() => {
    if (progress && progress.completed_modules.length === progress.total_modules && progress.completed_lectures.length === progress.total_lectures) {
      axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/total_progress/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      })
        .then(response => {
          setTotalScore(response.data.average_quiz_score);
        })
        .catch(error => {
          console.error(error);
          setError("An error occurred while fetching total progress data.");
        });
    }
  }, [progress, courseId]);

  if (!progress) {
    return <p>Loading progress...</p>;
  }

  const { completed_modules, completed_lectures, total_modules, total_lectures } = progress;

  const moduleProgress = (completed_modules.length / total_modules) * 100;
  const lectureProgress = (completed_lectures.length / total_lectures) * 100;

  return (
    <div className='course-progress-container'>
      <h2>Course Progress</h2>
      <div className='lecture-progress'>
        <p>Lecture Progress</p>
        {lectureProgress === 100 ? (
          <>
            <div className='completed'>
              <div className='progress-bar-container'>
                <div className='progress-bar' style={{ width: `${lectureProgress}%` }}>{lectureProgress}%</div>
              </div>
              <p>You completed all lectures!</p>
            </div>
          </>
        ) : <>
          <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${lectureProgress}%` }} > {lectureProgress.toFixed(0)}%</div>
          </div>
        </>
        }
      </div>
      <div className='module-progress'>
        <p>Module Progress</p>
        {moduleProgress === 100 ? (
          <>
            <div className='completed'>
              <div className='progress-bar-container'>
                <div className='progress-bar' style={{ width: `${moduleProgress}%` }}>{moduleProgress}%</div>
              </div>
              <p>You completed all modules!</p>
            </div>
          </>

        ) :
          <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${moduleProgress}%` }}>{moduleProgress.toFixed(0)}%</div>
          </div>
        }
      </div>


      {moduleProgress === 100 && lectureProgress === 100 ? (
        <div className='total'>
          {totalScore !== null && <p>Average course score: {totalScore.toFixed(0)}%</p>}
        </div>
      ) : (
        <div></div>
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CourseProgress;
