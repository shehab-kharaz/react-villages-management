import React from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import "../styles/chat.css"

function Chat() {
  const { activeUsers } = useAuth(); 

  return (
    <main>
      <h1>Chat</h1>
      <input type="text" placeholder="Search for a user..." />
      <div className="available-users-container">
        <h3>Available users</h3>
        <div className="available-users-list">
          {activeUsers.length > 0 ? (
            activeUsers.map((username) => (
              <div key={username} className="user-container">
                <img 
                  src="https://via.placeholder.com/50" 
                  alt={`${username}'s avatar`} 
                />
                <p className="user-name">{username}</p>
                <p className="user-role">Role</p>
              </div>
            ))
          ) : (
            <p>No active users right now</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Chat;
