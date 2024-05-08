import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../assets/AuthContext";
import "../../statics/css/modulepage.css";
import markModuleCompleted from "../../assets/markModuleCompleted";

const ModulePage = () => {
  const { id, topicId, moduleId } = useParams();
  const { client, userData } = useAuth();
  const [moduleData, setModuleData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const moduleResponse = await fetch(
          `http://127.0.0.1:8000/api/courses/${id}/modules/${moduleId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!moduleResponse.ok) {
          throw new Error(
            `Failed to fetch module data: ${moduleResponse.statusText}`
          );
        }

        const moduleData = await moduleResponse.json();
        setModuleData(moduleData);
      } catch (error) {
        console.error("Error fetching module data:", error);
      }
    };

    fetchModuleData();
  }, [client, id, moduleId]);

  useEffect(() => {
    if (allQuestionsAnswered) {
      const result = (score / moduleData.question.length) * 100;
      console.log(result);
      markModuleCompleted(userData.id, id, topicId, moduleId, result).then(
        () => console.log("Module completed successfully"),
        (error) => console.error("Error marking module as completed:", error)
      );
    }
  }, [allQuestionsAnswered]);

  const handleAnswerSelect = (questionId, answerId, isCorrect) => {
    if (!selectedAnswers[questionId]) {
      const updatedSelectedAnswers = { ...selectedAnswers };
      updatedSelectedAnswers[questionId] = answerId;
      setSelectedAnswers(updatedSelectedAnswers);
      if (isCorrect) {
        setScore(score + 1);
      }
      const allQuestionsAnswered =
        Object.keys(updatedSelectedAnswers).length ===
        moduleData.question.length;

      setAllQuestionsAnswered(allQuestionsAnswered);
    }
  };

  return (
    <div>
      {moduleData && (
        <div className="module-container">
          <Link to={`/profile/courses/${id}`} title='Back to course'><i className="fa-solid fa-arrow-left"></i></Link>

          <h2>Module: {moduleData.title}</h2>
          <p>Score: {score}</p>
          {moduleData.question.map((question, index) => {
            const isAnswered = selectedAnswers[question.id] !== undefined;
            const isCorrect = question.answer.find(
              (answer) =>
                answer.id === selectedAnswers[question.id] && answer.is_correct
            );
            const questionClass = isAnswered ? "read-only" : "";

            return (
              <div
                key={question.id}
                className={`question-container ${questionClass}`}
              >
                <h4>
                  Question {index + 1}: {question.question}
                </h4>
                {question.answer.map((answer) => {
                  const answerClass = isAnswered
                    ? answer.id === selectedAnswers[question.id]
                      ? isCorrect
                        ? "answer correct"
                        : "answer incorrect"
                      : "answer"
                    : "answer";

                  return (
                    <p
                      className={answerClass}
                      key={answer.id}
                      onClick={() =>
                        handleAnswerSelect(
                          question.id,
                          answer.id,
                          answer.is_correct
                        )
                      }
                    >
                      {answer.answer}
                    </p>
                  );
                })}
              </div>
            );
          })}
          {allQuestionsAnswered && (
            <div className="result-container">
              <div className="result">
                <h3>Quiz Completed!</h3>
                <p>Your score: {(score / moduleData.question.length) * 100}%</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModulePage;
