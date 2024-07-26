import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    };

    try {
      const response = await axios.post('http://localhost:5001/insertContactUs', payload);
      let res = response.data.rData.rMessage;
      console.log(response.data, 'api response');
      if (res === "Successful") {
        alert(res);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        alert(res);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again later.');
    }
  };

  return (
    <div className="changePassword-container">
      <h2 className="changePassword-title">Leave Your Ideas</h2>
      <form className="changePassword-form" onSubmit={handleSubmit}>
        <div className="changePassword-form-group">
          <label className="changePassword-label">Name:</label>
          <input
            className="changePassword-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="changePassword-form-group">
          <label className="changePassword-label">Email:</label>
          <input
            className="changePassword-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="changePassword-form-group">
          <label className="changePassword-label">Message:</label>
          <textarea
            className="changePassword-input"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <button className="changePassword-submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
