import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("user");
    const savedToken = localStorage.getItem("authToken");
    if (saved) setUser(JSON.parse(saved));
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem("authToken", userData.token);
      setToken(userData.token);
    }
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
