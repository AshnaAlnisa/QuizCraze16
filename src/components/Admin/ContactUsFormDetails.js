import React, { useEffect, useState } from 'react';
import '../../styles/contactusFormDetails.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactUsFormDetails = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate(); // Corrected naming convention

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post('http://localhost:5001/viewContactUs', { eventID: "1001" });
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost:5001/deleteContactUs', {
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
    <div className="contact-us-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.message}</td>
              <td>
                {confirmDelete === id ? (
                  <div>
                    <button className="delete-button" onClick={handleConfirmDelete}>
                      Confirm Delete
                    </button>
                    <button className="delete-button" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="delete-button" onClick={() => setConfirmDelete(id)}>
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

export default ContactUsFormDetails;
