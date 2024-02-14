import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  const handleEnroll = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://127.0.0.1:8000/api/enrollment/${id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const data = await response.json();
        setLoading(false);
        setEnrollmentStatus(true)

      } catch (error) {
        console.error('Error enrolling:', error);
      }
    
  }

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setCourse(data);
        setLoading(false)

        setEnrollmentStatus(data.is_enrolled);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id, isAuthenticated]);


  if (!course) {
    return <p>Loading...</p>;
  }

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className='course-container'>
        <img src={course.pic} alt={`Course ${course.title}`} />
        <div className='course-info'>
          <h1>{course.title}</h1>
          <p>Category: {course.category_name}</p>
          <p>{course.is_paid ? <>{course.amount} {course.currency}</> : 'Free'}</p>
          <p>{course.description}</p>
        </div>
        {isAuthenticated ? (
          enrollmentStatus ? (
            <Link to={`/profile/courses/${id}`} className='course-info-action'>
              View My Progress
            </Link>
          ) : (
            <button onClick={handleEnroll} className='course-info-action'>
              Apply
            </button>
          )
        ) : (
          <p>Please log in to enroll in the course.</p>
        )}


        <div className='course-program'>
          <h2>Course Program</h2>
          <div className='dropdown-box'>
            <div className='drowBox'>
              {course.topics.map((topic, index) => (
                <div key={topic.id}>
                  <div className={`opener`} onClick={() => toggleDropdown(index)}>
                    <h1>{topic.title}</h1>
                    <i className={`fas fa-plus-circle ${openIndex === index ? 'rotate' : ''}`}></i>
                  </div>
                  <div className={`content ${openIndex === index ? 'content-active' : ''}`}>
                    <ul>
                      {topic.lectures.map((lecture) => (
                        <li key={lecture.id}>
                          <h3>{lecture.title}</h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {enrollmentMessage && <p>{enrollmentMessage}</p>}
      </div>
    </div>
  );
};

export default CourseDetailPage;