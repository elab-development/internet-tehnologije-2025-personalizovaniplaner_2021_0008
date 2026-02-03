import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";


function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if(!user || user.role !== 'admin'){
    return <Navigate to = '/' />;
  }

  return (
    <div className="profile-admin-container">
      <h2>Admin Panel</h2>
      <p>Welcome <b>{user.username}</b></p>

      <ul className="list-group mb-3">
        <li className="list-group-item">Manage Users</li>
        <li className="list-group-item">Something</li>
        <li className="list-group-item">Something</li>
      </ul>

      <button
        className="btn-logout"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminPanel;
