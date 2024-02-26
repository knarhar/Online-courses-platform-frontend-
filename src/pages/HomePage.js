import React from 'react';
import logo from '../statics/images/logo.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../statics/css/homepage.css';
import CoursesCarousel from '../components/CoursesCarousel';
import { useAuth } from '../assets/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);
  return (
    <div>
      <div className='main-container'>
        <div className='main'>
          <div className='main-text'>
            <h1>Learn and Grow with CourseCore</h1>
            <p>Discover a world of knowledge and unlock your potential with our wide range of educational courses</p>
          </div>
          <div className='main-logo'>
            <img src={logo} alt='logo' />
            {isAuthenticated ?(
              <Link to='/courses' className='main-action'>Explore our courses</Link>) :(
                <Link to='/register' className='main-action'>Log in to start</Link>)
            }
          </div>
        </div>
      </div>
      <CoursesCarousel />
    </div>
  );
}

export default HomePage;
