// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const HomePage = () => (
  <div className="container">
    <h1>Welcome to the Quiz App</h1>
    <p>This is a platform where you can take quizzes on various topics and track your progress.</p>
    <Link to="/login">
      <button>Login</button>
    </Link>
    <Link to="/register">
      <button>Register</button>
    </Link>
  </div>
);

export default HomePage;
