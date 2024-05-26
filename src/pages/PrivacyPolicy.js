import React from 'react'
import '../statics/css/privacyPolicy.css'
const PrivacyPolicy = () => {
  return (
    <div className='pp'>
      
    <div className="pp-main-container">
        <h1>Privacy Policy</h1>
        <div className="pp-main-text">
            <div className="pp-main-title">
                <h4>Privacy Policy of CourseCore</h4>
                <p>CourseCore collects some personal data from it's users</p>
            </div>
            <div className="pp-main-desc">
                <h3>Personal Data collected for the following purposes and using the following services:</h3>
                <div className="pp-services">
                    <div className="service">
                        <h4><i className="fa-solid fa-user"></i> Authentication and Account Management:</h4>
                        <p>E-mail address for user registration and authentication and account management, including
                            password changes and account recovery.</p>
                    </div>
                    <div className="service">
                        <h4><i className="fa-solid fa-bell"></i> Personalization and Recommendations:</h4>
                        <p>Analyzing students' progress and offering course recommendations. Also personalizing
                            notifications about new courses or events.</p>
                    </div>
                    <div className="service">
                        <h4><i className="fa-solid fa-comments-dollar"></i> Course Management:</h4>
                        <p>Tracking students' progress within each course and managing subscriptions and access to paid
                            courses.</p>
                    </div>
                    <div className="service">
                        <h4><i className="fa-solid fa-chart-simple"></i> Marketing and Analytics:</h4>
                        <p>Conducting marketing research based on user data and analyzing user behavior to improve the quality of services.</p>
                    </div>
                    <div className="service">
                        <h4><i className="fa-brands fa-cc-paypal"></i> Payments and Financial Transactions:</h4>
                        <p>Processing payments for premium courses and managing financial operations and subscriptions.</p>
                    </div>
                    <div className="service">
                        <h4><i className="fa-solid fa-shield-halved"></i> Legal and Security Considerations:</h4>
                        <p>Compliance with data protection laws (e.g., GDPR, CCPA) and ensuring the security and confidentiality of user data.</p>
                    </div>

                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default PrivacyPolicy
