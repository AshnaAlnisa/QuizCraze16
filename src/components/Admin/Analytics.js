// src/components/Admin/Analytics.js

import React, { useState, useEffect } from 'react';
import '../../styles/analytics.css';

const Analytics = () => {
  const [quizPerformance, setQuizPerformance] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [siteTraffic, setSiteTraffic] = useState([]);

  useEffect(() => {
    // Mock data fetching function (replace with actual API call)
    const fetchAnalyticsData = async () => {
      const mockQuizPerformance = [
        { quizId: 1, title: 'Quiz 1', averageScore: 75 },
        { quizId: 2, title: 'Quiz 2', averageScore: 85 },
        { quizId: 3, title: 'Quiz 3', averageScore: 65 },
      ];
      const mockUserActivity = [
        { userId: 1, username: 'User1', quizzesTaken: 5 },
        { userId: 2, username: 'User2', quizzesTaken: 3 },
        { userId: 3, username: 'User3', quizzesTaken: 8 },
      ];
      const mockSiteTraffic = [
        { date: '2024-07-01', visits: 150 },
        { date: '2024-07-02', visits: 200 },
        { date: '2024-07-03', visits: 250 },
      ];

      setQuizPerformance(mockQuizPerformance);
      setUserActivity(mockUserActivity);
      setSiteTraffic(mockSiteTraffic);
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>
      
      <section>
        <h3>Quiz Performance</h3>
        <table>
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Title</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {quizPerformance.map((quiz) => (
              <tr key={quiz.quizId}>
                <td>{quiz.quizId}</td>
                <td>{quiz.title}</td>
                <td>{quiz.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h3>User Activity</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Quizzes Taken</th>
            </tr>
          </thead>
          <tbody>
            {userActivity.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.quizzesTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h3>Site Traffic</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Visits</th>
            </tr>
          </thead>
          <tbody>
            {siteTraffic.map((traffic, index) => (
              <tr key={index}>
                <td>{traffic.date}</td>
                <td>{traffic.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Analytics;
