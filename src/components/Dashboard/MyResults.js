// src/components/Dashboard/MyResults.js

import React, { useEffect, useState } from 'react';

const MyResults = () => {
  // Mock quiz results data (replace with actual data fetching)
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // Example of fetching quiz results data (replace with your actual fetch logic)
    // Mock data for demonstration
    const mockResults = [
      { quizId: 1, quizName: 'Quiz 1', score: 80 },
      { quizId: 2, quizName: 'Quiz 2', score: 75 },
      { quizId: 3, quizName: 'Quiz 3', score: 90 },
    ];
    setQuizResults(mockResults);
  }, []);

  return (
    <div>
      <h2>My Results</h2>
      <table>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((result, index) => (
            <tr key={index}>
              <td>{result.quizName}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyResults;
