import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/editProfile.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_id: '',
    username: '',
    name: '',
    email: '',
    address: '',
    picture: null
  });

  const [formEditable, setFormEditable] = useState(false); // State to toggle form editing
  const [fileInputVisible, setFileInputVisible] = useState(false); // State to toggle file input visibility

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userEmail = currentUser?.email;

      const response = await axios.post('http://localhost:5001/viewUsers', {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.replace(/^data:image\/[a-z]+;base64,/, '');
        setUser({ ...user, picture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setFormEditable(true);
    setFileInputVisible(true); // Show file input when editing starts
  };

  const handleUpdate = async () => {
    try {
      const updatedUserData = {
        eventID: "1001",
        addInfo: {
          user_id: user.user_id,
          username: user.username,
          name: user.name,
          email: user.email,
          address: user.address,
          picture: user.picture
        }
      };

      const response = await axios.post('http://localhost:5001/updateUser', updatedUserData);

      if (response.status === 200) {
        setFormEditable(false); // Set form to non-editable after successful update
        setFileInputVisible(false); // Hide file input after update
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <div className="profile-picture">
        <img src={`data:image/png;base64, ${user.picture}`} alt="Profile Image" />
        {formEditable && fileInputVisible && (
          <input type="file" accept="image/*" onChange={handleFileChange} />
        )}
      </div>
      <div className="profile-details">
        <label>Username:</label>
        <input type="text" name="username" value={user.username} readOnly={!formEditable} onChange={handleChange} />
        <label>Name:</label>
        <input type="text" name="name" value={user.name} readOnly={!formEditable} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={user.email} readOnly={!formEditable} onChange={handleChange} />
        <label>Address:</label>
        <textarea name="address" value={user.address} readOnly={!formEditable} onChange={handleChange} />
      </div>
      <div className="profile-actions">
        {!formEditable ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => {
              setFormEditable(false);
              setFileInputVisible(false);
            }}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
