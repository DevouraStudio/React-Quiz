import { v4 as uuid } from "uuid";

export default [
  {
    id: "q1",
    text: "Which of the following definitions best describes React.js?",
    answers: [
      {
        id: uuid(),
        text: "A library to build user interfaces with help of declarative code.",
        isCorrect: true,
      },
      {
        id: uuid(),
        text: "A library for managing state in web applications.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "A framework to build user interfaces with help of imperative code.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "A library used for building mobile applications only.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q2",
    text: "What purpose do React hooks serve?",
    answers: [
      {
        id: uuid(),
        text: "Enabling the use of state and other React features in functional components.",
        isCorrect: true,
      },
      {
        id: uuid(),
        text: "Creating responsive layouts in React applications.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "Handling errors within the application.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "Part of the Redux library for managing global state.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q3",
    text: "Can you identify what JSX is?",
    answers: [
      {
        id: uuid(),
        text: "A JavaScript extension that adds HTML-like syntax to JavaScript.",
        isCorrect: true,
      },
      {
        id: uuid(),
        text: "A JavaScript library for building dynamic user interfaces.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "A specific HTML version that was explicitly created for React.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "A tool for making HTTP requests in a React application.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q4",
    text: "What is the most common way to create a component in React?",
    answers: [
      {
        id: uuid(),
        text: "By defining a JavaScript function that returns a renderable value.",
        isCorrect: true,
      },
      {
        id: uuid(),
        text: "By defining a custom HTML tag in JavaScript.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "By creating a file with a .jsx extension.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: 'By using the "new" keyword followed by the component name.',
        isCorrect: false,
      },
    ],
  },
  {
    id: "q5",
    text: 'What does the term "React state" imply?',
    answers: [
      {
        id: uuid(),
        text: "An object in a component that holds values and may cause the component to render on change.",
        isCorrect: true,
      },
      {
        id: uuid(),
        text: "The lifecycle phase a React component is in.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "The overall status of a React application, including all props and components.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "A library for managing global state in React applications.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q6",
    text: "How do you typically render list content in React apps?",
    answers: [
      {
        id: uuid(),
        text: "By using the map() method to iterate over an array of data and returning JSX.",
        isCorrect: true,
      },
      {
        id: uuid(),
        text: "By using the for() loop to iterate over an array of data and returning JSX.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "By using the forEach() method to iterate over an array of data and returning JSX.",
        isCorrect: false,
      },
      {
        id: uuid(),
        text: "By using the loop() method to iterate over an array of data and returning JSX.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q7",
    text: "Which approach can NOT be used to render content conditionally?",
    answers: [
      { id: uuid(), text: "Using a the #if template syntax.", isCorrect: true },
      { id: uuid(), text: "Using a ternary operator.", isCorrect: false },
      { id: uuid(), text: "Using the && operator.", isCorrect: false },
      { id: uuid(), text: "Using an if-else statement.", isCorrect: false },
    ],
  },
];
