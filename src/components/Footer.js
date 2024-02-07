import React from 'react';
import { Link } from 'react-router-dom';
import '../statics/css/footer.css';
function Footer (){
    return (
        <footer>
            <div className='nav'>
                <Link to='/articles'>Articles</Link>
                <Link to='/courses'>Courses</Link>
                <Link to='/about'>About us</Link>
                <Link to='/policy'>Privacy Policy</Link>

            </div>
            
            <Link href='/' className='logo'>© CourseCore</Link>
        </footer>
    )
}

export default Footer
