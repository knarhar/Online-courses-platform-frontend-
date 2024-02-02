import React from 'react'

import "../statics/css/header.css"
import { Link } from 'react-router-dom'

function Header(){
  return (
    <header>
      <Link href='/' className='logo'>CourseCore</Link>
      <div className='nav'>
        <Link to='/articles'>Articles</Link>
        <Link to='/courses'>Courses</Link>
        <Link to='/about'>About us</Link>
        <Link to='/policy'>Privacy Policy</Link>
        
      </div>
      <Link to='/register' className='loginbtn' ><i className='fa-solid fa-right-to-bracket'></i>Log in</Link>
    </header>
  )
}

export default Header