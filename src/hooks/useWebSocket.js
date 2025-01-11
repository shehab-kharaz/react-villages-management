import { useState, useEffect, useRef, useCallback } from "react";

const useWebSocket = (setMessages, selectedUser) => {
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
        ws.current.send(
          JSON.stringify({ type: "login", username: currentUser.username, role: currentUser.role })
        );
      }
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "activeUsers") {
        setActiveUsers(message.users);
      } else if (message.type === "chat") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: message.from, to: message.to, message: message.text }
        ]);
      } else if (message.type === "history") {
        setMessages(message.messages);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current.close();
    };
  }, [currentUser, setMessages]);

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

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  const fetchChatHistory = useCallback(() => {
    if (selectedUser && currentUser) {
      ws.current.send(
        JSON.stringify({
          type: "fetchHistory",
          username: currentUser.username,
          with: selectedUser.username
        })
      );
    }
  }, [selectedUser, currentUser]); 

  useEffect(() => {
    if (selectedUser) {
      fetchChatHistory();
    }
  }, [selectedUser, fetchChatHistory]); 
  
  return { activeUsers, sendMessage };
};

export default useWebSocket;
