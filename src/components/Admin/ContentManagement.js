import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/contentManagement.css';

const ContentManagement = () => {
  const [quizCards, setQuizCards] = useState([]);
  const [newQuizCardTitle, setNewQuizCardTitle] = useState('');
  const [newQuizCardNoOfQuestions, setNewQuizCardNoOfQuestions] = useState('');

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOption1, setNewOption1] = useState('');
  const [newOption2, setNewOption2] = useState('');
  const [newOption3, setNewOption3] = useState('');
  const [newOption4, setNewOption4] = useState('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('');

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
        for (let i = 0; i < questions.length; i++) {
          const questionData = questions[i];
          const addQuizResponse = await axios.post('http://localhost:5164/insertQuiz', {
            eventID: "1001",
            addInfo: {
              quiz_card_id: quiz_card_id,
              ...questionData
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
        setQuestions([]);
        setNewQuestion('');
        setNewOption1('');
        setNewOption2('');
        setNewOption3('');
        setNewOption4('');
        setNewCorrectAnswer('');
      } else {
        console.log("Failed to add quiz card:", quizCardData);
      }
    } catch (error) {
      console.error('Error adding quiz card and quiz:', error);
    }
  };

  const handleAddQuestion = () => {
    const newQuestionData = {
      question: newQuestion,
      option1: newOption1,
      option2: newOption2,
      option3: newOption3,
      option4: newOption4,
      correct_answer: newCorrectAnswer
    };
    setQuestions([...questions, newQuestionData]);
    // Clear input fields after adding question
    setNewQuestion('');
    setNewOption1('');
    setNewOption2('');
    setNewOption3('');
    setNewOption4('');
    setNewCorrectAnswer('');
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
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Question"
        />
        <input
          type="text"
          value={newOption1}
          onChange={(e) => setNewOption1(e.target.value)}
          placeholder="Option 1"
        />
        <input
          type="text"
          value={newOption2}
          onChange={(e) => setNewOption2(e.target.value)}
          placeholder="Option 2"
        />
        <input
          type="text"
          value={newOption3}
          onChange={(e) => setNewOption3(e.target.value)}
          placeholder="Option 3"
        />
        <input
          type="text"
          value={newOption4}
          onChange={(e) => setNewOption4(e.target.value)}
          placeholder="Option 4"
        />
        <input
          type="text"
          value={newCorrectAnswer}
          onChange={(e) => setNewCorrectAnswer(e.target.value)}
          placeholder="Correct Answer"
        />
        <button onClick={handleAddQuestion}>Add Question</button>
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

      <section>
        <h3>Current Questions</h3>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              Question: {question.question}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ContentManagement;
