import React from 'react'
import about from '../../statics/images/about-us-pg.png'
import '../../statics/css/about.css'
const AboutUsPage = () => {
  return (
    <div>
      <div className='about-us-main-container'>
        <div className='about-us'>
          <img src={about} alt='image' />
          <div className='about-us-text'>
            <h1>About CourseCore</h1>
            <div>
              <div className='slogan-container' >

                <p className='slogan'>Fueling the world's ambitions</p>

              </div>
              <p>CourseCore is a dynamic and inclusive online learning platform offering a diverse array of courses
                curated from renowned educators across the globe. Born out of an innovative experiment by the National
                Polytechnic University of Armenia, CourseCore aims to democratize education and retraining, making it
                accessible to learners worldwide.
              </p>
            </div>
          </div>
        </div>
        <div className='about-us'>

        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
