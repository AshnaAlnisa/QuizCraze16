// src/components/Admin/AdminDashboard.js

import React, { useState } from 'react';
import UserManagement from './UserManagement';
import QuizManagement from './QuizManagement';
import Analytics from './Analytics';
import ContentManagement from './ContentManagement';
import ContactUsFormDetails from './ContactUsFormDetails';
import '../../styles/adminDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'userManagement':
        return <UserManagement />;
      case 'quizManagement':
        return <QuizManagement />;
      case 'analytics':
        return <Analytics />;
      case 'contactusFormDetails':
        return <ContactUsFormDetails />;
      case 'contentManagement':
        return <ContentManagement />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('currentUser')).token;

      // Make API call to logout endpoint
      const response = await axios.post('http://localhost:5001/logout', {
        eventID: '1001', // Assuming eventID is required by your API
        addInfo: {
          TOKEN: token,
        },
      });

      // Assuming API response indicates successful logout
      if (response.data.rData.rMessage === 'Logout successful') {
        localStorage.removeItem('currentUser'); // Clear token from localStorage
        navigate('/'); // Redirect to login page after logout
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
            <h2>Admin Dashboard</h2>
            <ul>
              <li>
                <button
                  className={activeSection === 'userManagement' ? 'active' : ''}
                  onClick={() => setActiveSection('userManagement')}
                >
                  User Management
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'quizManagement' ? 'active' : ''}
                  onClick={() => setActiveSection('quizManagement')}
                >
                  Quiz Management
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'contentManagement' ? 'active' : ''}
                  onClick={() => setActiveSection('contentManagement')}
                >
                  Add Quizzes
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'analytics' ? 'active' : ''}
                  onClick={() => setActiveSection('analytics')}
                >
                  Analytics
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'contactusFormDetails' ? 'active' : ''}
                  onClick={() => setActiveSection('contactusFormDetails')}
                >
                  Contact Us Form Details
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
