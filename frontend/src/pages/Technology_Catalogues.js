import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Pagination.css';
import print from "../Img/print.png"
import { Container, Row, Col } from 'react-bootstrap';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import icon from '../Img/logo.png';
import Chatbot from '../chatbot/Chatbot';
import LoadingSpinner from '../Img/loading.gif';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import mixpanel from 'mixpanel-browser';

const TechnologyCatalogues = () => {
  const [technologyCatalogues, setTechnologyCatalogues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 9;
  const totalPages = Math.ceil(technologyCatalogues.length / itemsPerPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
      .then((response) => response.json())
      .then((data) => {
        setTechnologyCatalogues(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  const getResearchImageURL = (research_lab) => {
    const baseS3URL = 'https://tto-asset.s3.ap-south-1.amazonaws.com/';
    return research_lab.ResearchLogo.key ? `${baseS3URL}${research_lab.ResearchLogo.key}` : icon;
  };

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const getPageItems = () => {
    // Sort the technologyCatalogues based on the selected option
    const sortedItems = [...technologyCatalogues];
    switch (sortOption) {
      case "newest":
        sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "az":
        sortedItems.sort((a, b) => a.Research_Lab.localeCompare(b.Research_Lab));
        break;
      case "za":
        sortedItems.sort((a, b) => b.Research_Lab.localeCompare(a.Research_Lab));
        break;
      default:
        break;
    }

    // Filter items based on the search query
    const filteredItems = sortedItems.filter((research_lab) =>
      research_lab.Research_Lab.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Create an array of 6 items, even if there are fewer startups
    const pageItems = Array.from({ length: itemsPerPage }, (_, index) => filteredItems[startIndex + index] || null);

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
      pdf.save('technology_catalogue.pdf');
    });
  };

  // Function to track an event
  const techCataloguesTracking = (technologycatalogues) => {
    mixpanel.track('Technology Catalogues', { 'About Tech Catalogue': technologycatalogues });
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
        <span className='page_breadcrumb'> Technology Catalogue</span>
      </div>
      <div className='header_container'>
        <div className='page_header'>
          <div className='page_title'>Technology Catalogue</div>
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
          getPageItems().length > 0 ? (
            getPageItems().map((research_lab, index) => (
              <Col key={index} sm={12} md={4}>
                {research_lab ? (
                  <a
                    href={`/Lab_Technologies/${research_lab.Research_Lab}/${research_lab.ResearchLabCode}`}
                    onClick={() => {
                      techCataloguesTracking(research_lab.Research_Lab);
                      mixpanel.track('Technology Catalogues', { 'About Tech Catalogue': research_lab.Research_Lab });
                    }}
                  >
                    <div className="card">
                      <div className="top-part">
                        <div className="top_content">
                          <div className='title'>{research_lab.Research_Lab}</div>
                        </div>
                        <div className="icon"><img src={getResearchImageURL(research_lab)} alt="/" /></div>
                      </div>
                      <div className="bottom-part">
                        {research_lab.Description}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className='space_if_no_card'></div>
                )}
              </Col>
            ))
          ) : (
            <div className='no_data'>
              No catalogues found.
            </div>
          )
        )}
      </Row>
    


      {/* pagination  */}
      {totalPages > 1 && (
        <div className='pagination' style={{ fontFamily: "Prompt" }}>
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
          <button onClick={generatePDF} className='pdfimg' ><img src={print} /></button>
        </div>
      )}
    </div>
  );
};

export default TechnologyCatalogues;
