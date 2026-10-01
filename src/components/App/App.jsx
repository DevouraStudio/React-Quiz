import QuizContextProvider from "../../store/QuizContext";
import QuizContent from "../QuizContent/QuizContent";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <QuizContextProvider>
        <QuizContent />
      </QuizContextProvider>
    </div>
  );
}
