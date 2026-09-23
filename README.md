# React-Quiz
 
A timed, multiple-choice quiz application built with React that tests users on React.js fundamentals. Questions are presented one at a time with a countdown timer, answers are shuffled on each load, and a detailed results screen breaks down performance at the end.
 
## Table of Contents
 
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [State Management](#state-management)
- [Component Reference](#component-reference)
- [Question Data Format](#question-data-format)
- [Styling](#styling)
- [Available Scripts](#available-scripts)
- [Possible Improvements](#possible-improvements)
## Features
 
- **7 timed questions** covering core React.js concepts (what React is, JSX, components, hooks, etc.).
- **10-second countdown per question**, visualized with an animated progress bar.
- **Shuffled answer order** — each question's answers are randomized every time it's presented, using a Fisher–Yates shuffle.
- **Instant visual feedback** — after selecting an answer, the button is highlighted green (correct) or red (incorrect) for a short pause before advancing.
- **Auto-skip on timeout** — if no answer is selected before time runs out, the question is recorded as skipped and the quiz automatically advances.
- **Centralized state via React Context** — a single `QuizContext` tracks the current question, timer, selected answer, quiz status, and accumulated results, avoiding prop drilling.
- **Results summary screen** showing:
  - Percentage of questions answered correctly
  - Percentage answered incorrectly
  - Percentage skipped
  - A full per-question review listing the question text, your answer (or "Skipped"), and the correct answer where relevant.
## Tech Stack
 
| Category | Technology |
|---|---|
| UI library | React 19 |
| Tooling | Create React App (`react-scripts` 5) |
| Type definitions | `@types/react`, `@types/react-dom`, TypeScript 5.7 (types only; components are written in `.jsx`) |
| Utilities | `uuid` — generates unique IDs for answer options |
| Linting | ESLint (`.eslintrc.json`) |
 
## Project Structure
 
```
React-Quiz/
├── public/
│   ├── index.html
│   └── assets/
│       ├── quiz-logo.png
│       └── quiz-complete.png
├── src/
│   ├── components/
│   │   ├── App/
│   │   │   ├── App.jsx          # Root component; wraps everything in QuizContextProvider
│   │   │   └── App.css
│   │   ├── QuizContent/
│   │   │   ├── QuizContent.jsx  # Decides whether to show Start button, QuizBox, or Results
│   │   │   └── QuizContent.css
│   │   ├── QuizBox/
│   │   │   ├── QuizBox.jsx      # Renders the active question, drives the timer/advance logic
│   │   │   └── QuizBox.css
│   │   ├── Answer/
│   │   │   ├── Answer.jsx       # A single answer button; handles selected/correct/wrong styling
│   │   │   └── Answer.css
│   │   ├── Progress/
│   │   │   └── Progress.jsx     # Countdown progress bar for the current question
│   │   └── Results/
│   │       ├── Results.jsx      # Final results screen with stats and per-question review
│   │       └── Results.css
│   ├── store/
│   │   └── QuizContext.jsx      # Context provider holding all shared quiz state and handlers
│   ├── questions.js             # Question bank (7 questions, each with 4 answers)
│   ├── index.js                 # App entry point
│   └── styles.css               # Global styles
├── .eslintrc.json
├── .gitignore
└── package.json
```
 
## Getting Started
 
**Prerequisites:** Node.js and npm installed locally.
 
```bash
# 1. Clone the repository
git clone https://github.com/DevouraStudio/React-Quiz.git
cd React-Quiz
 
# 2. Install dependencies
npm install
 
# 3. Start the development server
npm start
```
 
The app will be available at `http://localhost:3000`.
 
## How It Works
 
1. **Start screen** — On load, `QuizContent` shows a single "Start The Quiz" button (no question or results state is active yet).
2. **Question phase** — Clicking start loads the first question into `QuizContext` with a 10,000ms timer and shuffled answers.
3. **Answering** —
   - If you click an answer, it's recorded, the timer is compressed to 1,000ms to show a brief "selected" state, then to 2,000ms to reveal whether it was correct or incorrect (green/red).
   - If time runs out with no selection, the question is logged as skipped (with `answer.text` left undefined) and the app moves straight to the 2,000ms "reveal" phase.
4. **Advancing** — Once the reveal phase elapses, the app either loads the next question (with a fresh shuffle and a reset 10-second timer) or, if it was the last question, switches `appStatus` to show the results screen.
5. **Results screen** — `Results` reads the full `results` array, calculates percentages for correct / incorrect / skipped, and lists every question with the answer given and the correct answer (shown only when the question was missed or skipped).
## State Management
 
All shared state lives in `QuizContext` (`src/store/QuizContext.jsx`), created with `createContext` and provided via `QuizContextProvider`. Key pieces of state:
 
| State | Purpose |
|---|---|
| `currentQuestion` | The active question's text, shuffled answers, selected answer, timer duration, index, and id |
| `remainingTime` | Ticks down every 10ms to drive the progress bar |
| `appStatus` | `{ quiz: boolean, results: boolean }` — controls which screen `QuizContent` renders |
| `results` | Array accumulating `{ question, answer }` for every question answered or skipped |
 
Key handlers exposed through context:
 
- `shuffleArray(arr)` — Fisher–Yates shuffle used to randomize answer order per question.
- `onAnswerClick(answer)` — records the selected answer into `results` and compresses the timer to trigger the feedback phase.
- `onStartQuiz()` — flips `appStatus` to begin the quiz.
The countdown and phase transitions are driven by two effects in `QuizBox`: a `setInterval` that decrements `remainingTime` every 10ms, and a `setTimeout` (keyed off `time`) that handles the selected → reveal → next-question state machine described above.
 
## Component Reference
 
- **`App`** — Mounts `QuizContextProvider` around `QuizContent`; the composition root of the app.
- **`QuizContent`** — Pure routing component: renders the start button, `QuizBox`, or `Results` based on `appStatus`.
- **`QuizBox`** — The main quiz screen. Owns the timing logic (via `useEffect`), renders the question text, the `Progress` bar, and a list of `Answer` buttons.
- **`Answer`** — A single answer button. Computes its own visual state (`selected`, `correct`, `wrong`) from context and disables itself once an answer has been chosen for the current question.
- **`Progress`** — An HTML `<progress>` element bound to `remainingTime` / `time`, giving a shrinking bar as the countdown runs out.
- **`Results`** — Computes skipped/correct/incorrect percentages from the `results` array and renders a scoreboard plus a full answer-by-answer breakdown.
## Question Data Format
 
Questions live in `src/questions.js` as a plain array. Each question has a unique `id`, `text`, and an `answers` array where each answer has a `uuid()`-generated `id`, `text`, and an `isCorrect` boolean:
 
```js
{
  id: "q1",
  text: "Which of the following definitions best describes React.js?",
  answers: [
    { id: uuid(), text: "A library to build user interfaces with help of declarative code.", isCorrect: true },
    { id: uuid(), text: "A library for managing state in web applications.", isCorrect: false },
    // ...
  ],
}
```
 
Adding a new question is as simple as appending another object with this shape — no other code changes are required.
 
## Styling
 
Each component has a co-located `.css` file (e.g. `Answer.css`, `QuizBox.css`) rather than a single global stylesheet, alongside one shared `styles.css` for base/app-wide styles. Visual states (selected, correct, wrong, answered) are applied via conditional class names rather than inline styles.
 
## Available Scripts
 
Standard Create React App scripts, defined in `package.json`:
 
| Script | Description |
|---|---|
| `npm start` | Runs the app in development mode with hot reloading |
| `npm run build` | Bundles the app for production into the `build/` folder |
| `npm test` | Runs the test runner (`react-scripts test`) in jsdom mode |
| `npm run eject` | Ejects from Create React App's managed configuration (irreversible) |
 
## Possible Improvements
 
- Persist high scores or past attempts (e.g. via `localStorage`).
- Load questions from an external API or JSON file instead of a hardcoded array.
- Add unit tests for the timer/state-machine logic in `QuizBox`.
- Allow configuring the number of questions or timer duration.