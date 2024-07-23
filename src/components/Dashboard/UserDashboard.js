import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../Auth/ChangePassword';
import Leaderboard from '../Dashboard/Leaderboard';
import MyResults from '../Dashboard/MyResults';
import EditProfile from '../Dashboard/EditProfile';
import ContactUs from '../Dashboard/ContactUs';
import QuizList from '../Quiz/QuizList';
import axios from 'axios';
import '../../styles/userDashboard.css';
const quizzes = [
  { id: 1, title: 'Quiz 1', description: 'Description for Quiz 1' },
  { id: 2, title: 'Quiz 2', description: 'Description for Quiz 2' },
  { id: 3, title: 'Quiz 3', description: 'Description for Quiz 3' }
];

const UserDashboardPage = () => {
  const [activeSection, setActiveSection] = useState('allQuizzes'); // Default active section
  const [user, setUser] = useState({
    user_id: '',
    username: '',
    name: '',
    email: '',
    address: '',
    picture: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userEmail = currentUser?.email;

      const response = await axios.post('http://localhost:5164/viewUsers', {
        eventID: "1001",
        addInfo: { email: userEmail }
      });

      const userData = response.data.rData?.items || [];
      const foundUser = userData.find(user => user.email === userEmail);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('User data does not match logged-in user');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('currentUser')).token;

      const response = await axios.post('http://localhost:5164/logout', {
        eventID: '1001',
        addInfo: {
          TOKEN: token,
        },
      });

      if (response.data.rData.rMessage === 'Logout successful') {
        localStorage.removeItem('currentUser');
        navigate('/');
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred. Please try again.');
    }
  };

  let curDate = new Date();
  curDate = curDate.getHours(); 
  let greeting = "";
  if(curDate >= 1 && curDate <12){
    greeting = "Good Morning !";
  }else if(curDate >= 12 && curDate < 16)
  {
    greeting = "Good Afternoon!";
  }else{
    greeting = "Good Evening!"
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'changePassword':
        return <ChangePassword />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'myResults':
        return <MyResults />;
      case 'editProfile':
        return <EditProfile />;
      case 'ContactUs':
        return <ContactUs />;
      case 'allQuizzes':
        return <QuizList quizzes={quizzes} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="left-content">
          <div className="dashboard-links">
            <h2>Dashboard Navigation</h2>
            <ul>
              <li><button className={activeSection === 'allQuizzes' ? 'active' : ''} onClick={() => handleNavigation('allQuizzes')}>All Quizzes</button></li>
              <li><button className={activeSection === 'myResults' ? 'active' : ''} onClick={() => handleNavigation('myResults')}>My Results</button></li>
              <li><button className={activeSection === 'leaderboard' ? 'active' : ''} onClick={() => handleNavigation('leaderboard')}>Leaderboard</button></li>
              <li><button className={activeSection === 'changePassword' ? 'active' : ''} onClick={() => handleNavigation('changePassword')}>Change Password</button></li>
              <li><button className={activeSection === 'editProfile' ? 'active' : ''} onClick={() => handleNavigation('editProfile')}>Edit Profile</button></li>
              <li><button className={activeSection === 'ContactUs' ? 'active' : ''} onClick={() => handleNavigation('ContactUs')}>Contact Us</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
        <div className="right-content">
          <h1>Hello {user.name}, {greeting}</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
