import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../assets/AuthContext";
import "../../statics/css/modulepage.css";

const ModulePage = () => {
  const { id, moduleId } = useParams();
  const { client } = useAuth();
  const [moduleData, setModuleData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

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
            `Failed to fetch lecture data: ${moduleResponse.statusText}`
          );
        }

        const moduleData = await moduleResponse.json();
        setModuleData(moduleData);
        console.log(moduleData);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    };

    fetchModuleData();
  }, [client, id, moduleId]);

  return (
    <div>
      {moduleData && (
        <div className="module-container">
          <h2>Module: {moduleData.title}</h2>
          <p>Score: {score}</p>
          {moduleData.question.map((question, index) => {
            const isCorrect = question.answer.find(
              (answer) => answer.id === selectedAnswer && answer.is_correct
            );

            return (
              <div key={question.id} className="question-container">
                <h4>Question {index + 1}: {question.question}</h4>
                {question.answer.map((answer) => {
                  const answerClass =
                    selectedAnswer === answer.id
                      ? isCorrect
                        ? "answer correct"
                        : "answer incorrect"
                      : "answer";

                  return (
                    <p
                      className={answerClass}
                      key={answer.id}
                      onClick={() => {
                        setSelectedAnswer(answer.id);
                        if (isCorrect) {
                          setScore(score + 1);
                        }
                      }}
                    >
                      {answer.answer}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModulePage;
