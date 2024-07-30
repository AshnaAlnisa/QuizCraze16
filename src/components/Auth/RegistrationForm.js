import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/styles.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState(''); // New state for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return; // Prevent form submission if passwords do not match
    }

    setError(''); // Clear previous errors

    const payload = {
      eventID: "1001",
      addInfo: {
        username: username,
        email: email,
        password: password,
        captcha: captcha
      }
    };

    try {
      // Make POST request to register endpoint
      const response = await axios.post('http://localhost:5001/register', payload);

      console.log('Registration Response:', response.data);

      // Handle response based on API result
      if (response.data.rData.rMessage === 'Signup Successful') {
        localStorage.setItem('currentUser', JSON.stringify({ username, email }));

        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert(response.data.rData.rMessage); // Alert user about registration failure
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again.'); // Alert user about generic error
    }
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="captcha">Captcha</label>
        <input
          type="text"
          id="captcha"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          required
        />
        <p>Enter "1234" as the captcha</p> {/* Simulated captcha for demo purposes */}
      </div>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <button type="submit">Register</button>
      <p>Already have an account? Login here..</p>
      <button type="submit" onClick={navigateLogin}>Login</button>
    </form>
  );
};

export default RegisterForm;
