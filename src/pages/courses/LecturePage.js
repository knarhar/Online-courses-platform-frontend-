import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext';

const LecturePage = () => {
  const { id, lectureId } = useParams();
  const { client } = useAuth();
  const [lectureData, setLectureData] = useState(null);

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

  return (
    <div className='lecture-container'>
      <h2>Lecture Content</h2>
      {lectureData && (
        <div>
          <h3>{lectureData.title}</h3>
          <p>{lectureData.content}</p>
          {/* Добавьте дополнительную информацию о лекции, используя lectureData */}
        </div>
      )}
    </div>
  );
};

export default LecturePage;
