import React from 'react'
import about from '../../statics/images/about-us-pg.png'
import about2 from '../../statics/images/about.png'
import logo from '../../statics/images/logo.png'
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
        <div className='about-us2'>
          <div className='about-us-text2'>
            <p>Our commitment is rooted in the transformative potential of high-quality online education, envisioning a
              future where learning knows no bounds. Whether you're looking to acquire new skills, enhance your
              knowledge, or embark on a journey of personal growth, CourseCore is your gateway to limitless learning
              possibilities.</p>
            <p>
              At CourseCore, we recognize the importance of recognition and the desire to unlock one's full potential.
              By engaging with our platform, you not only gain valuable knowledge but also position yourself as a
              recognized specialist in your field. Join us on this educational journey, where your aspirations meet
              endless opportunities for growth and achievement. Embrace the future of learning with CourseCore.
            </p>
          </div>
          <img src={about2} />
        </div>
        <div className='about-us-contact'>
          <div className='foo-logo-cont'>
            <div className='foo-logo'>
              <img src={logo} />
              <h1>CourseCore</h1>

            </div>

            <p>© CourseCore, Inc. 2024. We love our students!</p>
          </div>
          <div className='contacts'>
            <p>Contact us:</p>
            <div className='media'>
              <i className="fa-brands fa-x-twitter"></i>
              <p>CourseCore</p>
            </div>
            <div className='media'>
              <i class="fa-brands fa-facebook"></i>
              <p>CourseCore</p>
            </div>
            <div className='media'>
              <i class="fa-solid fa-envelope"></i>
              <p>coursecore@gmail.com</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
