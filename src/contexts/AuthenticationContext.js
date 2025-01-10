
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]); 
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "login", username: userData.username }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "userList") {
        setActiveUsers(data.users); 
      }
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    setSocket(ws);
  };

  const logout = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: "logout", username: user.username }));
      socket.close();
      setSocket(null);
    }
    setUser(null);
    setActiveUsers([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, activeUsers }}>
      {children}
    </AuthContext.Provider>
  );
};