import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../../statics/css/articles.css';

const ArticleDetailPage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {

            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/api/articles/${id}`);
                const data = await response.json();
                setLoading(false);

                console.log(data);
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) {
        return <p>Loading...</p>;
    }

    const preStyle = {
        whiteSpace: 'pre-wrap'
    };

    return (
        <div className='article-cont'>
            <h1>{article.title}</h1>
            <div style={preStyle}>
                <ReactMarkdown children={article.content} />

            </div>
            <Link to='/articles' className='back-to-articles'><i className="fa-solid fa-arrow-left"></i> Return to articles list</Link>
        </div>
    )
}

export default ArticleDetailPage
