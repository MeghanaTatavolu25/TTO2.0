import React from 'react';

const Card = ({ data }) => {
  // Define default values for properties
  const { name, description, imageUrl, founder = '', center = '', professor = '' } = data;

  return (
    <div
      style={{
        display: "flex",
        border: '1px solid #9DC8F9',
        background: '#F1F7FF',
        borderRadius: '0.625008vw',
        padding: '1vw',
        margin: '0.7vw 0 1vw',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#DCEEFF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#F1F7FF';
      }}
    >
      <div style={{ flex: 1 }}>
        <h2 style={{
          color: "#353535",
          fontSize: "1.145826vw",
          fontWeight: 400,
          margin: '0 0 1vw',
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{name}</h2>
        <p style={{
          lineHeight: '1.2vw',
          fontWeight: 400,
          margin: '0 1.1vw 0.6vw',
          color: "#757575",
          fontSize: "1vw",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{description}</p>
        {/* Render additional data if present */}
        {founder && <p>Founder: {founder}</p>}
        {center && <p>Center: {center}</p>}
        {professor && <p>Professor: {professor}</p>}
      </div>
      <div style={{ width: '20%', height: '3.7vw' }}>
        <img src={imageUrl} alt="/" style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          border: '1px solid #D3E6F9',
          background: 'white'
        }} />
      </div>
    </div>
  );
};

export default Card;
