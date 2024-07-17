// src/components/Quiz/QuizList.js

import React, { useState, useEffect } from 'react';
import '../../styles/quizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Mock data fetching function (replace with actual API call)
    const fetchQuizzes = async () => {
      const mockQuizzes = [
        {
          id: 1,
          title: 'Quiz 1',
          description: 'Description of Quiz 1',
          questions: [
            { id: 1, question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
            { id: 2, question: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
          ]
        },
        {
          id: 2,
          title: 'Quiz 2',
          description: 'Description of Quiz 2',
          questions: [
            { id: 1, question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
            { id: 2, question: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
          ]
        },
        {
          id: 3,
          title: 'Quiz 3',
          description: 'Description of Quiz 3',
          questions: [
            { id: 1, question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
            { id: 2, question: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
          ]
        },
      ];
      setQuizzes(mockQuizzes);
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuiz) {
      // Start timer when quiz is selected
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        setTimer(Math.floor(elapsedTime / 1000)); // Update timer every second
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount or change
    }
  }, [selectedQuiz]);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedOptions({});
    setTimer(0); // Reset timer when starting a new quiz
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option,
    });
    console.log(`Selected option for question ${questionId}: ${option}`);
  };

  const renderQuizQuestions = (quiz) => (
    <div className="quiz-details">
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <div className="timer">Timer: {timer} seconds</div>
      <ul>
        {quiz.questions.map(q => (
          <li key={q.id}>
            <p>{q.question}</p>
            <ul>
              {q.options.map((option, index) => (
                <li
                  key={index}
                  className={selectedOptions[q.id] === option ? 'selected-option' : ''}
                  onClick={() => handleOptionSelect(q.id, option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={() => setSelectedQuiz(null)}>Back to Quizzes</button>
    </div>
  );

  return (
    <div className="quiz-list">
      <h2>Available Quizzes</h2>
      {!selectedQuiz ? (
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz.id}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <button onClick={() => handleStartQuiz(quiz)}>Start Quiz</button>
            </li>
          ))}
        </ul>
      ) : (
        renderQuizQuestions(selectedQuiz)
      )}
    </div>
  );
};

export default QuizList;
