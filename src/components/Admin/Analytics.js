import React, { useState, useEffect } from 'react';
import '../../styles/analytics.css';
import axios from 'axios';

const Analytics = () => {
  const [quizPerformance, setQuizPerformance] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [quizPerformanceResponse, userActivityResponse] = await Promise.all([
          axios.post('http://localhost:5164/viewQuizPerformance', { eventID: "1001"  }),
          axios.post('http://localhost:5164/viewUserActivity', { eventID: "1001"  })
        ]);

        if (quizPerformanceResponse.data.rData && quizPerformanceResponse.data.rData.items) {
          setQuizPerformance(quizPerformanceResponse.data.rData.items);
        }

        if (userActivityResponse.data.rData && userActivityResponse.data.rData.items) {
          setUserActivity(userActivityResponse.data.rData.items);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h3>Quiz Performance</h3>
            <table>
              <thead>
                <tr>
                  <th>Quiz ID</th>
                  <th>Title</th>
                  <th>Total plays of the quiz</th>
                </tr>
              </thead>
              <tbody>
                {quizPerformance.map((quiz) => (
                  <tr key={quiz.quiz_id}>
                    <td>{quiz.quiz_id}</td>
                    <td>{quiz.quiz_title}</td>
                    <td>{quiz.times_played}</td>
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
                  <th>Total Quizzes Taken</th>
                </tr>
              </thead>
              <tbody>
                {userActivity.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.username}</td>
                    <td>{user.total_quizzes_taken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
};

export default Analytics;
