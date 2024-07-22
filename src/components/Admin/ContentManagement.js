import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/contentManagement.css';

const ContentManagement = () => {
  const [quizCards, setQuizCards] = useState([]);
  const [newQuizCardTitle, setNewQuizCardTitle] = useState('');
  const [newQuizCardNoOfQuestions, setNewQuizCardNoOfQuestions] = useState('');
  
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
      const response = await axios.get('http://localhost:5164/viewCardQuiz', { eventID: "1001" });
      const data = response.data;
      if (data && data.rData && data.rData.items) {
        setQuizCards(data.rData.items);
      }
    } catch (error) {
      console.error('Error fetching quiz cards:', error);
    }
  };

  const handleAddQuizAndCard = async () => {
    try {
      // Add quiz card first
      const addQuizCardResponse = await axios.post('http://localhost:5164/insertCardQuiz', {
        eventID: "1001",
        addInfo: {
          title: newQuizCardTitle,
          no_of_questions: newQuizCardNoOfQuestions
        }
      });

      console.log("Response from addQuizCard API:", addQuizCardResponse);

      const quizCardData = addQuizCardResponse.data;
      if (quizCardData && quizCardData.rData && quizCardData.rMessage === "Successful") {
        console.log("Quiz card added successfully");

        // Then add questions
        const quiz_card_id = quizCardData.rData.quiz_card_id;
        for (let i = 0; i < questionSections.length; i++) {
          const questionData = questionSections[i];
          const addQuizResponse = await axios.post('http://localhost:5164/insertQuiz', {
            eventID: "1001",
            addInfo: {
              quiz_card_id: quiz_card_id,
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
          if (quizData && quizData.rData && quizData.rMessage === "Successful") {
            console.log("Quiz added successfully");
          } else {
            console.log("Failed to add quiz:", quizData);
            return; // Exit loop if adding quiz fails
          }
        }

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
      console.error('Error adding quiz card and quiz:', error);
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

  return (
    <div className="content-management-container">
      <h2>Quiz Management</h2>

      <section>
        <h3>Add Quiz Card and Quiz Questions</h3>
        <input
          type="text"
          value={newQuizCardTitle}
          onChange={(e) => setNewQuizCardTitle(e.target.value)}
          placeholder="Quiz Card Title"
        />
        <input
          type="number"
          value={newQuizCardNoOfQuestions}
          onChange={(e) => setNewQuizCardNoOfQuestions(e.target.value)}
          placeholder="Number of Questions"
        />
        {questionSections.map((section, index) => (
          <div key={index} className="question-section">
            <h4>Question {index + 1}</h4>
            <input
              type="text"
              name="question"
              value={section.question}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Question"
            />
            <input
              type="text"
              name="option1"
              value={section.option1}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 1"
            />
            <input
              type="text"
              name="option2"
              value={section.option2}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 2"
            />
            <input
              type="text"
              name="option3"
              value={section.option3}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 3"
            />
            <input
              type="text"
              name="option4"
              value={section.option4}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Option 4"
            />
            <input
              type="text"
              name="correctAnswer"
              value={section.correctAnswer}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Correct Answer"
            />
            {questionSections.length > 1 && (
              <button onClick={() => handleDeleteQuestion(index)}>Delete Question</button>
            )}
          </div>
        ))}
        <button onClick={handleAddMoreQuestions}>Add More Questions</button>
        <button onClick={handleAddQuizAndCard}>Add Quiz and Quiz Card</button>
      </section>

      <section>
        <h3>Current Quiz Cards</h3>
        <ul>
          {quizCards.map((quizCard, index) => (
            <li key={index}>
              {quizCard.title} - {quizCard.no_of_questions} Questions
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ContentManagement;
