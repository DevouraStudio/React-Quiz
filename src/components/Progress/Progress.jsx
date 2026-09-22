import { use } from "react";

import { QuizContext } from "../../store/QuizContext";

export default function Progress() {
  const { time, remainingTime } = use(QuizContext);
  return (
    <progress
      value={remainingTime}
      max={time}
      className={time === 1000 ? "answered" : undefined}
    >
      Question time
    </progress>
  );
}
