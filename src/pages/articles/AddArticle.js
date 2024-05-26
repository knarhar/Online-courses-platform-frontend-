import React, { useState } from 'react';
import { useAuth } from '../../assets/AuthContext';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const mdParser = new MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement and quotes beautification
});

const AddArticle = () => {
  const { userData } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleContentChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title: title,
      description: description,
      content: content,
      category: category,
    };

    console.log('Submitted Article:', newArticle);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/article/add/", newArticle, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Server response:', response.data);
      // Перезагрузить страницу после успешного добавления статьи
      window.location.reload();
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  return (
    <div className='add-article-cont'>
        <div className='back-to-courses-container'><div className='triangle'></div><Link to='/articles' className='back-to-courses'><i className="fa-solid fa-arrow-left"></i> Back to articles</Link></div>

      <h1>Add Article</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <span>Title: </span>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <br />
        </div>
        <div className='row'>
          <span>Description: </span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter article description (Max 800 characters)" maxLength={800} required />
        </div>
        <MdEditor
          value={content}
          style={{ height: "500px", fontFamily: "Arial" }} // Example of style customization
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleContentChange}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="1">Programming</option>
          <option value="2">Design</option>
          <option value="3">Economics</option>
          <option value="4">Mathematics</option>
          <option value="5">Other</option>
        </select>
        <button type="submit">Submit Article</button>
      </form>
    </div>
  );
};

export default AddArticle;
