import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homePage.css';

const HomePage = () => (
  <div className="container1">
    <h1>Welcome to the Quiz App</h1>
    <p>This is a platform where you can take quizzes on various topics and track your progress.</p>
    <Link to="/login">
      <button className='login-btn'>Login</button>
    </Link>
    <Link to="/register">
      <button className='register-btn'>Register</button>
    </Link>
  </div>
);

export default HomePage;