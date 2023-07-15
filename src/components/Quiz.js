import React, { useEffect, useState } from "react";
import Question from "./Question.js";
import he from "he";
import "../style.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
      );
      const data = await response.json();

      const decodedQuestions = data.results.map((question) => {
        return {
          ...question,
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer) =>
            he.decode(answer)
          ),
          selectedAnswer: null,
        };
      });

      setQuestions(decodedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const checkAnswers = () => {
    showAnswers ? window.location.reload() : setShowAnswers(true);
    calculateScore();
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      if (question.selectedAnswer === question.correct_answer) {
        score++;
      }
    });
    setScore(score);
  };

  return (
    <div className="Quiz">
      {questions.map((question, index) => (
        <Question
          key={index}
          questionIndex={index}
          question={question.question}
          correctAnswer={question.correct_answer}
          incorrectAnswers={question.incorrect_answers}
          selectedAnswer={question.selectedAnswer}
          showAnswers={showAnswers}
          onAnswerChange={(answer) => {
            const updatedQuestions = [...questions];
            updatedQuestions[index].selectedAnswer = answer;
            setQuestions(updatedQuestions);
          }}
        />
      ))}
      {showAnswers && (
        <div className="score">
          You scored {score}/{questions.length} correct answers
        </div>
      )}
      <button className="btn" onClick={checkAnswers}>
        {showAnswers ? "Play Again" : "Check answers"}
      </button>
    </div>
  );
}

export default Quiz;
