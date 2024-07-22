import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../../styles/quizList.css';
import Modal from './Modal.js';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    // Fetch all quiz cards when component mounts
    const fetchQuizCards = async () => {
      try {
        const response = await axios.post('http://localhost:5164/viewCardQuiz', { eventID: "1001" }); // Axios GET request
        const data = response.data;
        if (data && data.rData && data.rData.items) {
          setQuizzes(data.rData.items);
        }
      } catch (error) {
        console.error('Error fetching quiz cards:', error);
      }
    };

    fetchQuizCards();
  }, []);

  const handleStartQuiz = async (quizCardId) => {
    try {
      const response = await axios.post(`http://localhost:5164/viewQuizByQuizCardId`, {
        eventID: "1001",
        addInfo: { quiz_card_id: quizCardId } // Corrected to quiz_card_id
      });
  
      const data = response.data;
      if (data && data.rData && data.rData.items) {
        setSelectedQuiz({
          id: quizCardId,
          quizzes: data.rData.items
        });
        setSelectedOptions({});
        setTimer(0); // Reset timer when starting a new quiz
        setIsSubmitted(false); // Reset submission state
        setScore(0); // Reset score
        setShowModal(false); // Hide modal if open
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };
  

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option,
    });
    console.log(`Selected option for question ${questionId}: ${option}`);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuiz) {
      let newScore = 0;
      let correctCount = 0;
      let incorrectCount = 0;
      selectedQuiz.quizzes.forEach(question => {
        if (selectedOptions[question.quiz_id] === question.correct_answer) {
          newScore += 1;
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }
      });
      setScore(newScore);
      setCorrectAnswers(correctCount);
      setIncorrectAnswers(incorrectCount);
      setIsSubmitted(true);
      setShowModal(true); // Show modal when quiz is submitted
    }
  };

  const [user, setUser] = useState({
    user_id: '',
    username: '',
    name: '',
    email: '',
    address: '',
    picture: null
  });
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userEmail = currentUser?.email;

      const response = await axios.post('http://localhost:5164/viewUsers', {
        eventID: "1001",
        addInfo: { email: userEmail }
      });

      const userData = response.data.rData?.items || [];
      const foundUser = userData.find(user => user.email === userEmail);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('User data does not match logged-in user');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderQuizQuestions = (quizCard) => (
    <div className="quiz-details">
      <h3>{quizCard.title}</h3>
      <p>{quizCard.no_of_questions}</p>
      <div className="timer">Timer: {timer} seconds</div>
      <ul>
        {quizCard.quizzes.map(q => (
          <li key={q.quiz_id}>
            <p>{q.question}</p>
            <ul>
              {[q.option1, q.option2, q.option3, q.option4].map((option, index) => {
                let className = '';
                if (isSubmitted) {
                  if (option === q.correct_answer) {
                    className = 'correct-option';
                  } else if (selectedOptions[q.quiz_id] === option) {
                    className = 'incorrect-option';
                  }
                } else if (selectedOptions[q.quiz_id] === option) {
                  className = 'selected-option';
                }
                return (
                  <li
                    key={index}
                    className={className}
                    onClick={() => handleOptionSelect(q.quiz_id, option)}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitQuiz}>Submit</button>
      <button onClick={() => setSelectedQuiz(null)}>Back to Quizzes</button>
      
    </div>
  );

  return (
    <div className="quiz-list">
      <h2>Available Quizzes</h2>
      {!selectedQuiz ? (
        <ul>
          {quizzes.map(quizCard => (
            <li key={quizCard.quiz_card_id}>
              <h3>{quizCard.title}</h3>
              <p>Total Questions : {quizCard.no_of_questions}</p>
              <button onClick={() => handleStartQuiz(quizCard.quiz_card_id)}>Start Quiz</button>
            </li>
          ))}
        </ul>
      ) : (
        renderQuizQuestions(selectedQuiz)
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        score={score}
        userId={user.user_id}           
        quizCardId={selectedQuiz ? selectedQuiz.id : null} 
      />
      
    </div>
  );
};

export default QuizList;
