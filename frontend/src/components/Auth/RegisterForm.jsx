import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [adresa, setAdresa] = useState("");
  const [telefon, setTelefon] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(!ime || !prezime || !email || !adresa || !telefon || !lozinka){
      return alert('Please fill all the fields to register.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("The email entered is not valid.");
    }

    if (lozinka.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }

    const phoneRegex = /^06\d{7,8}$/;
    if (!phoneRegex.test(telefon)) {
      return alert("The phone number should start with 06 and have 9 to 10 digits total.");
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/kupci/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          ime,
          prezime,
          email,
          adresa,
          telefon,
          lozinka
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

      if (!response.ok) {
        return alert("Registration failed. Please check your details.");
      }

      if (!data?.kupac || !data?.token) {
        return alert("Unexpected response from server.");
      }

      //uloguje korisnika cim se registruje
      login({
        id: data.kupac.id,
        email: data.kupac.email,
        ime: data.kupac.ime,
        prezime: data.kupac.prezime,
        token: data.token,
        role: "user"
      });

      navigate("/profile");
    } catch (error) {
      console.error('Registration error:', error);
      alert("Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Registration</h2>
      <input
        className="form-control mb-3"
        placeholder="First Name"
        value={ime}
        onChange={(e) => setIme(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Last Name"
        value={prezime}
        onChange={(e) => setPrezime(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Address"
        value={adresa}
        onChange={(e) => setAdresa(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Phone"
        value={telefon}
        onChange={(e) => setTelefon(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={lozinka}
        onChange={(e) => setLozinka(e.target.value)}
      />
      <button 
        className="btn btn-primary w-100" 
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </>
  );
}

export default RegisterForm;
