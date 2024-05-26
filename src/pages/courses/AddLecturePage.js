import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const AddLecturePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}`);
      setTopics(response.data.topics);
    } catch (error) {
      console.error('Error fetching topics for course:', error);
    }
  };

  const handleTopicChange = (topicId) => {
    setTopicId(topicId);
  };

  const handleContentChange = ({ text }) => {
    setContent(text);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setLoading(true);

    const lectureData = {
      title: title,
      content: content,
      link: link,
      topic: topicId,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/lectures/add/", lectureData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      if (response.status === 201) {
        setSuccessMessage('Lecture added successfully!');
        setTitle('');
        setContent('');
        setLink('');
        setTopicId('');
      } else {
        setError('Failed to add lecture. Please check your data and try again.');
      }
    } catch (error) {
      console.error('Error submitting lecture:', error);
      setError('Error adding lecture. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='add-lect-cont'>
      <h1>Add Lecture</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Select Course:</label>
          <select value={selectedCourse} onChange={(e) => handleCourseChange(e.target.value)} required>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className='row'>
            <label>Select Topic:</label>
            <select value={topicId} onChange={(e) => handleTopicChange(e.target.value)} required>
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </div>
        )}

        <div className='row'>
          <label>Title of lecture:</label>
          <input
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='Add lecture title'
            required
          />
        </div>

        <MdEditor className='md-editor'
          value={content}
          style={{ height: "500px", fontFamily: "Arial" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleContentChange}
        />

        <div className='row link'>
          <label>Video link: (optional) </label>
          <input
            type='text'
            value={link}
            onChange={handleLinkChange}
            placeholder='link'
          />
        </div>

        {loading && <p>Adding lecture...</p>}
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Submit Lecture</button>
      </form>
    </div>
  );
};

export default AddLecturePage;
