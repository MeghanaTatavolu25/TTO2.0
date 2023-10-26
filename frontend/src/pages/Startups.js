import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Pagination.css"
import Container from 'react-bootstrap/Container'
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Row, Col } from 'react-bootstrap';
import Chatbot from "../chatbot/Chatbot"
import LoadingSpinner from '../Img/loading.gif'; 
import icon from '../Img/logo.png'; // Import the default icon image
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import print from '../Img/print.png';
import mixpanel from 'mixpanel-browser';

const Startups = () => {
  const [startups, setStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 9;
  const totalPages = Math.ceil(startups.length / itemsPerPage);
  const [isLoading, setIsLoading] = useState(true);
  const [researchLabs, setResearchLabs] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://ttobackend.iiithcanvas.com/api/startups'),
      fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
    ])
      .then(([startupsResponse, researchLabsResponse]) => Promise.all([startupsResponse.json(), researchLabsResponse.json()]))
      .then(([startupsData, researchLabsData]) => {
        setStartups(startupsData);
        setResearchLabs(researchLabsData); // Store research labs data
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const researchLabNames = researchLabs.reduce((map, lab) => {
    map[lab._id] = lab.Research_Lab;
    return map;
  }, {});

  const getStartupImageURL = (startup) => {
    if (startup.StartUpLogo.key) {
    const baseS3URL = 'https://tto-asset.s3.ap-south-1.amazonaws.com/';
    const imageURL = `${baseS3URL}${startup.StartUpLogo?.key}`; 
    return imageURL;
  }
  else {
    return icon; 
  }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    // Apply search filter
    const filteredItems = startups.filter((startup) =>
      startup.StartUp_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Apply sorting
    const sortedItems = [...filteredItems];
    switch (sortOption) {
      case "newest":
        sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "az":
        sortedItems.sort((a, b) => a.StartUp_Name.localeCompare(b.StartUp_Name));
        break;
      case "za":
        sortedItems.sort((a, b) => b.StartUp_Name.localeCompare(a.StartUp_Name));
        break;
      default:
        break;
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Create an array of items for the current page, even if there are fewer startups
    const pageItems = Array.from({ length: itemsPerPage }, (_, index) => sortedItems[startIndex + index] || null);
  
    return pageItems;
  };
  
  const generatePDF = () => {
    // Get the entire document body
    const element = document.body;
  
    // Use html2canvas to capture the entire page
    html2canvas(element).then((canvas) => {
      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Add the captured canvas to the PDF
      pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, 210, 297);
  
      // Save the PDF as a file
      pdf.save('startups.pdf');
    });
  };

  // Function to track a navigation event
  const startupsTracking = (startupnames) => {
    mixpanel.track('Startups', { 'About Startups': startupnames });
  };

  return (
    <div className='page_container'>
    <Chatbot />
    <div className="breadCrumbs">
      <a href="/"
          style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Home </span>/
          </a>
        <span className='page_breadcrumb'> Startups</span>
    </div>
    <div className='header_container'>
      <div className='page_header'>
        <div className='page_title'>All Startups</div>
        <div className='sortby_selector'>
          <select id="sort-select" value={sortOption} onChange={handleSortChange}>
            <option>Sort By</option>
            <option className='dropdown' value="newest">Newest</option>
            <option className='dropdown' value="oldest">Oldest</option>
            <option className='dropdown' value="az">A-Z</option>
            <option className='dropdown' value="za">Z-A</option>
          </select>
        </div>
        <div className='search_box'>
        <Paper
            elevation={0}
            style={{
              backgroundColor: '#EEEEEE',
              display: 'flex',
              padding: '0.3125vw',
              borderRadius: '0.86vw',
              height: '4vw',
              margin: '0',
            }}
          >
            <IconButton
              type="submit"
              aria-label="search"
              style={{
                padding: 5,
              }}
            >
              <SearchIcon style={{ fontSize: "2vw" }} />
            </IconButton>
            <InputBase
              placeholder="Search Labs"
              style={{
                fontSize: "1.245vw",
                flex: 1,
              }}
              value={searchQuery}
              onChange={handleSearchChange}
              // Add a class name for targeting the placeholder
              classes={{ input: 'input-field' }}
            />
          </Paper>
        </div>
      </div>
      <div className='line_divider'></div>
    </div>  

      <Row className='row'>
        {isLoading ? (
          <div className='loading'>
            <img src={LoadingSpinner} alt="Loading" />
          </div>
          ) : (
            // Render startups when data is available
          getPageItems().map((startup, index) => (
          <Col key={index} sm={12} md={4}>
            {startup ? (
              <a 
               href={startup.Website} 
               style={{ textDecoration: 'none'}} 
               target="_blank"
               onClick={() =>{
                startupsTracking(startup.StartUp_Name);
                mixpanel.track('Startups', { 'About Startups': startup.StartUp_Name }); // Track the event in Mixpanel
               }}
              >
                <div className="card">
                  <div className="top-part">
                    <div className="top_content">
                      <div className='title'>{startup.StartUp_Name}</div>
                      <div className='info'>
                        <div >Founder - {startup.Founder_Name}</div>
                        <div >Prof - {startup.Professor_Name}</div>
                        <a href={`/Lab_Technologies/${researchLabNames[startup.Centre_Name]}`}>
                          <p className='center'>Center - <span className='s-center'>{researchLabNames[startup.Centre_Name]}</span></p>
                        </a>
                      </div>
                    </div>
                    <div className="icon"><img src={getStartupImageURL(startup)} alt="/"/></div>
                  </div>
                  <div className="bottom-part">
                  {startup.Idea_Description}
                  </div>
                </div>
                </a>
            ) : (
              // Render empty space placeholder
              <div className='space_if_no_card'></div>
            )}
          </Col>
      ))
      )}
        </Row>

  
      {/* pagination  */}
      {totalPages > 1 && (
          <div className='pagination' style={{fontFamily:"Prompt"}}>
            {currentPage > 1 && (
              <div className="pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
                &lt;
              </div>
            )}
            <div className="pagination-box">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <div
                      key={pageNumber}
                      className={`pagination-button ${pageNumber === currentPage ? "current" : ""}`}
                      onClick={() => handlePageClick(pageNumber)}
                    >
                      {pageNumber}
                    </div>
                  );
                } else if (
                  (pageNumber === currentPage - 2 && currentPage > 3) ||
                  (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNumber}>&hellip;</span>;
                }
                return null;
              })}
            </div>
            {currentPage < totalPages && (
              <div className="pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
                &gt;
              </div>
            )}
            <button onClick={generatePDF} style={{border:'none', background:'white', marginLeft:'1vw'}}><img src={print}/></button>
          </div>
        )}

    </div>
  );
}

export default Startups;
