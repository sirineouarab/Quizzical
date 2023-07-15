import React, { useState, useEffect } from "react";
import "../style.css";

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShuffledOptions(
      shuffleArray([props.correctAnswer, ...props.incorrectAnswers])
    );
  }, [props.correctAnswer, props.incorrectAnswers]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
    props.onAnswerChange(event.target.value);
  };

  const getLabelStyle = (option) => {
    if (props.showAnswers) {
      if (option === props.correctAnswer) {
        return {
          backgroundColor: "#94D7A2",
        };
      } else if (option === selectedAnswer) {
        return {
          backgroundColor: "#F8BCBC",
        };
      }
    }
    return {};
  };

  return (
    <div className="Question">
      <h2 className="question">{props.question}</h2>
      <div className="options">
        {shuffledOptions.map((option, index) => {
          const optionId = `answer${props.questionIndex}-${index}`;
          return (
            <React.Fragment key={option}>
              <input
                type="radio"
                id={optionId}
                name={`answer${props.questionIndex}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerChange}
              />
              <label htmlFor={optionId} style={getLabelStyle(option)}>
                {option}
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default Question;
