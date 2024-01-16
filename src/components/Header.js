import React from 'react'

function Header(){
  return (
    <header>
      <a href='/' className='logo'>CourseCore</a>
      <div className='nav'>
        <a href='/'>Articles</a>
        <a href='/'>Courses</a>
        <a href='/'>About us</a>
        <a href='/'>Privacy Policy</a>
      </div>
      <a href='google.com' className='loginbtn' ><i className='fa-solid fa-right-to-bracket'></i>Log in</a>
    </header>
  )
}

export default Header