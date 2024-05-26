import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../statics/css/profile.css';
import sad from '../statics/images/sad-bg.jpg';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/my-courses/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                const data = await response.json();
                setCourses(data);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching my courses:', error);
                setLoading(false); 
            }
        };

        fetchMyCourses();
    }, []);

    const handleUnenroll = async (courseId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/enrollment/${courseId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            if (response.ok) {
                setCourses(courses.filter(course => course.course.id !== courseId));
            } else {
                console.error('Failed to unenroll:', response.statusText);
            }
        } catch (error) {
            console.error('Error unenrolling:', error);
        }
    };

    if (loading) {
        return <div className='loader'></div>; }

    return (
        <div className='my-courses-container'>
            <h1>My Courses</h1>
            {courses.length > 0 ? courses.map((courseData) => {
                const course = courseData.course;

                return (
                    <div key={course.id} className='my-courses'>
                        <img src={course.pic} alt={`Course ${course.title}`} />
                        <div className='my-courses-texts'>
                            <h2>{course.title}</h2>
                            <p>Category: {course.category_name}</p>
                            <p>{course.description}</p>
                            <p>Enrollment Date: {courseData.enrollment_date.slice(0, 10)}</p>
                            <Link to={`/profile/courses/${course.id}`} className='course-info-action'>
                                View Course
                            </Link>
                            <button className='course-info-action-delete' onClick={() => handleUnenroll(course.id)}>Unenroll</button>
                        </div>
                    </div>
                );
            }) :
                <div className='my-no-courses'>
                    <img src={sad} />
                    <div>
                        <p>There are no courses</p>
                        <Link to='/courses' className='no-courses-action'>Click to go back to courses</Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyCourses;
