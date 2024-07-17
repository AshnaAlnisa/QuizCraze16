// src/components/Admin/QuizManagement.js

import React, { useState, useEffect } from 'react';
import QuizItem from '../Quiz/QuizItem';
import '../../styles/quizManagement.css';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [quizData, setQuizData] = useState({ title: '', description: '', questions: [] });
  const [questionData, setQuestionData] = useState({ text: '', options: '' });

  useEffect(() => {
    // Mock data fetching function (replace with actual API call)
    const fetchQuizzes = async () => {
      const mockQuizzes = [
        {
          id: 1,
          title: 'Quiz 1',
          description: 'Description of Quiz 1',
          questions: [
            {
              text: 'What is 2 + 2?',
              options: [
                { text: '3' },
                { text: '4' },
                { text: '5' },
              ],
            },
          ],
        },
      ];
      setQuizzes(mockQuizzes);
    };

    fetchQuizzes();
  }, []);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizData({ title: quiz.title, description: quiz.description, questions: quiz.questions });
    setIsEditing(true);
  };

  const handleDeleteQuiz = (quizId) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedQuizzes = quizzes.map(quiz =>
      quiz.id === selectedQuiz.id ? { ...quiz, ...quizData } : quiz
    );
    setQuizzes(updatedQuizzes);
    setIsEditing(false);
    setSelectedQuiz(null);
    setQuizData({ title: '', description: '', questions: [] });
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    const newQuiz = {
      id: quizzes.length + 1,
      title: quizData.title,
      description: quizData.description,
      questions: quizData.questions,
    };
    setQuizzes([...quizzes, newQuiz]);
    setQuizData({ title: '', description: '', questions: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const newQuestion = {
      text: questionData.text,
      options: questionData.options.split(',').map(option => ({ text: option.trim() })),
    };
    setQuizData({ ...quizData, questions: [...quizData.questions, newQuestion] });
    setQuestionData({ text: '', options: '' });
  };

  const handleEditQuestion = (quizId, questionIndex) => {
    const quiz = quizzes.find(q => q.id === quizId);
    const question = quiz.questions[questionIndex];
    const updatedQuestionText = prompt('Edit question text:', question.text);
    if (updatedQuestionText !== null) {
      quiz.questions[questionIndex].text = updatedQuestionText;
      setQuizzes([...quizzes]);
    }
  };

  const handleDeleteQuestion = (quizId, questionIndex) => {
    const quiz = quizzes.find(q => q.id === quizId);
    quiz.questions.splice(questionIndex, 1);
    setQuizzes([...quizzes]);
  };

  const handleEditOption = (quizId, questionIndex, optionIndex) => {
    const quiz = quizzes.find(q => q.id === quizId);
    const question = quiz.questions[questionIndex];
    const option = question.options[optionIndex];
    const updatedOptionText = prompt('Edit option text:', option.text);
    if (updatedOptionText !== null) {
      quiz.questions[questionIndex].options[optionIndex].text = updatedOptionText;
      setQuizzes([...quizzes]);
    }
  };

  const handleDeleteOption = (quizId, questionIndex, optionIndex) => {
    const quiz = quizzes.find(q => q.id === quizId);
    quiz.questions[questionIndex].options.splice(optionIndex, 1);
    setQuizzes([...quizzes]);
  };

  return (
    <div>
      <h2>Quiz Management</h2>
      {quizzes.map(quiz => (
        <QuizItem
          key={quiz.id}
          quiz={quiz}
          onEditQuiz={handleEditQuiz}
          onDeleteQuiz={handleDeleteQuiz}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
          onEditOption={handleEditOption}
          onDeleteOption={handleDeleteOption}
        />
      ))}

      <div className="form-container">
        <h3>{isEditing ? 'Edit Quiz' : 'Create Quiz'}</h3>
        <form onSubmit={isEditing ? handleSaveChanges : handleCreateQuiz}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={quizData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{isEditing ? 'Save Changes' : 'Create Quiz'}</button>
          {isEditing && <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>}
        </form>
      </div>

      <div className="form-container">
        <h3>Add Question</h3>
        <form onSubmit={handleAddQuestion}>
          <div>
            <label>Question Text:</label>
            <input
              type="text"
              name="text"
              value={questionData.text}
              onChange={handleQuestionChange}
            />
          </div>
          <div>
            <label>Options (comma separated):</label>
            <input
              type="text"
              name="options"
              value={questionData.options}
              onChange={handleQuestionChange}
            />
          </div>
          <button type="submit">Add Question</button>
        </form>
      </div>
    </div>
  );
};

export default QuizManagement;
