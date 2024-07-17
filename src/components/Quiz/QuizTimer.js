// src/components/Quiz/QuizTimer.js

import React, { useState, useEffect } from 'react';

const QuizTimer = ({ timeLimit, onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clear interval and trigger onTimeOut when time runs out
    if (timeLeft === 0) {
      clearInterval(timer);
      onTimeOut();
    }

    // Cleanup function
    return () => clearInterval(timer);
  }, [timeLeft, onTimeOut]);

  // Convert seconds to MM:SS format for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="quiz-timer">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default QuizTimer;
