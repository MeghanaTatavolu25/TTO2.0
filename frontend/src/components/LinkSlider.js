import React, { useState, useRef } from "react";
import "../styles/LinkSlider.css";
import { Grid, Paper, Button, Divider } from '@material-ui/core';
import c1 from '../Img/contact1.png';
import c2 from '../Img/contact2.png';
import c3 from '../Img/contact3.png';
import mixpanel from "mixpanel-browser"; 

const links = [
  { id: 1, title: "Entrepreneur", content: "To get IIITH research support for your startup. ", highlight: "Contact us.", image: c1, path: "/Entrepreneur" },
  { id: 2, title: "Industry", content: "To license Technology from IIITH. ", highlight: "Contact us.", image: c2, path: "/Industry" },
  { id: 3, title: "Job Seeker", content: "To work at Product labs. ", highlight: "Contact us.", image: c3, path: "/JobSeeker" }
];

export default function ImageSlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const slideLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const slideRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, links.length - 3)
    );
  };

  const handleCardChange = (index) => {
    setActiveCard(index);
    containerRef.current.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
  };

  // Function to track a navigation event
  const trackNavigation = (contactforms) => {
    mixpanel.track('Contact us', { 'Contact Forms': contactforms });
  };

  const handleScroll = (e) => {
    // Calculate the index of the active card based on scroll position
    const index = Math.round(e.target.scrollLeft / window.innerWidth);
    setActiveCard(index);
  };

  return (
    <div className="link-slider">
      <div className="link-slider__container" ref={containerRef} onScroll={handleScroll}>
        {links.slice(startIndex, startIndex + 3).map((link) => (
          <div key={link.id}>
            <div
              className="contact_container"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="contact_card" >
                <div style={{ flex: 3 }}>
                  <p className="contactus_title">{link.title} </p>
                  <p className="contact_content" >{link.content}</p>
                  <a href={link.path}
                    onClick={() => {
                      trackNavigation(link.title); // Track the Contact us event
                      mixpanel.track('Contact us', { 'Contact Forms': link.title }); // Track the event in Mixpanel
                    }}
                  >
                    <div className="contact_button">
                      Contact
                    </div>
                  </a>
                </div>
                <div className="contactus_img" >
                  <img src={link.image} alt="lorem" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-dots">
        {links.map((link, index) => (
          <div
            key={link.id}
            className={`card-dot ${index === activeCard ? 'active' : ''}`}
            onClick={() => handleCardChange(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
