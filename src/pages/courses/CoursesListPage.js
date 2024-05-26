import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../statics/css/courses.css';
import sorry from '../../statics/images/sorry-bg.jpg'
import { useAuth } from '../../assets/AuthContext';

function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const categories = [
    { id: null, name: 'All' },
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Economics' },
    { id: 4, name: 'Mathematics' }
  ];

  const handleChange = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className='categories'>
      <h2><i className="fa-solid fa-filter"></i> Filter by Category:</h2>
      <div className='categories-btn'>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleChange(category.id)}
            className={selectedCategory === category.id ? 'selected' : ''}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className='category-options'>
        <select onChange={(e) => handleChange(Number(e.target.value))} value={selectedCategory || ''}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}


function CoursesListPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userData} = useAuth()

  useEffect(() => {
    getCourses();
  }, [selectedCategory]);

  const getCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = selectedCategory
        ? `http://127.0.0.1:8000/api/courses/category/${selectedCategory}/`
        : 'http://127.0.0.1:8000/api/courses/';

      const response = await fetch(url);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='main-courses-cont'>
        <div className='main-courses'>
          <h1> Discover our Courses </h1>
          <p>Delve into a captivating expedition of intellectual enrichment and expertise refinement as you immerse yourself
             in our expansive array of educational offerings. Regardless of whether you find yourself at the inception of your
              learning voyage or amidst the zenith of your career, our meticulously crafted assortment of courses is tailored to
               accommodate individuals of every proficiency level and inclination. Traverse the boundless realms of knowledge acquisition
                alongside us, embarking upon a transformative odyssey that propels you closer toward the realization of your aspirations, 
                both personally and professionally. Venture forth and discover the myriad opportunities awaiting your exploration and cultivation within our
                 esteemed educational community.</p>
        </div>
      </div>
      <CategoryFilter onCategoryChange={categoryId => setSelectedCategory(categoryId)} selectedCategory={selectedCategory} />
      <div className='courses-list'>
        {loading && <p>Loading courses...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className='course-card'>
              <div>
                <img src={course.pic} alt={`Course ${course.title}`} />
              </div>
              <div className='course-card-text'>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                {course.is_paid ? <p className='paid-price'><div className='triangle'></div>Paid</p> : <p className='free-price'><div className='triangle'></div>Free</p>}
                <div className='category-flag'><div className='triangle'></div>{course.category_name[0]}</div>
                <Link to={`/courses/${course.id}`} className='course-card-action'>Read more...</Link>
              </div>
            </div>
          ))
        ) : (
          <div className='no-courses'>
            <img src={sorry} alt="Sorry" />
            <p>No courses available for the selected category.</p>
          </div>
        )}
      </div>
      {userData && userData.is_staff ? (
        <Link to='/courses/add'><div className='add-article'> <i className="fa-solid fa-pen"></i> Add course</div></Link>
      ) : (
        <></>
      )}

    </div>
  );
}

export default CoursesListPage;
