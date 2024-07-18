import React, { useState, useEffect } from 'react';
import '../../styles/userManagement.css';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchUsers1 = async () => {
      try {
        const response = await axios.post('http://localhost:5164/viewUsers', { eventID: "1001" });
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.rData && responseData.rData.items) {
            setUsers(responseData.rData.items);
            console.log("Users:", responseData.rData.items);
          } else {
            console.log("No users data in response");
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers1();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost:5164/deleteUsers', {
        eventID: "1001",
        addInfo: {
          id: id
        }
      });

      console.log("Delete Response:", response.data); // Log the entire response

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          setUsers(users.filter(user => user.id !== id)); // Remove user from local state
          console.log(`User with ID ${id} deleted successfully`);
        } else {
          console.log("Failed to delete user");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmDelete !== null) {
      handleDelete(users[confirmDelete].id);
      setConfirmDelete(null); // Reset confirmation state
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null); // Reset confirmation state
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
              <img src={`data:image/png;base64, ${user.picture}`} alt="Profile Image" width={60} />
              </td>
              <td>
                {confirmDelete === index ? (
                  <div>
                    <button className="delete-button" onClick={handleConfirmDelete}>
                      Confirm Delete
                    </button>
                    <button className="delete-button" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="delete-button" onClick={() => setConfirmDelete(index)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
