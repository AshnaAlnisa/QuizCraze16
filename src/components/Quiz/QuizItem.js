// src/components/Quiz/QuizItem.js

import React from 'react';

const QuizItem = ({ quiz, onEditQuiz, onDeleteQuiz, onEditQuestion, onDeleteQuestion, onEditOption, onDeleteOption }) => {
  return (
    <div className="quiz-item">
      <h3>{quiz.title}</h3>
      <p>Description: {quiz.description}</p>
      <button onClick={() => onEditQuiz(quiz)}>Edit Quiz</button>
      <button onClick={() => onDeleteQuiz(quiz.id)}>Delete Quiz</button>
      <ul>
        {quiz.questions.map((question, questionIndex) => (
          <li key={questionIndex}>
            <h4>Question {questionIndex + 1}:</h4>
            <p>{question.text}</p>
            <button onClick={() => onEditQuestion(quiz.id, questionIndex)}>Edit Question</button>
            <button onClick={() => onDeleteQuestion(quiz.id, questionIndex)}>Delete Question</button>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  {option.text}
                  <button onClick={() => onEditOption(quiz.id, questionIndex, optionIndex)}>Edit Option</button>
                  <button onClick={() => onDeleteOption(quiz.id, questionIndex, optionIndex)}>Delete Option</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizItem;
