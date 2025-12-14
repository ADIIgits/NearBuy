import { createContext, useState, useEffect } from "react";
import api from "../services/api";

// Create context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session on refresh
  useEffect(() => {
    api.get("/auth/session")
      .then(res => setUser(res.data.user))
      .catch(() => {});
  }, []);

  const login = (userdata) => setUser(userdata);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  console.log("AuthContext user:", user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
