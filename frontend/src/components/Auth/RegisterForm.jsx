import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { usersData } from "../../utils/data";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    if(!username || !email || !password){
      return alert('Please fill all the fields to register.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return alert("Please enter a valid email");
    }

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;
    if (!passwordRegex.test(password)) {
      return alert("Password must be at least 5 characters long, include at least one uppercase letter, one number, and one special character (!@#$%^&*)");
    }


    const existingUser = usersData.find(
      (u) => u.username === username || u.email === email
    );

    if (existingUser){
      return alert ('Username or email already exists.')
    }
    

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
        value = {username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleRegister}>
        Register
      </button>
    </>
  );
}

export default RegisterForm;
