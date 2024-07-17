import React, { useState } from 'react';
import QuizTimer from '../Quiz/QuizTimer';

const QuizTaking = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    // Start quiz logic here
    setQuizStarted(true);
  };

  const handleTimeOut = () => {
    // Handle time out logic here
    console.log('Time is up!');
    // Optionally, you can auto-submit quiz or take other actions.
  };

  return (
    <div>
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : (
        <div>
          <QuizTimer timeLimit={300} onTimeOut={handleTimeOut} />
          {/* Replace 300 with your quiz time limit in seconds */}
          {/* Other quiz components and logic */}
        </div>
      )}
    </div>
  );
};

export default QuizTaking;
