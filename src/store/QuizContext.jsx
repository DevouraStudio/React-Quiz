import { useState, createContext } from "react";

import questions from "../questions";

export const QuizContext = createContext({
  text: "",
  answers: [],
  selectedAnswer: null,
  time: 0,
  index: 0,
  remainingTime: 0,
  appStatus: {},
  results: [],
  id: "",
  shuffleArray: () => {},
  setCurrentQuestion: () => {},
  setRemainingTime: () => {},
  setAppStatus: () => {},
  setResults: () => {},
  onAnswerClick: () => {},
  onStartQuiz: () => {},
});

export default function QuizContextProvider({ children }) {
  function shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
  const [currentQuestion, setCurrentQuestion] = useState({
    text: questions[0].text,
    answers: shuffleArray(questions[0].answers),
    selectedAnswer: null,
    time: 10000,
    index: 0,
    id: questions[0].id,
  });

  const [remainingTime, setRemainingTime] = useState(currentQuestion.time);

  const [appStatus, setAppStatus] = useState({ quiz: false, results: false });

  const [results, setResults] = useState([]);

  const handleAnswerClick = (answer) => {
    setCurrentQuestion((prevStatus) => ({
      ...prevStatus,
      selectedAnswer: answer,
      time: 1000,
    }));
    setRemainingTime(1000);
    setResults((prevResults) => [
      ...prevResults,
      {
        question: {
          text: currentQuestion.text,
          id: currentQuestion.id,
        },
        answer: answer,
        id: currentQuestion.id,
      },
    ]);
  };

  const handleStartQuiz = () =>
    setAppStatus((prevStatus) => ({ quiz: true, results: false }));

  const contextValue = {
    text: currentQuestion.text,
    answers: currentQuestion.answers,
    selectedAnswer: currentQuestion.selectedAnswer,
    time: currentQuestion.time,
    index: currentQuestion.index,
    remainingTime: remainingTime,
    appStatus: appStatus,
    results: results,
    id: currentQuestion.id,
    shuffleArray: shuffleArray,
    setCurrentQuestion: setCurrentQuestion,
    setRemainingTime: setRemainingTime,
    setAppStatus: setAppStatus,
    setResults: setResults,
    onAnswerClick: handleAnswerClick,
    onStartQuiz: handleStartQuiz,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}
