import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../Navbar';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state or spinner while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Render child routes if authenticated
  return <>
  <Navbar />
  <div className='pt-16'>
  <Outlet />
  </div>
  </>;
};

export default ProtectedRoute;