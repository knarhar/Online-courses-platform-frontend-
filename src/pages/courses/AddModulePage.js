import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddModulePage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answer: [{ answer: '', is_correct: false }] }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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
        setSelectedTopic(topicId);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answer[answerIndex].answer = value;
        setQuestions(newQuestions);
    };

    const handleCheckboxChange = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answer.forEach((answer, idx) => {
            if (idx === answerIndex) {
                answer.is_correct = !answer.is_correct;
            } else {
                answer.is_correct = false;
            }
        });
        setQuestions(newQuestions);
    };

    const handleAddAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answer.push({ answer: '', is_correct: false });
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answer: [{ answer: '', is_correct: false }] }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const moduleData = {
            course: selectedCourse,
            topic: selectedTopic,
            title: title,
            question: questions,
        };

        try {
            setLoading(true);

            const response = await axios.post('http://127.0.0.1:8000/api/modules/add/', moduleData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });

            setLoading(false);

            if (response.status === 201) {
                setSuccess(true);
                setTitle('');
                setQuestions([{ question: '', answer: [{ answer: '', is_correct: false }] }]);
            } else {
                setSuccess(false);
                setError('Failed to add module. Please check your data and try again.');
            }
        } catch (error) {
            console.error('Error adding module:', error);
            setLoading(false);
            setSuccess(false);
            setError('Error adding module. Please try again.');
        }
    };

    return (
        <div className='add-module-page'>
            <h1>Add Module</h1>
            {loading && <p>Adding module...</p>}
            {error && <p>{error}</p>}
            {success && <p>Module added successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label>Select Course:</label>
                    <select value={selectedCourse} onChange={(e) => handleCourseChange(e.target.value)} required>
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                </div>

                {selectedCourse && (
                    <div className='form-row'>
                        <label htmlFor='sel-cu'>Select Topic:</label>
                        <select id='sel-cu' value={selectedTopic} onChange={(e) => handleTopicChange(e.target.value)} required>
                            <option value="">Select Topic</option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>{topic.title}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className='form-row'>
                    <label htmlFor='tit'>Title:</label>
                    <input type="text" id='tit' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='add-question-container'>
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex} className='add-question'>
                            <div className='form-row'>
                            <label htmlFor={`que${questionIndex}`}>Question {questionIndex + 1}:</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                                required
                                id={`que${questionIndex}`}
                            />
                            </div>

                            <div className='add-answer-container'>
                                {question.answer.map((answer, answerIndex) => (
                                    <div key={answerIndex} className='add-answer'>
                                        <label htmlFor={`answ${questionIndex}o${answerIndex}`}>Answer {answerIndex+1}: </label>
                                        <textarea
                                            id={`answ${questionIndex}o${answerIndex}`}
                                            value={answer.answer}
                                            onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                                            required
                                        />
                                        <input
                                            type="checkbox"
                                            checked={answer.is_correct}
                                            onChange={() => handleCheckboxChange(questionIndex, answerIndex)}
                                            id={`iscorrect${questionIndex}o${answerIndex}`}
                                        />
                                        <label htmlFor={`iscorrect${questionIndex}o${answerIndex}`}>Correct Answer</label>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddAnswer(questionIndex)}>
                                <i className="fa-solid fa-plus"></i> Add Answer
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion}>
                    <i className="fa-solid fa-plus"></i> Add Question
                    </button>
                </div>

                <button type="submit">Add Module</button>
            </form>
        </div>
    );
};

export default AddModulePage;
