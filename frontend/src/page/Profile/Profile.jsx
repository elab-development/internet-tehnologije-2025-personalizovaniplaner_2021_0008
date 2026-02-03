import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
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

export default Profile;
