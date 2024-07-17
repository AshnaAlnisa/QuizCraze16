// src/components/Dashboard/Leaderboard.js

import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  // Mock leaderboard data (replace with actual data fetching)
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Example of fetching leaderboard data (replace with your actual fetch logic)
    // Mock data for demonstration
    const mockData = [
      { username: 'User1', score: 100 },
      { username: 'User2', score: 95 },
      { username: 'User3', score: 90 },
      { username: 'User4', score: 85 },
      { username: 'User5', score: 80 },
    ];
    setLeaderboardData(mockData);
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
