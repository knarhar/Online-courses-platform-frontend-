import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext';
import '../../statics/css/lecturepage.css';
import markLectureCompleted from '../../assets/markLectureCompleted';
import ReactMarkdown from 'react-markdown';

const LecturePage = () => {
  const { id, topicId, lectureId } = useParams();
  const { client } = useAuth();
  const [lectureData, setLectureData] = useState(null);
  const [courseLectures, setCourseLectures] = useState([]);
  const { isAuthenticated, userData, fetchUserData, logout } = useAuth();

  useEffect(() => {
    const updateProgress = async () => {
      try {
        markLectureCompleted(userData.id, id, topicId, lectureId);
        console.log('User progress updated successfully');
      } catch (error) {
        console.error('Error updating user progress:', error);
      }
    };

    updateProgress();
  }, [lectureId]);


  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const lectureResponse = await fetch(`http://127.0.0.1:8000/api/courses/${id}/lectures/${lectureId}/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!lectureResponse.ok) {
          throw new Error(`Failed to fetch lecture data: ${lectureResponse.statusText}`);
        }

        const lectureData = await lectureResponse.json();
        setLectureData(lectureData);
      } catch (error) {
        console.error('Error fetching lecture data:', error);
      }
    };

    fetchLectureData();
  }, [client, id, lectureId]);

  useEffect(() => {
    const fetchCourseLectures = async () => {
      try {
        const lecturesResponse = await fetch(`http://127.0.0.1:8000/api/courses/${id}/topics/${topicId}/lectures/`);
        if (!lecturesResponse.ok) {
          throw new Error(`Failed to fetch course lectures: ${lecturesResponse.statusText}`);
        }
        const lecturesData = await lecturesResponse.json();
        setCourseLectures(lecturesData);
      } catch (error) {
        console.error('Error fetching course lectures:', error);
      }
    };

    fetchCourseLectures();
  }, [id]);



  const getNextLectureId = () => {
    const currentIndex = courseLectures.findIndex(lecture => lecture.id === parseInt(lectureId));
    if (currentIndex !== -1 && currentIndex < courseLectures.length - 1) {
      return courseLectures[currentIndex + 1].id;
    }
    return null;
  };

  const getPreviousLectureId = () => {
    const currentIndex = courseLectures.findIndex(lecture => lecture.id === parseInt(lectureId));
    if (currentIndex > 0) {
      return courseLectures[currentIndex - 1].id;
    }
    return null;
  };

  const preStyle = {
    whiteSpace: 'pre-wrap'
  };

  return (
    <div className='lecture-container'>
      <Link to={`/profile/courses/${id}`} title='Back to course' className='back'><i className="fa-solid fa-arrow-left"></i></Link>
      {lectureData && (
        <div className='lecture'>

          <h2>{lectureData.title}</h2>

          <div style={preStyle} className='lecture-content'>
            <ReactMarkdown children={lectureData.content} />
          </div>
          {lectureData.link ? (
            <div>
            <iframe
              width="100%"
              height="500px"
              src={lectureData.link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          ): (
            <div></div>
          )}
        </div>
      )}




      <div className='lect-nav'>
        {/* Link to previous lecture */}
        {getPreviousLectureId() && (
          <Link  to={`/profile/courses/${id}/topics/${topicId}/lectures/${getPreviousLectureId()}`} className='previous'>
            <i className="fa-solid fa-backward"></i> Previous lecture
          </Link>
        )}

        {/* Link to next lecture */}
        {getNextLectureId() && (
          <Link to={`/profile/courses/${id}/topics/${topicId}/lectures/${getNextLectureId()}`} className='next'>
            Next lecture <i className="fa-solid fa-forward"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LecturePage;
