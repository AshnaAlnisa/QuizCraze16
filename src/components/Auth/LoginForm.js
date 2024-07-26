import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/styles.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventID: "1001",
      addInfo: {
        email: email,
        password: password
      }
    };

    try {
      const response = await axios.post('http://localhost:5001/myLogin', payload);

      console.log('API Response:', response); // Log the entire response for debugging

      let res = response.data.rData.rMessage;
      if (res === "Signin Successful") {
        const token = response.data.rData.TOKEN;
        const userEmail = response.data.rData.email; // Adjust this according to actual response structure
        const isAdmin = response.data.rData.isAdmin;
        console.log('User Email:', userEmail); // Log the userEmail to verify
        
        // Store token and userEmail in localStorage
        localStorage.setItem('currentUser', JSON.stringify({ token, email: userEmail, isAdmin }));
        
        console.log('Stored in localStorage:', localStorage.getItem('currentUser')); // Verify what's stored
        if(isAdmin) {
          navigate('/admin');
        }else{
          navigate('/dashboard');
        }
        
      } else {
        alert(response.data.rData.rMessage);
        // Clear form inputs on incorrect login
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <p>Doesn't have account? Register here..</p>
      <button type='submit' onClick={navigateRegister}>Register</button>
    </form>
  );
};

export default LoginForm;
