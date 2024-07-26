import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/viewLeaderboard', { eventID: "1001" });
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.rData && responseData.rData.items) {
            setLeaderboardData(responseData.rData.items);
            console.log("Leaderboard Data:", responseData.rData.items);
          } else {
            console.log("No leaderboard data in response");
          }
        } else {
          console.log("Failed to fetch leaderboard data - status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Name</th>
            <th>Quiz Title</th>
            <th>Score</th>
            {/* <th>Date</th> */}
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.quiz_title}</td>
              <td>{user.score}</td>
              {/* <td>{user.quiz_date}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
