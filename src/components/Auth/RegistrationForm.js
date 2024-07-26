import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/styles.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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

        // const userEmail = response.data.rData.email; // Adjust this according to actual response structure
        
        // console.log('User Email:', userEmail);


        // localStorage.setItem('currentUser', JSON.stringify({ email: userEmail }));

        navigate('/login'); // Redirect to dashboard after successful registration
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
      <button  type="submit">Register</button>
      <p>Already have an account?? Login here..</p>
      <button type='submit' onClick={navigateLogin}>Login</button>
    </form>
  );
};

export default RegisterForm;
