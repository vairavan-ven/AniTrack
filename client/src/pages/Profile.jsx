import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { CHANGE_USERNAME, DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME);
  const [newUsername, setNewUsername] = useState(''); // State to hold new username input
  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const [changeUsername] = useMutation(CHANGE_USERNAME); // Mutation hook
  const [deleteUser] = useMutation(DELETE_USER); // Mutation hook for deleting user

  const user = data?.me;

  // Function to handle username change
  const handleChangeUsername = async () => {
    try {
      // Call the mutation function with the new username
      await changeUsername({
        variables: { newUsername },
      });
      // Optionally handle success
      setSuccessMessage('Username changed successfully!');
      setErrorMessage('');
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to change username. Please try again.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    try {
      // Call the mutation function to delete the user
      await deleteUser();
      // Optionally handle success
      setSuccessMessage('Account deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to delete account. Please try again.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    // If user is not logged in, redirect to login page or display a message
    return <Navigate to="/login" />;
  }

  if (!user) {
    // Handle case where user data is not available
    return <div>User data not found.</div>;
  }

  if (userParam && user.username !== userParam) {
    // Handle case where user is trying to access another user's profile
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      {/* Success message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {/* Error message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* Form for changing username */}
      <div>
        <input
          type="text"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <button
          onClick={handleChangeUsername}
          style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Change Username
        </button>
      </div>
      {/* Button to delete the user account */}
      <div>
        <button
          onClick={handleDeleteUser}
          style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
