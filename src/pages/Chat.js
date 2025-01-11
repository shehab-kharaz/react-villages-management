import React, { useState, useEffect } from "react";
import useWebSocket from "../hooks/useWebSocket";
import "../styles/chat.css";

const Chat = () => {
  const imgSrc = "https://via.placeholder.com/50x50.png?text=Image";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); 
  const [message, setMessage] = useState(""); 
  const [messages, setMessages] = useState([]); 

  const { activeUsers, sendMessage } = useWebSocket(setMessages, selectedUser);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]); 
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      sendMessage({
        type: "chat",
        to: selectedUser.username,
        from: currentUser.username,
        message,
      });
      setMessages((prev) => [
        ...prev,
        { from: currentUser.username, to: selectedUser.username, message },
      ]);
      setMessage(""); 
    }
  };

  const filteredUsers = activeUsers
    .filter((user) => user.username !== JSON.parse(localStorage.getItem("user"))?.username)
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (!selectedUser) return;

    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer?.scrollTo(0, messagesContainer.scrollHeight);
  }, [messages, selectedUser]);


  return (
    <main>
      <h1>Chat</h1>

      <input
        type="text"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="available-users-container">
        <h3>Available Users</h3>
        <div className="available-users-list">
          {filteredUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="user-container"
                onClick={() => handleUserClick(user)}
              >
                <img src={imgSrc} alt={user.username} />
                <span>{user.username}</span>
                <span>{user.role}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedUser && (
        <div className="chat-window">
          <h3>Chat with: {selectedUser.username}</h3>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.from === JSON.parse(localStorage.getItem("user")).username
                    ? "sent"
                    : "received"
                }`}
              >
                <span>{msg.from === JSON.parse(localStorage.getItem("user")).username ? "You: " : msg.from + ": "}{msg.message}</span>
              </div>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </main>
  );
};

export default Chat;
