import { useState, useEffect, useRef, useCallback } from "react";

const useWebSocket = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const connectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      if (currentUser) {
        ws.current.send(JSON.stringify({ type: "login", username: currentUser.username, role: currentUser.role }));
      }
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "activeUsers") {
        setActiveUsers(message.users);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current.close();
    };
  }, [currentUser]); 

  useEffect(() => {
    if (currentUser) {
      connectWebSocket();
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [currentUser, connectWebSocket]);

  return activeUsers;
};

export default useWebSocket;
