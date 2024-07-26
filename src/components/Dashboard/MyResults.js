import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userEmail = currentUser?.email;
        setUserEmail(userEmail); // Set userEmail state for later use

        const response = await axios.post('http://localhost:5001/viewResult', {
          eventID: "1001",
          addInfo: { email: userEmail }
        });

        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.rData && responseData.rData.items) {
            setQuizResults(responseData.rData.items);
            console.log("Quiz Results:", responseData.rData.items);
          } else {
            console.log("No quiz results data in response");
          }
        }
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    fetchQuizResults();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>My Quiz Results</h2>
      <p>Email: {userEmail}</p>
      <table>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Correct Answers</th>
            <th>Incorrect Answers</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((result, index) => (
            <tr key={index}>
              <td>{result.quiz_name}</td>
              <td>{result.correct_answer}</td>
              <td>{result.incorrect_answer}</td>
              <td>{result.score}</td>
              <td>{result.quiz_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizResults;
