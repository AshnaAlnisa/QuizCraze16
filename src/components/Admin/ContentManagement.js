import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/contentManagement.css';

const ContentManagement = () => {
  const [quizCards, setQuizCards] = useState([]);
  const [newQuizCardTitle, setNewQuizCardTitle] = useState('');
  const [newQuizCardNoOfQuestions, setNewQuizCardNoOfQuestions] = useState('');
 const [maxValue, setMaxValue] = useState();

  const [questionSections, setQuestionSections] = useState([
    {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
    }
  ]);

  useEffect(() => {
    fetchQuizCards();
  }, []);

  const fetchQuizCards = async () => {
    try {
      const response = await axios.post('http://localhost:5164/viewCardQuiz',  { eventID: "1001" } );
      const data = response.data;
      if (data && data.rData && data.rData.items) {
        setQuizCards(data.rData.items);
      }
    } catch (error) {
      console.error('Error fetching quiz cards:', error);
    }
  };

  const handleAddQuizCard = async () => {
    try {
      const maxValue = Math.max(...quizCards.map(card => card.quiz_card_id));
      console.log('maxValue:::',maxValue)
      setMaxValue(maxValue);
      const addQuizCardResponse = await axios.post('http://localhost:5164/insertCardQuiz', {
        eventID: "1001",
        addInfo: {
          title: newQuizCardTitle,
          no_of_questions: newQuizCardNoOfQuestions
        }
      });

      console.log("Response from addQuizCard API:", addQuizCardResponse);

      const quizCardData = addQuizCardResponse.data;
      if (quizCardData && quizCardData.rData && quizCardData.rStatus === 0) {
        console.log('quizCardData::::::',quizCardData)
        console.log("Quiz card added successfully");

        const quiz_card_id = quizCardData.rData.quiz_card_id;

        // Update state with the new quiz card
        setQuizCards([...quizCards, { id: quiz_card_id, title: newQuizCardTitle, no_of_questions: newQuizCardNoOfQuestions }]);
        // Clear input fields
        setNewQuizCardTitle('');
        setNewQuizCardNoOfQuestions('');
        setQuestionSections([{
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: '',
        }]);
      } else {
        console.log("Failed to add quiz card:", quizCardData);
      }
    } catch (error) {
      console.error('Error adding quiz card:', error);
    }
  };

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestionSections = [...questionSections];
    newQuestionSections[index] = { ...newQuestionSections[index], [name]: value };
    setQuestionSections(newQuestionSections);
  };

  const handleAddMoreQuestions = () => {
    setQuestionSections([...questionSections, {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
    }]);
  };

  const handleDeleteQuestion = (index) => {
    if (questionSections.length > 1) {
      const newQuestionSections = questionSections.filter((_, i) => i !== index);
      setQuestionSections(newQuestionSections);
    }
  };

  const handleAddQuizQuestion = async (index, quiz_card_id) => {
    try {
      const questionData = questionSections[index];
      const addQuizResponse = await axios.post('http://localhost:5164/insertQuiz', {
        eventID: "1001",
        addInfo: {
          quiz_card_id: maxValue,
          question: questionData.question,
          option1: questionData.option1,
          option2: questionData.option2,
          option3: questionData.option3,
          option4: questionData.option4,
          correct_answer: questionData.correctAnswer
        }
      });

      console.log("Response from addQuiz API:", addQuizResponse);

      const quizData = addQuizResponse.data;
      if (quizData && quizData.rData && quizData.rStatus === 0) {
        console.log("Quiz added successfully");
      } else {
        console.log("Failed to add quiz:", quizData);
      }
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <div className="content-management-container">
      <h2 className="content-management-h2">Quiz Management</h2>

      <section className="content-management-section">
        <h3 className="content-management-h3">Add Quiz Card</h3>
        <input
          type="text"
          className="content-management-input"
          value={newQuizCardTitle}
          onChange={(e) => setNewQuizCardTitle(e.target.value)}
          placeholder="Quiz Card Title"
        />
        <input
          type="number"
          className="content-management-input"
          value={newQuizCardNoOfQuestions}
          onChange={(e) => setNewQuizCardNoOfQuestions(e.target.value)}
          placeholder="Number of Questions"
        />
        <button className="content-management-button" onClick={handleAddQuizCard}>Add Quiz Card</button>
      </section>

      <section className="content-management-section">
        <h3 className="content-management-h3">Add Quiz Questions</h3>
        {questionSections.map((section, index) => (
          <div key={index} className="content-management-question-section">
            <h4 className="content-management-h4">Question {index + 1}</h4>
            <input
              type="text"
              className="content-management-input"
              name="question"
              value={section.question}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Question"
            />
            <input
              type="text"
              className="content-management-input"
              name="option1"
              value={section.option1}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 1"
            />
            <input
              type="text"
              className="content-management-input"
              name="option2"
              value={section.option2}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 2"
            />
            <input
              type="text"
              className="content-management-input"
              name="option3"
              value={section.option3}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 3"
            />
            <input
              type="text"
              className="content-management-input"
              name="option4"
              value={section.option4}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 4"
            />
            <input
              type="text"
              className="content-management-input"
              name="correctAnswer"
              value={section.correctAnswer}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Correct Answer"
            />
            {questionSections.length > 1 && (
              <button className="content-management-button" onClick={() => handleDeleteQuestion(index)}>Delete Question</button>
            )}
            <button className="content-management-button" onClick={() => handleAddQuizQuestion(index, quizCards.length > 0 ? quizCards[quizCards.length - 1].id : null)}>Add Quiz Question</button>
          </div>
        ))}
        <button className="content-management-button" onClick={handleAddMoreQuestions}>Add More Questions</button>
      </section>

      <section className="content-management-section">
        <h3 className="content-management-h3">Current Quiz Cards</h3>
        <ul className="content-management-ul">
          {quizCards.map((quizCard, index) => (
            <li key={index} className="content-management-li">
              {quizCard.title} - {quizCard.no_of_questions} Questions
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ContentManagement;
