import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password){
        return alert('Please fill in all fields!');
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          email: email,
          lozinka: password
        })
      });

      const contentType = response.headers.get("content-type") || "";
      let data = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = text ? { message: text } : null;
      }

      if (!response.ok || !data?.user || !data?.token || !data?.role) {
        return alert("Wrong email or password!");
      }

      login({
        id: data.user.id,
        email: data.user.email,
        ime: data.user.ime,
        prezime: data.user.prezime,
        username: data.user.korisnickoIme,
        token: data.token,
        role: data.role
      });

      navigate(data.role === "admin" ? "/admin" : "/profile");
    } catch (error) {
      console.error('Login error:', error);
      alert("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <input
        className="form-control mb-3"
        placeholder="Email"
        type="email"
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
      <button 
        className="btn btn-primary w-100" 
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </>
  );
}

export default LoginForm;
