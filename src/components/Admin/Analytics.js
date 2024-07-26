import React, { useState, useEffect } from 'react';
import '../../styles/analytics.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [quizPerformance, setQuizPerformance] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [quizPerformanceResponse, userActivityResponse] = await Promise.all([
          axios.post('http://localhost:5001/viewQuizPerformance', { eventID: "1001" }),
          axios.post('http://localhost:5001/viewUserActivity', { eventID: "1001" })
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

  // Prepare data for charts
  const quizPerformanceData = {
    labels: quizPerformance.map(quiz => quiz.quiz_title),
    datasets: [{
      label: 'Total plays of the quiz',
      data: quizPerformance.map(quiz => quiz.times_played),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const userActivityData = {
    labels: userActivity.map(user => user.username),
    datasets: [{
      label: 'Total Quizzes Taken',
      data: userActivity.map(user => user.total_quizzes_taken),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h3>Quiz Performance</h3>
            <Bar data={quizPerformanceData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Quiz Performance'
                },
                legend: {
                  position: 'top',
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }} />
          </section>

          <section>
            <h3>User Activity</h3>
            <Bar data={userActivityData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'User Activity'
                },
                legend: {
                  position: 'top',
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }} />
          </section>
        </>
      )}
    </div>
  );
};

export default Analytics;
