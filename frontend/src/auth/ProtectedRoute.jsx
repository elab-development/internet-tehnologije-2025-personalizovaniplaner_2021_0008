import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role){
    if(role === 'admin') return <Navigate to = '/'/>;
    return <Navigate to = '/profile'/>
  }

  return children;
}

export default ProtectedRoute;
