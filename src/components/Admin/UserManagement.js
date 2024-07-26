import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/userManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [quizResults, setQuizResults] = useState({});
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isAdmin = currentUser?.isAdmin;
  const adminEmail = currentUser?.email;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:5001/viewUsers', { eventID: "1001" });
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.rData && responseData.rData.items) {
            // Filter out the admin user's profile if isAdmin is true
            const filteredUsers = responseData.rData.items.filter(user => !isAdmin || user.email !== adminEmail);
            setUsers(filteredUsers);
            console.log("Users:", filteredUsers);
          } else {
            console.log("No users data in response");
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [isAdmin, adminEmail]);

  const handleDelete = async (user_id) => {
    try {
      const response = await axios.post('http://localhost:5001/deleteUsers', {
        eventID: "1001",
        addInfo: {
          user_id: user_id
        }
      });

      console.log("Delete Response:", response.data); // Log the entire response

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          setUsers(users.filter(user => user.user_id !== user_id)); // Remove user from local state
          console.log(`User with ID ${user_id} deleted successfully`);
        } else {
          console.log("Failed to delete user");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleConfirmDelete = (index) => {
    setConfirmDelete(index);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleViewResults = async (email) => {
    try {
      const response = await axios.post('http://localhost:5001/viewResult', {
        eventID: "1001",
        addInfo: { email }
      });
  
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.items && responseData.rData.items.length > 0) {
          setQuizResults(prevState => ({
            ...prevState,
            [email]: responseData.rData.items
          }));
          setSelectedUserEmail(email);
          console.log(`Quiz Results for user ${email}:`, responseData.rData.items);
        } else {
          console.log(`No quiz results found for user ${email}`);
        }
      } else {
        console.log(`Failed to fetch quiz results for user ${email}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching quiz results for user ${email}:`, error);
    }
  };
  

  const handleHideResults = () => {
    setSelectedUserEmail(null);
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <React.Fragment key={user.user_id}>
              <tr>
                <td>
                  <img src={`data:image/png;base64, ${user.picture}`} alt="Profile Image" width={60} />
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  {confirmDelete === index ? (
                    <div>
                      <button className="delete-button" onClick={() => handleDelete(user.user_id)}>
                        Confirm Delete
                      </button>
                      <button className="delete-button" onClick={handleCancelDelete}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="delete-button" onClick={() => handleConfirmDelete(index)}>
                        Delete
                      </button>
                      {selectedUserEmail === user.email ? (
                        <button className="view-button" onClick={handleHideResults}>
                          Hide Results
                        </button>
                      ) : (
                        <button className="view-button" onClick={() => handleViewResults(user.email)}>
                          View Results
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
              {selectedUserEmail === user.email && (
                <tr>
                  <td colSpan="6">
                    <h3>Quiz Results for {user.name}</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Quiz</th>
                          <th>Correct Answers</th>
                          <th>Incorrect Answers</th>
                          <th>Score</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizResults[user.email]?.map((result, index) => (
                          <tr key={index}>
                            <td>{result.quiz_name}</td>
                            <td>{result.correct_answer}</td>
                            <td>{result.incorrect_answer}</td>
                            <td>{result.score}</td>
                            <td>{result.quiz_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
