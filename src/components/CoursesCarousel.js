import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import '../statics/css/carousel.css';

const CoursesCarousel = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className='carousel-cont'>
            <div className='courses-carousel'>
                {courses.map((course) => (
                    <div className='carousel-item' key={`${course.id}`}>

                        <div className='carousel-wrapper'>

                            <Link to={`/courses/${course.id}`} key={course.id}>
                                <img src={course.pic} alt={course.title} />
                            </Link>

                            <div className='course-content'>
                            <h2>{course.title.length > 10 ? `${course.title.slice(0, 10)}...` : course.title}</h2>
                                <Link to={`/courses/${course.id}`} className='carousel-link' key={course.id}>
                                    Read more
                                </Link>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
            <div className='courses-carousel'>
                {courses.map((course) => (
                    <div className='carousel-item' key={`${course.id}115`}>

                        <div className='carousel-wrapper'>

                            <Link to={`/courses/${course.id}`} key={`${course.id}`}>
                                <img src={course.pic} alt={course.title} />
                            </Link>

                            <div className='course-content'>
                            <h2>{course.title.length > 10 ? `${course.title.slice(0, 10)}...` : course.title}</h2>
                                <Link to={`/courses/${course.id}`} className='carousel-link' key={course.id}>
                                    Read more
                                </Link>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default CoursesCarousel;
