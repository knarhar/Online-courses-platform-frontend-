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
        <Carousel>
            {courses.map(course => (
                <div key={course.id}>
                    <Link to={`/courses/${course.id}`}>
                        <img src={course.pic} alt={course.title} />
                        <p className="legend">{course.title}</p>
                    </Link>
                </div>
            ))}
        </Carousel>
    );
};

export default CoursesCarousel;
