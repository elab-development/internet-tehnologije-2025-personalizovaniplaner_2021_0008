import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      <p>Welcome <b>{user.username}</b></p>

      <ul className="list-group mb-3">
        <li className="list-group-item">Manage Users</li>
        <li className="list-group-item">System Settings</li>
        <li className="list-group-item">Statistics</li>
      </ul>

      <button
        className="btn btn-danger"
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
