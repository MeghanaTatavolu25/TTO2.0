import React, { useState } from 'react';
import './Chat.css';
import chaticon from '../Img/chaticon.png';

function ChatIcon() {
  const [isChatIconDisabled, setIsChatIconDisabled] = useState(false);

  const handleClick = () => {
    setIsChatIconDisabled(true);
  };

  return (
    <div
      className="chat-icon"
      onClick={handleClick}
      style={{
        opacity: isChatIconDisabled ? 0.5 : 1,
        cursor: isChatIconDisabled ? 'not-allowed' : 'not-allowed'
      }}
    >
      <span>
        <img src={chaticon} className='chaticonimg' alt="Chat Icon" />
      </span>
    </div>
  );
}

export default ChatIcon;
