import React, { useState, useEffect } from 'react';
import '../../statics/css/articles.css';
import sad from '../../statics/images/sad-bg2.jpg'
import { Link } from 'react-router-dom';
import { useAuth } from '../../assets/AuthContext';
function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const categories = [
    { id: null, name: 'All' },
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Economics' },
    { id: 4, name: 'Mathematics' },
    { id: 5, name: 'Other' }
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

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, fetchUserData, userData } = useAuth();

  useEffect(() => {
    getArticles();
    if (isAuthenticated && !userData) {
      fetchUserData();
    }
  }, [selectedCategory, isAuthenticated, userData, fetchUserData]);

  const getArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = selectedCategory
        ? `http://127.0.0.1:8000/api/articles/category/${selectedCategory}/`
        : 'http://127.0.0.1:8000/api/articles/';

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Error fetching articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/article/add/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article_id: id,
        }),
      });
      if (response.ok) {
        console.log('Article deleted successfully');
        getArticles();
      } else {
        console.error('Failed to delete article:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  

  return (
    <div className='articles'>
      <div className='main-articles'>
        <h1>Explore our Articles</h1>
        <p>
          Welcome to our articles section, where we invite you to delve into the
          fascinating world of knowledge. Our articles cover a diverse range of topics,
          from the latest trends in the arts to modern technologies and everyday life hacks.
          Whether you're a newcomer or an expert in a specific field, you'll discover engaging
          and informative content that inspires new discoveries and elevates your level of
          understanding. Regardless of your interests, immerse yourself in a world of
          captivating research, inspirational stories, and unique perspectives carefully
          crafted for you by our team of experts.
        </p>
      </div>
      <CategoryFilter
        onCategoryChange={categoryId => setSelectedCategory(categoryId)}
        selectedCategory={selectedCategory}
      />
      <div className='articles-list'>
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article.id} className='article-card'>
              <div className='article-card-text'>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p>Date posted: {article.pub_date.slice(0, 10)}</p>
                <div className='art-category-flag'><div className='triangle'></div>{article.category_name[0]}</div>
                <Link to={`/articles/${article.id}`} className='link-to-article'><i className="fa-solid fa-tag"></i> See more</Link>
                {userData && userData.is_staff && (
                  <button className='delete-article' onClick={() => handleDeleteArticle(article.id)}><i className="fa-solid fa-trash"></i></button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='no-articles'>
            <img src={sad} alt="Sad face"/>
            <p>No articles found for the selected category.</p>
          </div>
        )}
      </div>
      {userData && userData.is_staff ? (
        <Link to='/add-article'><div className='add-article'> <i className="fa-solid fa-pen"></i> Add article</div></Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ArticlesPage;

