import React, { useState, useEffect } from 'react';
import '../../statics/css/articles.css';
import sad from '../../statics/images/sad-bg2.jpg'
function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const categories = [
    { id: null, name: 'All' },
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Economics' },
    { id: 4, name: 'Mathematics' }
  ];

  return (
    <div className='categories'>
      <h2>Filter by Category:</h2>
      <div className='categories-btn'>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={selectedCategory === category.id ? 'selected' : ''}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles();
  }, [selectedCategory]);

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

  return (
    <div>
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
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))
        ) : (
          <div className='no-articles'>
            <img src={sad}/>
          <p>No articles found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
