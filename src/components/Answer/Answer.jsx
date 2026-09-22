import { use } from "react";

import { QuizContext } from "../../store/QuizContext";

import "./Answer.css";

export default function Answer({ answer }) {
  const { selectedAnswer, time, onAnswerClick } = use(QuizContext);

  let buttonStyle;

  let disabled = false;

  const onAnswer = selectedAnswer?.id === answer.id;

  const isCorrect = selectedAnswer?.isCorrect;

  if (onAnswer && time === 1000) {
    buttonStyle = "selected";
  } else if (onAnswer && time === 2000) {
    if (isCorrect) {
      buttonStyle = "correct";
    } else if (!isCorrect) {
      buttonStyle = "wrong";
    }
  }

  if (time === 1000 || time === 2000) {
    disabled = true;
  }

  return (
    <li className="answer">
      <button
        onClick={() => onAnswerClick(answer)}
        className={buttonStyle}
        disabled={disabled}
      >
        {answer.text}
      </button>
    </li>
  );
}
