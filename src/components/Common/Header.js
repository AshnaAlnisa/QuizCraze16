// src/components/Common/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css';

const Header = () => (
  <header>
    <div className="logo">Quiz App</div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
