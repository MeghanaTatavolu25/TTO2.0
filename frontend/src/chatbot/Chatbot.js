import React, { useState } from 'react';
import ChatIcon from './ChatIcon';
import ChatWindow from './ChatWindow';
import './Chat.css';

function Chatbot() {
  const [showChat, setShowChat] = useState(false);

  const handleClick = () => {
    setShowChat(true);
  };

  const handleClose = () => {
    setShowChat(false);
  };

  return (
    <>
      <ChatIcon onClick={handleClick} />
      {showChat && <ChatWindow onClose={handleClose} />}
    </>
  );
}

export default Chatbot