import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Hook to use AuthContext easily
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Setup Axios instance
  const api = axios.create({
    baseURL: "https://slotswapper-1-y3k3.onrender.com/api/v1",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // Fetch user info when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/getUser");
        setUser(res.data);
      } catch (err) {
        console.error("Invalid token or fetch error:", err.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      return true;
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register function
  const register = async (fullName, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", {
        fullName,
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      return true;
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, api, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
