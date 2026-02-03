import { useState } from "react";
import { usersData } from "../../utils/data";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if(!username || !password){
        return alert('Please fill in all fields!');
    }

    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return alert("Wrong username or password!");

    login(user);
    navigate(user.role === "admin" ? "/admin" : "/profile");
  };

  return (
    <>
      <h2>Login</h2>
      <input
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Login
      </button>
    </>
  );
}

export default LoginForm;
