import React, { useState, useEffect } from 'react';
import '../../styles/changePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password don't match.");
      return;
    }

    setError('');
    setSuccessMessage('');

    const requestData = {
      eventID: "1001",
      addInfo: {
        email,
        currentPassword,
        newPassword,
      },
    };

    try {
      const response = await fetch('http://localhost:5001/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.rStatus === 0) {
        setSuccessMessage(data.rData.rMessage);
      } else {
        alert(data.rData.rMessage);
      }

      setEmail('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert("An error occurred while changing the password.");
      console.error(err);
    }
  };

  return (
    <div className="changePassword-container">
      <h2 className="changePassword-title">Change Password</h2>
      {error && <div className="changePassword-error-message">{error}</div>}
      {successMessage && <div className="changePassword-success-message">{successMessage}</div>}
      <form className="changePassword-form" onSubmit={handleSubmit}>
        <div className="changePassword-form-group">
          <label className="changePassword-label">Email Id:</label>
          <input
            className="changePassword-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="changePassword-form-group">
          <label className="changePassword-label">Current Password:</label>
          <input
            className="changePassword-input"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="changePassword-form-group">
          <label className="changePassword-label">New Password:</label>
          <input
            className="changePassword-input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="changePassword-form-group">
          <label className="changePassword-label">Confirm New Password:</label>
          <input
            className="changePassword-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="changePassword-submit-button" type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
