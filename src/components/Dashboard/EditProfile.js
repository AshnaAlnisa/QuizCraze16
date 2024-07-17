import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/editProfile.css';

const EditProfile = () => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    name: '',
    email: '',
    address: '',
    picture: null // Assuming picture is stored as a file object
  });

  const [editing, setEditing] = useState(false); // State to toggle editing mode
  const [fileInput, setFileInput] = useState(null); // State to manage file input

  useEffect(() => {
    fetchUserData();
  }, []);

  const [loading, setLoading] = useState(false);

const fetchUserData = async () => {
  setLoading(true);
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
  } finally {
    setLoading(false);
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
        setFileInput(reader.result); // Store the Base64 string
      };
  
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };
  

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('eventID', "1001"); // Include eventID
      formData.append('id', user.id);
      formData.append('username', user.username);
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('address', user.address);
      
      if (fileInput) {
        formData.append('picture', fileInput);
      }
  
      const response = await axios.post('http://localhost:5164/updateUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Update Response:', response.data);
      setEditing(false);
      
      // Optionally fetch updated user data to reflect changes
      fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <div className="profile-picture">
        <img src={user.picture} alt="Profile image" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="profile-details">
        <label>Username:</label>
        <input type="text" name="username" value={user.username} readOnly={!editing} onChange={handleChange} />
        <label>Name:</label>
        <input type="text" name="name" value={user.name} readOnly={!editing} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={user.email} readOnly={!editing} onChange={handleChange} />
        <label>Address:</label>
        <textarea name="address" value={user.address} readOnly={!editing} onChange={handleChange} />
      </div>
      <div className="profile-actions">
        {!editing ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
