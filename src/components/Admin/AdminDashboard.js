// src/components/Admin/AdminDashboard.js

import React, { useState } from 'react';
import UserManagement from './UserManagement';
import QuizManagement from './QuizManagement';
import Analytics from './Analytics';
import ContentManagement from './ContentManagement';
import '../../styles/adminDashboard.css';
import ContactUsFormDetails from './ContactUsFormDetails';

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

  return (
    <div className="container">
      <div className="dashboard">
        <div className="left-content">
          <div className="dashboard-links">
            <h2>Admin Dashboard</h2>
            <ul>
              <li><button onClick={() => setActiveSection('userManagement')}>User Management</button></li>
              <li><button onClick={() => setActiveSection('quizManagement')}>Quiz Management</button></li>
              <li><button onClick={() => setActiveSection('analytics')}>Analytics</button></li>
              <li><button onClick={() => setActiveSection('contactusFormDetails')}>Contact Us Form Details</button></li>
              <li><button onClick={() => setActiveSection('contentManagement')}>Content Management</button></li>
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

export default AdminDashboard;
