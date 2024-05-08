import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext';
import '../../statics/css/payment.css'


const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const { isAuthenticated, userData, fetchUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [bankAccount, setBankAccount] = useState('');
  const [coursePrice, setCoursePrice] = useState('');

  if (!showPaymentForm) {
    document.body.classList.remove('payment-form-open');
  }



  const handleEnroll = async () => {
    if (bankAccount !== '0000000000000000' && course.is_paid) {

      try {
        setLoading(true);

        await fetch(`http://127.0.0.1:8000/api/enrollment/${id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({ bankAccount, coursePrice }),
        });

        await fetch(`http://127.0.0.1:8000/api/user-progress/${userData.id}/courses/${id}/initialize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({ lectureId: id }),
        });

        setLoading(false);
        setEnrollmentStatus(true);
        setShowPaymentForm(!showPaymentForm);
      } catch (error) {
        console.error('Error enrolling:', error);
      }
    } else if (!course.is_paid) {
      try {
        setLoading(true);

        await fetch(`http://127.0.0.1:8000/api/enrollment/${id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        await fetch(`http://127.0.0.1:8000/api/user-progress/${userData.id}/courses/${id}/initialize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({ lectureId: id }),
        });

        setLoading(false);
        setEnrollmentStatus(true);
      } catch (error) {
        console.error('Error enrolling:', error);
      }
    }
    else if (course.is_paid && bankAccount === '0000000000000000') {
      alert('Please enter your bank account!')
    }
  };


  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
          headers: isAuthenticated ? { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } : {}
        });
        const data = await response.json();
        console.log(data);
        setCourse(data);
        setLoading(false);
        setEnrollmentStatus(data.is_enrolled);
        setShowPaymentForm(false);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (userData) {
      setBankAccount(userData.bank_account);
    }
  }, [userData]);
  
  
  useEffect(() => {
    if (showPaymentForm) {
      document.body.classList.add('payment-form-open');
    } else {
      document.body.classList.remove('payment-form-open');
    }
  }, [showPaymentForm]);


  if (!course) {
    return <p>Loading...</p>;
  }


  const toggleApplyForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className='course-container'>
      <div className='back-to-courses-container'><div className='triangle'></div><Link to='/courses' className='back-to-courses'><i className="fa-solid fa-arrow-left"></i> Back to courses</Link></div>
        <img src={course.pic} alt={`Course ${course.title}`} />
        <div className='course-info'>
          <h1>{course.title}</h1>
          <p>Category: {course.category_name}</p>
          <p>{course.is_paid ? <>{course.amount} {course.currency}</> : 'Free'}</p>
          <p>{course.description}</p>
          {isAuthenticated ? (
            enrollmentStatus ? (
              <Link to={`/profile/courses/${id}`} className='course-info-action-enrl'>
                View My Progress
              </Link>
            ) : (
              <>
                {course.is_paid ? (
                  <>
                    <button onClick={toggleApplyForm} className='course-info-action'>
                      Apply
                    </button>
                    {showPaymentForm && (
                      <div className='payment-form-container'>

                        <div className="payment-form">
                          <div className='payment-row'>
                            <label htmlFor="bk">Bank account:</label>
                            <input type="text" name="bk" placeholder="Enter bank account" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                          </div>
                          <div className='payment-row'>
                            <label htmlFor="pr">Course Price:</label>
                            <input type="text" name="pr" className='pr' placeholder="Enter course price" value={course.amount + `${course.currency}`} onChange={(e) => setCoursePrice(e.target.value)} disabled unselectable='true' />
                          </div>
                          <div className='btns'>
                            <button onClick={handleEnroll} className='enroll'>
                              Enroll
                            </button>
                            <button onClick={() => setShowPaymentForm(false)} className='cancel'>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={handleEnroll} className='course-info-action'>
                    Apply
                  </button>
                )}
              </>
            )) : (
            <p>Please log in to enroll in the course.</p>
          )}
        </div>
        <div className='course-program'>
          <h2>Course Program</h2>
          <div className='dropdown-box'>
            <div className='drowBox'>
              {course.topics.map((topic, index) => (
                <div key={topic.id}>
                  <div className={`opener`} onClick={() => toggleDropdown(index)}>
                    <h1>{topic.title}</h1>
                    <i className={`fas fa-plus-circle ${openIndex === index ? 'rotate' : ''}`}></i>
                  </div>
                  <div className={`content ${openIndex === index ? 'content-active' : ''}`}>
                    <ul>
                      {topic.lectures.map((lecture) => (
                        <li key={lecture.id}>
                          <h3>{lecture.title}</h3>
                        </li>
                      ))}
                      {topic.modules.map((module) => (
                        <li key={module.id}>
                          <h3>{module.title}</h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {enrollmentMessage && <p>{enrollmentMessage}</p>}
      </div>
    </div>
  );
};

export default CourseDetailPage;
