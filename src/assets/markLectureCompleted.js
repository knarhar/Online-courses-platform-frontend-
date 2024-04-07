import axios from 'axios';

const markLectureCompleted = async (userId, courseId, topicId, lectureId) => {
  const url = `http://127.0.0.1:8000/api/courses/${courseId}/topics/${topicId}/lectures/${lectureId}/complete`;
  const data = {
    user: userId,
    course: courseId,
    completed_topics: [topicId],
    completed_lectures: [lectureId]
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    });
    console.log('Lecture marked as completed:', response.data);
  } catch (error) {
    console.error('Error marking lecture as completed:', error);
  }
};

export default markLectureCompleted;
