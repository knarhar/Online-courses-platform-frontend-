import React from 'react'
import logo from '../statics/images/logo.png';
import { Link } from 'react-router-dom';
import '../statics/css/homepage.css';
import CoursesCarousel from '../components/CoursesCarousel';
const HomePage = () => {
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
            <Link to='/register' className='main-action'>Log in to start</Link>
          </div>
        </div>
      </div>
      <CoursesCarousel/>
    </div>
  )
}

export default HomePage
