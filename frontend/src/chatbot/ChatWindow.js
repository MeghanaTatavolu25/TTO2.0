import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import sendbutton from './send-button.png'
import Chaticon from '../Img/chaticon.png';
import Chatclose from '../Img/chatclose.png'

const ChatWindow = ({ onClose }) => {

  

  const [messages, setMessages] = useState([
    { text: "Hey! How have you been?", sender: "bot" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const botResponses = [
    { text: "I'm sorry, I didn't understand.", sender: "bot" },
    { text: "Could you please rephrase that?", sender: "bot" },
    { text: "I'm not sure I understand. Can you explain?", sender: "bot" },
    { text: "I'm still learning. Can you try again?", sender: "bot" }
  ];

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setUserMessage("");

      // Delay the bot's response by one second
      fetch("http://127.0.0.1:5000/api/chatbot", {
        method: "POST",
        body: JSON.stringify({ input: userMessage }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const botResponse = { text: data.response, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);


  return (
    <div className="chat-window">
      <div className="chat-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ padding: "0 0.82vw 0 0", width: "3.5vw" }} src={Chaticon} alt="icon" />
          <div style={{marginLeft:'0.5vw'}}>
            <div className='chatbot-heading'>Chatbot</div>
            <div className="online">Online</div>
          </div>
        </div>
        <div className="chat-header-close" onClick={onClose}>
          <img style={{marginTop:'-2vw',width: "0.8vw", justifyContent:'right' }} src={Chatclose} alt="icon" />

        </div>

      </div>
      <div className="chat-messages" ref={messagesRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"
              }`}
          >
            <div         style={{ wordBreak: "break-word" }}

              className={`chat-bubble ${message.sender === "user" ? "user-bubble" : "bot-bubble"
                }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
  <input
    type="text"
    className="chat-input"
    placeholder="Type your message here"
    value={userMessage}
    onChange={handleUserMessageChange}
    style={{ maxWidth: '90%' }}
    onKeyDown={(event) => {
      if (event.keyCode === 13) {
        event.preventDefault(); // Prevent default behavior of enter key
        handleSendMessage();
      }
    }}
  />
  <button className="send-message-button" onClick={handleSendMessage}>
    <img src={sendbutton}></img>
  </button>
</div>

    </div>
  );
};

export default ChatWindow;
