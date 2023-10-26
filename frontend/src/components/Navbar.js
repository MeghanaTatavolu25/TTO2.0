import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from "../Img/logo.png";
import mixpanel from 'mixpanel-browser';
import hamburger from '../Img/hamburger.png';
import close from '../Img/close.png';
import "../styles/Navbar.css";

const menuItems = [
  { label: 'Home', to: '/', event: 'Home' },
  { label: 'Technology Catalogue', to: '/Technology_Catalogues', event: 'Technology Catalogue' },
  { label: 'Startups', to: '/Startups', event: 'Startups' },
  { label: 'Patents', to: '/patents', event: 'Patents' },
  { label: 'Products', to: '/Products', event: 'Products' },
  { label: 'IIITH-Canvas', to: 'https://canvas.iiithcanvas.com/', event: 'IIITH-Canvas', target:'_blank' },
  { label: 'APIs', to: 'https://devportal.iiithcanvas.com/login', event: 'APIs', target:'_blank' },
  { label: 'R&D Showcase', to: 'https://portal2022-rndshowcase.iiit.ac.in/expo-hall/', event: 'R&D Showcase', target:'_blank' },
  { label: 'The Team', to: '/Team', event: 'The Team' },
];

const sidebarMenuItems = [
  { label: 'Home', to: '/' },
  { label: 'Technology Catalogue', to: '/Technology_Catalogues' },
  { label: 'Startups', to: '/Startups' },
  { label: 'Patents', to: '/patents' },
  { label: 'Products', to: '/Products' },
  { label: 'IIITH-Canvas', to: 'https://canvas.iiithcanvas.com/', target:'_blank' },
  { label: 'APIs', to: 'https://devportal.iiithcanvas.com/login', target:'_blank' },
  { label: 'R&D Showcase', to: 'https://portal2022-rndshowcase.iiit.ac.in/expo-hall/', target:'_blank' },
  { label: 'The Team', to: '/Team' },
];

const ResponsiveNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPath = window.location.pathname; // Get the current path

  const trackNavigation = (menuEvent) => {
    mixpanel.track('Menu bar', { 'Menu': menuEvent });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
    // Add or remove the 'sidebar-open' class on the body
    if (!isSidebarOpen) {
      document.body.classList.add('sidebar-open');
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.classList.remove('sidebar-open');
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderNavLinks = () => {
    return menuItems.map((item, index) => {
      if (item.target === "_blank") {
        return (
          <a
            key={index}
            href={item.to}
            target="_blank"
            className="navLinkStyle"
            onClick={() => {
              trackNavigation(item.event);
              setIsSidebarOpen(false);
            }}
          >
            {item.label}
          </a>
        );
      } else {
        return (
          <NavLink
            key={index}
            exact={item.to === '/'}
            to={item.to}
            className="navLinkStyle"
            activeClassName="activeNavLinkStyle"
            onClick={() => {
              trackNavigation(item.event);
              setIsSidebarOpen(false);
            }}
          >
            {item.label}
          </NavLink>
        );
      }
    });
  };
  const renderSidebarLinks = () => {
    return sidebarMenuItems.map((item, index) => {
      if (item.target === "_blank") {
        return (
          <a
            key={index}
            href={item.to}
            target="_blank"
            style={{
              color: currentPath === item.to ? "#105AC2" : "#2C2C2C",
            }}
            onClick={closeSidebar}
          >
            {item.label}
          </a>
        );
      } else {
        return (
          <NavLink
            key={index}
            to={item.to}
            style={{
              color: currentPath === item.to ? "#105AC2" : "#2C2C2C",
            }}
            onClick={closeSidebar}
          >
            {item.label}
          </NavLink>
        );
      }
    });
  };
  
  return (
    <div>
    <Navbar bg="white">
      <button
        className="hamburgerButton"
        onClick={toggleSidebar}
      >
        <img src={hamburger} alt='hamburger'/>
      </button>
      <Navbar.Brand href="/" className='iiit-logo'> 
        <img
          src={Logo}
          alt="Navbar Brand"
          className="logo"
        />
      </Navbar.Brand>
    </Navbar>
    <Navbar bg="white" className="navbarStyle">
      <Nav className="navLinks">
        {renderNavLinks()}
      </Nav>
    </Navbar>
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className='closebutton'>
        <button className="closeButton" onClick={toggleSidebar}>
          <img src={close} alt='hamburger'/>
        </button>
      </div>
      <div className="menuHeadings">
      {renderSidebarLinks()}
      </div>
    </div>
  </div>
);
};

export default ResponsiveNavbar;
