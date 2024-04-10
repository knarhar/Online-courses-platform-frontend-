import axios from 'axios';

const markModuleCompleted = async (userId, courseId, topicId, moduleId, result) => {
  const url = `http://127.0.0.1:8000/api/courses/${courseId}/topics/${topicId}/module/${moduleId}/complete`;
  const data = {
    user: userId,
    course: courseId,
    completed_topics: [topicId],
    completed_modules: [moduleId],
    quiz_results: result
  };
  
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    });
    console.log('Module marked as completed:', response.data);
  } catch (error) {
    console.error('Error marking module as completed:', error.data);
  }
};

export default markModuleCompleted;
