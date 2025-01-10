import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import "../styles/chat.css";

const Chat = () => {
  const imgSrc = "https://via.placeholder.com/50x50.png?text=Image";
  const [searchTerm, setSearchTerm] = useState("");
  const activeUsers = useWebSocket();

  const filteredUsers = activeUsers
    .filter(user => user.username !== JSON.parse(localStorage.getItem("user"))?.username)
    .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

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
              <div key={user.id} className="user-container">
                <img src={imgSrc} alt={user.username} />
                <span>{user.username}</span>
                <span>{user.role}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Chat;
