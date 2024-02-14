import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import '../statics/css/carousel.css'

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

    const settings = {
        dots: true,
        infinite: true,
        autoPlay: true,
        autoPlayTime: 3000,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        width: 800,
        height: 800,
    };

    return (
        <div className='carousel'>
            <h1>Featured Courses</h1>
            <div className='card'>
                {courses.length > 0 && (
                    <Slider {...settings}>
                        {courses.map((course) => (
                            <div key={course.id} className='card-content' >
                                <img src={course.pic} alt={`Course ${course.title}`} />
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <Link to={`/courses/${course.id}`}>Learn more</Link>
                            </div>
                        ))}

                    </Slider>
                )}
            </div>
        </div>
    );
};

export default CoursesCarousel;
