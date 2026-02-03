import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      role: "user",
    };

    login(newUser);
    navigate("/profile");
  };

  return (
    <>
      <h2>Registration</h2>
      <input
        className="form-control mb-3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleRegister}>
        Register
      </button>
    </>
  );
}

export default RegisterForm;
