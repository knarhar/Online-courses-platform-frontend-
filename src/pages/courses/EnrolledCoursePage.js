import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../assets/AuthContext";
import '../../statics/css/enrolledcourse.css'
import CourseProgress from "./CourseProgress";

const EnrolledCoursePage = () => {
  const { id } = useParams();
  const { client, userData } = useAuth();
  const [courseData, setCourseData] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [topicOpen, setTopicOpen] = useState({});
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await fetch(`http://127.0.0.1:8000/api/courses/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!courseResponse.ok) {
          throw new Error(`Failed to fetch course data: ${courseResponse.statusText}`);
        }

        const courseData = await courseResponse.json();
        setCourseData(courseData);
        console.log(courseData);

      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [client, id]);

  const toggleTopic = (topicId) => {
    setTopicOpen((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  return (
    <div>
      {courseData && (
        <div>
          <div className="enr-main-cont smalldot">
            <img src={courseData.pic} />
            <h1>{courseData.title}</h1>
            <p>{courseData.description}</p>
          </div>
          <div className="enr-prog">
            <h4>Course Program</h4>
            {courseData.topics.map((topic) => (
              <div key={topic.id}>
                <div className={topicOpen[topic.id] ? 'title-bar active' : 'title-bar'} onClick={() => toggleTopic(topic.id)}>
                  <i className={topicOpen[topic.id] ? 'fa-solid fa-angle-up active' : 'fa-solid fa-angle-up'}></i>
                  <h1><a href={topic.link} target="blank_">{topic.title}</a></h1><span>(click for more info)</span>
                </div>
                <div className={topicOpen[topic.id] ? 'title-body active' : 'title-body'}>
                  <ul>
                    {topic.lectures.map((lecture) => (
                      <li key={lecture.id}>
                        <Link to={`/profile/courses/${id}/topics/${topic.id}/lectures/${lecture.id}`}>
                          {lecture.title}
                        </Link>
                      </li>
                    ))}
                    {topic.modules.map((module) => (
                      <li key={module.id}>
                        <Link to={`/profile/courses/${id}/topics/${topic.id}/modules/${module.id}`}>{module.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <CourseProgress courseId={id}/>

        </div>
      )}
    </div>
  );
};

export default EnrolledCoursePage;
