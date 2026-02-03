import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="profile-admin-container">
      <h2>User Profile</h2>
      <div className="info-box">
        <span>Username:</span>
        <span>{user.username}</span>
      </div>
      <div className="info-box">
        <span>Email:</span>
        <span>{user.email}</span>
      </div>
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

export default Profile;
