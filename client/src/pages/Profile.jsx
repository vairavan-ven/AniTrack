import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me;

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
      
    </div>
  );
};

export default Profile;
