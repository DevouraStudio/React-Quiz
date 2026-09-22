import { use } from "react";

import { QuizContext } from "../../store/QuizContext";

import quizCompleteImage from "../../../public/assets/quiz-complete.png";
import questions from "../../questions";

import "./Results.css";

export default function Results() {
  const { results } = use(QuizContext);

  const skippedQuestions = results.filter(
    (result) => result.answer.text === undefined
  ).length;

  const correctQuestions = results.filter(
    (result) => result.answer.isCorrect
  ).length;

  const skippedPercentage = Math.floor(
    (skippedQuestions / results.length) * 100
  );

  const correctPercentage = Math.floor(
    (correctQuestions / results.length) * 100
  );

  const incorrectPercentage = 100 - (correctPercentage + skippedPercentage);

  return (
    <section id="summary">
      <img src={quizCompleteImage} alt="Quiz Cup" />
      <h2>Quiz completed!</h2>
      <section id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectPercentage}%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </section>
      <ol>
        {results.map((result, index) => {
          let answerClassName = "user-answer";

          if (result.answer.isCorrect) {
            answerClassName += " correct";
          } else if (result.answer.isCorrect === false) {
            answerClassName += " wrong";
          } else {
            answerClassName += " skipped";
          }

          return (
            <li key={result.question.id}>
              <h3>{index + 1}</h3>
              <p className="question">
                {!result.answer.text
                  ? `${result.question.text} (Skipped)`
                  : result.question.text}
              </p>
              <p className={answerClassName}>
                {result.answer.text
                  ? result.answer.text
                  : questions
                      .find((q) => q.id === result.question.id)
                      .answers.find((answer) => answer.isCorrect).text}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
