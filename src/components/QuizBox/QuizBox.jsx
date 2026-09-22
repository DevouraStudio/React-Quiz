import { useEffect, use } from "react";

import questions from "../../questions";
import Answer from "../Answer/Answer";
import Progress from "../Progress/Progress";

import { QuizContext } from "../../store/QuizContext";

import "./QuizBox.css";

export default function QuizBox() {
  const {
    text,
    answers,
    time,
    index,
    results,
    id,
    shuffleArray,
    setCurrentQuestion,
    setRemainingTime,
    setAppStatus,
    setResults,
  } = use(QuizContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (time === 1000) {
        setCurrentQuestion((prevStatus) => ({
          ...prevStatus,
          time: 2000,
        }));
        setRemainingTime(2000);
      } else if (time === 2000) {
        const nextQuestionIndex = index + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestion((preStatus) => ({
            text: questions[nextQuestionIndex].text,
            answers: shuffleArray(questions[nextQuestionIndex].answers),
            time: 10000,
            index: nextQuestionIndex,
            id: questions[nextQuestionIndex].id,
          }));
        } else {
          setAppStatus((prevStatus) => ({ quiz: false, results: true }));
        }
        setRemainingTime(10000);
      } else {
        setCurrentQuestion((prevStatus) => ({
          ...prevStatus,
          selectedAnswer: undefined,
          time: 2000,
        }));
        setRemainingTime(2000);
        setResults((prevResults) => [
          ...prevResults,
          {
            question: { text: text, id: id },
            answer: { id: undefined, text: undefined, isCorrect: undefined },
          },
        ]);
      }
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="quiz">
      <section id="question">
        <Progress />
        <h2>{text}</h2>
        <menu id="answers">
          {answers.map((answer) => {
            return <Answer key={answer.id} answer={answer} />;
          })}
        </menu>
      </section>
    </div>
  );
}
