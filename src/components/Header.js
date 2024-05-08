import React, { useState, useEffect } from 'react';
import "../statics/css/header.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../assets/AuthContext';

function Header() {
  const { isAuthenticated, userData, fetchUserData, logout } = useAuth();
  const [loadingData, setLoadingData] = useState(true);
  const [sidemenuActive, setSidemenuActive] = useState(false);
  useEffect(() => {
    if (isAuthenticated && loadingData) {
      fetchUserData();
      setLoadingData(false);
    }
  }, [isAuthenticated, fetchUserData, loadingData]);
  
  return (
    <header>
      <Link to='/home' className='logo'>CourseCore</Link>
      <div className={ sidemenuActive ? "nav show" : "nav"}>
        <Link to='/articles'>Articles</Link>
        <Link to='/courses'>Courses</Link>
        <Link to='/about'>About us</Link>
        <Link to='/policy'>Privacy Policy</Link>

        {isAuthenticated ? (
          <Link onClick={logout} to='/home' className='loginbtn'>
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </Link>
        ) : (
          <Link to='/register' className='loginbtn'>
            <i className='fa-solid fa-right-to-bracket'></i>Login
          </Link>
        )
        }
      </div>
      {isAuthenticated ? (
        <div className='header-profile'>
          <div className='prof'>
            <Link to='/profile'>{userData && userData.pic && <img src={userData.pic} alt="User Avatar" />}</Link>
            <Link to='/profile'>{userData && userData.username && <p>{userData.username}</p>}</Link>
          </div>
          <Link onClick={logout} to='/home' className='loginbtn'>
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </Link>

          <div className='navigation' onClick={() => setSidemenuActive(!sidemenuActive)}>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>
      ) : (
        <>
          <Link to='/register' className='loginbtn'>
            <i className='fa-solid fa-right-to-bracket'></i>Login
          </Link>

          <div className='navigation' onClick={() => setSidemenuActive(!sidemenuActive)}>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
