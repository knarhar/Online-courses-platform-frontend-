import React, { useState, useEffect } from 'react';

function CoursesListPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses/');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  console.log(courses)
  return (
    <div>
      <div className='courses-list'>
        {courses.map((course, index) => (
          <div key={index} className='course-card'>
            <h3>{course.title}</h3>
            <img src={course.pic} alt={`Course ${course.title}`} />
            <p>{course.description}</p>
            <p>{course.is_paid ? 'Paid' : 'Free'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesListPage;
