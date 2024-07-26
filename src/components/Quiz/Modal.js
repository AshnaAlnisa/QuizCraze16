import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, correctAnswers, incorrectAnswers, score, userId, quizCardId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const fetchCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCurrentDate();
    }
  }, [isOpen]);

  const handleInsertResult = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5001/insertResult', {
        eventID: "1001",
        addInfo: {
          user_id: userId,
          quiz_card_id: quizCardId,
          correct_answer: correctAnswers,
          incorrect_answer: incorrectAnswers,
          score: score * 10,
          quiz_date: currentDate // Include current date in the request
        }
      });

      console.log("Response from insertResult API:", response);

      const data = response.data;
      if (data && data.rData && data.rMessage === "Successful") {
        console.log("Result inserted successfully");
      } else {
        console.log("Failed to insert result:", data);
        setSubmitError("Failed to insert result");
      }
    } catch (error) {
      console.error('Error inserting result:', error);
      setSubmitError("Failed to insert result");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const handleCloseModal = () => {
    handleInsertResult(); // Insert result before closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Quiz Results</h2>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
        <p>Your Score: {score * 10}</p>
        {/* {submitError && <p className="error-message">{submitError}</p>} */}
        <button onClick={handleCloseModal} disabled={isSubmitting}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
