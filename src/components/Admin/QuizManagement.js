import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/quizManagement.css';

const QuizManagement = () => {
  const [quizCards, setQuizCards] = useState([]);
  const [selectedQuizCard, setSelectedQuizCard] = useState(null);
  const [quizCardTitle, setQuizCardTitle] = useState('');
  const [quizCardNoOfQuestions, setQuizCardNoOfQuestions] = useState('');

  useEffect(() => {
    fetchQuizCards();
  }, []);

  const fetchQuizCards = async () => {
    try {
      const response = await axios.post('http://localhost:5164/viewCardQuiz', { eventID: "1001" });
      const data = response.data;
      if (data && data.rData && data.rData.items) {
        setQuizCards(data.rData.items);
      }
    } catch (error) {
      console.error('Error fetching quiz cards:', error);
    }
  };

  const handleDeleteQuizCard = async (quizCardId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this quiz card?');
      if (confirmDelete) {
        const response = await axios.post('http://localhost:5164/deleteCardQuiz', {
          eventID: "1001",
          addInfo: { quiz_card_id: quizCardId }
        });
        const data = response.data;
        if (data && data.rMessage === "Successful") {
          setQuizCards(quizCards.filter(card => card.quiz_card_id !== quizCardId));
          setSelectedQuizCard(null); // Clear selected quiz card after deletion
        } else {
          console.error('Failed to delete quiz card:', data);
        }
      }
    } catch (error) {
      console.error('Error deleting quiz card:', error);
    }
  };

  const handleEditQuizCard = async (quizCardId) => {
    try {
      const response = await axios.post('http://localhost:5164/viewQuizByQuizCardId', {
        eventID: "1001",
        addInfo: { quiz_card_id: quizCardId }
      });
      const data = response.data;
      if (data && data.rData && data.rData.items) {
        setSelectedQuizCard({
          id: quizCardId,
          quizzes: data.rData.items
        });
        // Populate quiz card title and number of questions for editing
        const selectedCard = quizCards.find(card => card.quiz_card_id === quizCardId);
        if (selectedCard) {
          setQuizCardTitle(selectedCard.title);
          setQuizCardNoOfQuestions(selectedCard.no_of_questions);
        }
      } else {
        console.error('Failed to fetch quiz card details for editing');
      }
    } catch (error) {
      console.error('Error editing quiz card:', error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedQuizCard(null);
    setQuizCardTitle('');
    setQuizCardNoOfQuestions('');
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post('http://localhost:5164/updateCardQuiz', {
        eventID: "1001",
        addInfo: {
          quiz_card_id: selectedQuizCard.id,
          title: quizCardTitle,
          no_of_questions: quizCardNoOfQuestions
        }
      });
      const data = response.data;
      if (data && data.rMessage === "Successful") {
        // Update quiz card in state
        setQuizCards(quizCards.map(card => {
          if (card.quiz_card_id === selectedQuizCard.id) {
            return {
              ...card,
              title: quizCardTitle,
              no_of_questions: quizCardNoOfQuestions
            };
          }
          return card;
        }));
        setSelectedQuizCard(null);
        setQuizCardTitle('');
        setQuizCardNoOfQuestions('');
      } else {
        console.error('Failed to update quiz card:', data);
      }
    } catch (error) {
      console.error('Error updating quiz card:', error);
    }
  };

  const handleOptionChange = (quizId, option) => {
    setSelectedQuizCard({
      ...selectedQuizCard,
      quizzes: selectedQuizCard.quizzes.map(quiz => {
        if (quiz.quiz_id === quizId) {
          return {
            ...quiz,
            [option.type]: option.value
          };
        }
        return quiz;
      })
    });
  };

  return (
    <div className="quiz-management">
      <h2>Quiz Management</h2>
      <div className="quiz-cards">
        {quizCards.map(quizCard => (
          <div key={quizCard.quiz_card_id} className="quiz-card">
            <h3>{quizCard.title}</h3>
            <p>Total Questions: {quizCard.no_of_questions}</p>
            <div className="card-actions">
              <button onClick={() => handleEditQuizCard(quizCard.quiz_card_id)}>Edit</button>
              <button onClick={() => handleDeleteQuizCard(quizCard.quiz_card_id)}>Delete</button>
            </div>
            {selectedQuizCard && selectedQuizCard.id === quizCard.quiz_card_id && (
              <div className="edit-quiz-card">
                <input
                  type="text"
                  value={quizCardTitle}
                  onChange={(e) => setQuizCardTitle(e.target.value)}
                  placeholder="Quiz Card Title"
                />
                <input
                  type="number"
                  value={quizCardNoOfQuestions}
                  onChange={(e) => setQuizCardNoOfQuestions(e.target.value)}
                  placeholder="Number of Questions"
                />
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleCancelEdit}>Cancel</button>
                <h4>Edit Questions:</h4>
                {selectedQuizCard.quizzes.map(quiz => (
                  <div key={quiz.quiz_id} className="edit-question">
                    <p>Question: {quiz.question}</p>
                    <input
                      type="text"
                      value={quiz.option1}
                      onChange={(e) => handleOptionChange(quiz.quiz_id, { type: 'option1', value: e.target.value })}
                    />
                    <input
                      type="text"
                      value={quiz.option2}
                      onChange={(e) => handleOptionChange(quiz.quiz_id, { type: 'option2', value: e.target.value })}
                    />
                    <input
                      type="text"
                      value={quiz.option3}
                      onChange={(e) => handleOptionChange(quiz.quiz_id, { type: 'option3', value: e.target.value })}
                    />
                    <input
                      type="text"
                      value={quiz.option4}
                      onChange={(e) => handleOptionChange(quiz.quiz_id, { type: 'option4', value: e.target.value })}
                    />
                    <input
                      type="text"
                      value={quiz.correct_answer}
                      onChange={(e) => handleOptionChange(quiz.quiz_id, { type: 'correct_answer', value: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizManagement;
