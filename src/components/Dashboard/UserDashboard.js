// src/pages/UserDashboardPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from '../Auth/ChangePassword'; // Path to ChangePassword component
import Leaderboard from '../Dashboard/Leaderboard';
import MyResults from '../Dashboard/MyResults';
import EditProfile from '../Dashboard/EditProfile';
import ContactUs from '../Dashboard/ContactUs';
import QuizList from '../Quiz/QuizList';
import '../../styles/styles.css';
import axios from 'axios';

// Assume you have quiz data
const quizzes = [
  { id: 1, title: 'Quiz 1', description: 'Description for Quiz 1' },
  { id: 2, title: 'Quiz 2', description: 'Description for Quiz 2' },
  { id: 3, title: 'Quiz 3', description: 'Description for Quiz 3' },
  // Add more quizzes as needed
];

const UserDashboardPage = () => {
  const [activeSection, setActiveSection] = useState(null); // Default active section

  const renderContent = () => {
    switch (activeSection) {
      case 'changePassword':
        return <ChangePassword />; // Render ChangePassword component
      case 'leaderboard':
        return <Leaderboard />; // Example placeholder
      case 'myResults':
        return <MyResults />; // Example placeholder
      case 'editProfile':
        return <EditProfile />;
      case 'ContactUs':
        return <ContactUs />;
      case 'allQuizzes':
        return <QuizList quizzes={quizzes} />;
      // Add cases for other features as needed
      default:
        return null;
    }
  };

  const handleNavigation = (section) => {
    setActiveSection(section); // Set the active section
  };

const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('currentUser')).token;

      // Make API call to logout endpoint
      const response = await axios.post('http://localhost:5164/logout', {
        eventID: '1001', // Assuming eventID is required by your API
        addInfo: {
          TOKEN: token,
        },
      });

      // Assuming API response indicates successful logout
      if (response.data.rData.rMessage === 'Logout successful') {
        localStorage.removeItem('currentUser'); // Clear token from localStorage
        navigate('/login'); // Redirect to login page after logout
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="left-content">
          <div className="dashboard-links">
            <h2>Dashboard Navigation</h2>
            <ul>
              <li><button onClick={() => handleNavigation('allQuizzes')}>All Quizzes</button></li>
              <li><button onClick={() => handleNavigation('myResults')}>My Results</button></li>
              <li><button onClick={() => handleNavigation('leaderboard')}>Leaderboard</button></li>
              <li><button onClick={() => handleNavigation('changePassword')}>Change Password</button></li>
              <li><button onClick={() => handleNavigation('editProfile')}>Edit Profile</button></li>
              <li><button onClick={() => handleNavigation('ContactUs')}>Contact Us</button></li>
              
              {/* Add more navigation items as necessary */}
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
        <div className="right-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;


