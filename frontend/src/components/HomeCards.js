import React, { useState, useRef, useEffect } from "react";
import "../styles/HomeCards.css";
import { Grid } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import img2 from '../Img/image 2.png'
import img13 from '../Img/image 13.png'
import img14 from '../Img/image 14.png'
import icon1 from '../Img/Icon1.png'
import icon2 from '../Img/icon2.png'
import icon3 from '../Img/icon3.png';
import mixpanel from 'mixpanel-browser';

const items = [
  {
    id: 1,
    heading: "Startup Seeding",
    icon: icon1,
    image: img2,
    description: "Enabling entrepreneurs to create startups from research output",
    links: 'https://cie.iiit.ac.in/'
  },
  {
    id: 2,
    heading: "Technology Licensing",
    icon: icon2,
    image: img13,
    description: "Program to transfer technology to Startups and Industry",
    links: './Technologylicensing'
  },
  {
    id: 3,
    heading: "Productize",
    icon: icon3,
    image: img14,
    description: "Unique program to bridge technology to market needs",
    links: './Productize'
  },
];

const Item = ({ id, heading, icon, image, description, links, text }) => (
  <>
    <div className="card_content">
      <img src={icon} alt="icon" />
      <div className="heading">{heading}</div>
      <div className="description">{description}</div>
      {/* Check if the id is 1, if yes, add target="_blank" to the link */}
      {id === 1 ? (
        <a href={links} target="_blank" style={{ textDecoration: 'none' }}>
          <div className="visitpage">Visit Page</div>
        </a>
      ) : (
        <a href={links} style={{ textDecoration: 'none' }}>
          <div className="visitpage">Visit Page</div>
        </a>
      )}
    </div>
  </>
);

const HomeCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const handleCardChange = (index) => {
    setActiveCard(index);
    containerRef.current.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
  };

  // Update active card when the user scrolls
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / window.innerWidth);
      setActiveCard(index);
    }
  };

  useEffect(() => {
    // Add event listener for scroll
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Remove event listener when the component unmounts
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="home_cards">
      <div className="ttoHeading">Technology Transfer Office</div>
      <div className="card-slider" ref={containerRef}>
        {items.map((item, index) => (
          <div key={item.id} className="card-slide">
            <Item {...item} />
          </div>
        ))}
      </div>
      <div className="card-dots">
        {items.map((_, index) => (
          <div
            key={index}
            className={`card-dot ${index === activeCard ? 'active' : ''}`}
            onClick={() => handleCardChange(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
