import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Component/context/Authcontext"; // Import Auth context

const ProtectedRoute = ({ children,requiredRole }) => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const token = localStorage.getItem("token"); // Check authentication token
    const role = localStorage.getItem("role"); // Get user role

    // If no token is found, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If the user is an admin, allow access
   // If a requiredRole is provided and the user's role doesn't match, redirect to dashboard (or any other default page)
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

    // If the user is not an admin but authenticated, allow access
    return children;
};

export default ProtectedRoute;
