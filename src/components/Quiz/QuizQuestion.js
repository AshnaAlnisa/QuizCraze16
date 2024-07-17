// Example in src/components/Quiz/QuizQuestion.js

import React, { useState, useEffect } from 'react';
import QuizTimer from './QuizTimer'; // Import the QuizTimer component
import '../../styles/quizQuestion.css';

const QuizQuestion = ({ question, options, onOptionSelect }) => {
  // State to manage timer
  const [timeLeft, setTimeLeft] = useState(300); // Example initial time in seconds (300 seconds = 5 minutes)

  // Effect to update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up timer
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="quiz-question">
      <QuizTimer timeLeft={timeLeft} />
      <h4>{question}</h4>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => onOptionSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
