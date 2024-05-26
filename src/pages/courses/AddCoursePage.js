import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCoursePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [topics, setTopics] = useState(['']);
    const [pic, setPic] = useState(null);
    const [isPaid, setIsPaid] = useState(false); // New state for is_paid
    const [amount, setAmount] = useState(0);      // New state for amount
    const [currency, setCurrency] = useState('USD'); // New state for currency
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleTopicChange = (index, value) => {
        const newTopics = [...topics];
        newTopics[index] = value;
        setTopics(newTopics);
    };

    const handleFileChange = (e) => {
        setPic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('pic', pic);
        formData.append('is_paid', isPaid);    // Append is_paid
        formData.append('amount', amount);      // Append amount
        formData.append('currency', currency);  // Append currency

        const topicsData = topics.map(topic => ({ title: topic }));
        formData.append('topics', JSON.stringify(topicsData));

        try {
            setLoading(true);

            const response = await fetch("http://127.0.0.1:8000/api/course/create/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: formData,
            });

            setLoading(false);

            if (response.status === 201) {
                setSuccess(true);
                setTitle('');
                setDescription('');
                setCategory('');
                setPic(null);
                setTopics(['']);
                setIsPaid(false);   // Reset is_paid state
                setAmount(0);       // Reset amount state
                setCurrency('USD'); // Reset currency state
            } else {
                setSuccess(false);
                setError("Failed to create course. Please check your data and try again.");
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setLoading(false);
            setSuccess(false);
            setError("Error creating course. Please try again.");
        }
    };

    const handleAddTopic = () => {
        setTopics([...topics, '']);
    };

    return (
        <div className='add-course-cont'>
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='row'>
                    <label>Title:</label>
                    <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='row'>
                    <label>Description:</label>
                    <textarea value={description} name='description' onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='row'>
                    <label>Category:</label>
                    <select value={category} name='category' onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="1">Programming</option>
                        <option value="2">Design</option>
                        <option value="3">Economics</option>
                        <option value="4">Mathematics</option>
                    </select>
                </div>
                <div className='row image'>
                    <label>Course Image:</label>
                    <input type='file' id='pic' name='pic' onChange={handleFileChange} />
                </div>
                <div className='is-paid-form'>
                    <div className='row'>
                        <label>Is Paid:</label>
                        <input type='checkbox' checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
                    </div>
                    {isPaid && (
                        <div className='row'>
                            <label>Amount:</label>
                            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        </div>
                    )}
                    {isPaid && (
                        <div className='row'>
                            <label>Currency:</label>
                            <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                                <option value="USD">US Dollar</option>
                                <option value="EUR">Euro</option>
                            </select>
                        </div>
                    )}
                </div>
                <div className='topic-inputs'>
                    {topics.map((topic, index) => (
                        <div key={index}>
                            <div className='row'>
                                <label>Topic {index + 1}:</label>
                                <input type="text" value={topic} onChange={(e) => handleTopicChange(index, e.target.value)} required name={`topics[${index}]`} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTopic}><i className="fa-solid fa-plus"></i> Add Topic</button>
                </div>
                <div className='add-btns'>
                    <button type="submit">Submit Course</button>
                </div>
            </form>

            {!loading && success && <p className='success'>Course created successfully!</p>}

            <div className='add-links'>
                <p>For adding lectures and modules, please visit:</p>
                <div className='add-btns'>
                    <Link to="/courses/add-lecture" className='link'>Add Lecture</Link>
                    <Link to="/courses/add-module" className='link'>Add Module</Link>
                </div>
            </div>
        </div>
    );
};

export default AddCoursePage;
