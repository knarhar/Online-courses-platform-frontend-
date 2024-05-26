import React, { useState } from 'react';
import logo from '../statics/images/logo.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../statics/css/homepage.css';
import CoursesCarousel from '../components/CoursesCarousel';
import { useAuth } from '../assets/AuthContext';
import Learn from '../components/Learn';
import axios from 'axios';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');

  const handleNewsletter = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/newsletter-subscription/`, { email });
      if (response.status === 200) {
        alert('You subscribed successfully!');
      } else {
        console.error('Failed to subscribe:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            {isAuthenticated ? (
              <Link to='/courses' className='main-action'>Explore our courses</Link>) : (
              <Link to='/register' className='main-action'>Log in to start</Link>)
            }
          </div>
        </div>
      </div>
      <h1 className='avil'> <i className="fa-solid fa-star"></i> Available courses</h1>

      <CoursesCarousel />

      <Learn />

      <div className='newsletter-container'>
        <div className='contacts'>
          <h2>This is how you can contact us:</h2>
          <div className='media'><i className="fa-solid fa-phone"></i> <a href='#'> Tel +1 (98) 102-546-15-12</a></div>
          <div className='media'><i className="fa-solid fa-envelope"></i>  <a href='#'>E-mail: coursecore.support@gmail.com</a></div>
          <div className='media'><i className="fa-brands fa-x-twitter"></i><a href='#'>CourseCore</a></div>
          <div className='media'>
            <i className="fa-brands fa-facebook"></i>
            <a href='#'>CourseCore</a>
          </div>
        </div>

        <div className='newsletter'>
          <h2>Useful Newsletter</h2>
          <p>Let us notify you about new blog articles, new free courses and share useful
            materials.</p>
          <form onSubmit={handleNewsletter}>
            <input type="email" name='email' placeholder="Your E-mail..." value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Send</button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default HomePage;
