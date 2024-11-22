import { Navigate } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage';
import { isLoggedIn } from '../auth';  // assuming isLoggedIn returns the logged-in user object with a role property
import AdminDashboard from './AdminDashboard';
import Attendance from '../pages/Attendance';
import UserDashboard from './UserDashboard';

const ProtectedRoute = ({ children }) => {
  const user = isLoggedIn()?.user;

  if (!user) {
    return <Navigate to="/error" />;
  }

  // Check user's role to determine the appropriate dashboard
  if (user.role === "Admin") {
    return <AdminDashboard />;
  } else if (user.role === "Employee") {
    return <UserDashboard />;
  } else {
    return <ErrorPage />;
  }
};

export default ProtectedRoute

