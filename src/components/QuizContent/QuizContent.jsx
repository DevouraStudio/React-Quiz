import { use } from "react";

import { QuizContext } from "../../store/QuizContext";

import QuizBox from "../QuizBox/QuizBox";
import Results from "../Results/Results";

import "./QuizContent.css";

export default function QuizContent() {
  const { appStatus, onStartQuiz } = use(QuizContext);

  let content;

  if (appStatus.quiz && !appStatus.results) {
    content = <QuizBox />;
  } else if (!appStatus.quiz && appStatus.results) {
    content = <Results />;
  } else {
    content = (
      <button id="start-btn" onClick={onStartQuiz}>
        Start The Quiz
      </button>
    );
  }

  return content;
}
