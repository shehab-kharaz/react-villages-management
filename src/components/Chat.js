import "../styles/chat.css"

function Chat(){
  return (
    <main>
      <h1>Chat With Admins</h1>
      <input type="text" placeholder="Search for an admin..."></input>
      <div>
        <h3>Available Admins</h3>
        <div className="available-admins"></div>
      </div>
    </main>
  )
}

export default Chat;