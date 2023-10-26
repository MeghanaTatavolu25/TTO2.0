import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../styles/products.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import icon from '../Img/logo.png'
import Chatbot from "../chatbot/Chatbot"
import LoadingSpinner from '../Img/loading.gif'; 
import mixpanel from 'mixpanel-browser';

const Lab_Technologies = () => {
  const { LabName } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [showDescription, setShowDescription] = useState(true);
  const [labDescription, setLabDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [researchLabs, setResearchLabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
          
      try {
        let labTechnologiesResponse;
        
        if (LabName === 'Product Lab') {
          labTechnologiesResponse = await fetch('https://ttobackend.iiithcanvas.com/api/productlab');
        } else {
          labTechnologiesResponse = await fetch('https://ttobackend.iiithcanvas.com/api/technologies');
        }
    
        const [labTechnologiesData, researchLabsResponse] = await Promise.all([
          labTechnologiesResponse.json(),
          fetch('https://ttobackend.iiithcanvas.com/api/researchlabs').then(response => response.json())
        ]);
    
        setProducts(labTechnologiesData);
        setResearchLabs(researchLabsResponse);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const matchingLab = researchLabs.find(lab => lab.Research_Lab === LabName);
    if (matchingLab) {
      setLabDescription(matchingLab.Description);
    }
  }, [LabName, researchLabs]);

  const researchLabNames = researchLabs.reduce((map, lab) => {
    map[lab._id] = lab.Research_Lab;
    return map;
  }, {});
  
  const getMediaURL = (product) => {
    if (product.TechnologyVideo?.key) {
      return `https://tto-asset.s3.ap-south-1.amazonaws.com/${product.TechnologyVideo.key}`;
    } else if (product.TechnologyImage?.key) {
      return `https://tto-asset.s3.ap-south-1.amazonaws.com/${product.TechnologyImage.key}`;
    } else {
      return icon; // Return the default icon if both video and image are not available
    }
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSection('overview'); // Set selectedSection to 'overview' when clicking on a product
    setShowDescription(false);
  };
  const handleDescriptionClick = () => {
    setSelectedProduct([]); // Set selectedProduct to null when clicking on the description
    setShowDescription(!showDescription);
  };
  const handleNavLinkClick = (section) => {
    setSelectedSection(section);
  };

  // Functions to track an event
  const catalogueDescription = (cataloguedescription) => {
    mixpanel.track('Catalogue Descriptions', { 'Catalogue Description': cataloguedescription });
  };

  const technologiesTracking = (technologiesname) => {
    mixpanel.track('Technologies', { 'About Technologies': technologiesname });
  };

  return (
    <>
    <Chatbot />
      <p style={{fontFamily: "Prompt", fontSize: "1.145vw", margin: "0" }}>
        <a href="/" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Home</span>
        </a>
        <span style={{ color: '#9D9D9D' }}> / </span>
        <a href="/Technology_Catalogues" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>Technology Catalogue</span>
        </a>
        <span style={{ color: '#9D9D9D' }}> / </span>
        <a href="" style={{ textDecoration: 'none', color: '#9D9D9D' }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
          }}>
          <span>{LabName}</span>
        </a>
        {selectedProduct && (
          <>
            {!showDescription && (
              <>
                <span style={{ color: '#9D9D9D' }}> / </span>
                <span style={{ color: '#1F669F', fontWeight: 500 }}>{LabName === 'Product Lab' ? selectedProduct.NameOfProduct : selectedProduct.NameOfTechnology}</span>
              </>
            )}
          </>
        )}
        <script>
          function log() {
            console.log("ss", products.NameOfTechnology)
          }
        </script>
      </p>


        <div style={{ fontFamily: 'Prompt', paddingTop: "1.2vw"}}>
        <div className="app">
        <div className="sidebarTech">
          <div className="sidebar-headingTech">{LabName}</div>
          <div
            className={`description-headingTech ${showDescription ? 'active' : ''}`}
            onClick={() => {
              handleDescriptionClick();
              catalogueDescription(LabName);
              mixpanel.track('Catalogue Descriptions', { 'Catalogue Description': LabName });
            }}
            >
            Description
          </div>
          <div className="projects-heading"> Technologies : </div>
          <div className="line"></div>
          <div className="products-list">
          {isLoading ? ( // Display loading symbol if isLoading is true
              <div style={{ height: '25vw' }}>
                <img src={LoadingSpinner} alt="Loading" style={{ width: '2.5vw', height: '2.5vw', margin: '10vw 10vw 0'  }} />
              </div>
            ) : (
              products
                .filter(product => researchLabNames[product.CentreName] === LabName)
                .map(product => (
                  <div key={product._id}>
                    <div
                      key={product._id}
                      className={`product ${selectedProduct === product ? 'active' : ''}`}
                      onClick={() => {
                        handleProductClick(product);
                        technologiesTracking(product.NameOfTechnology);
                        mixpanel.track('Technologies', { 'About Technologies': product.NameOfTechnology });
                      }}
                    >
                      <h3 className="underline-on-hover" style={{ width: '23vw', fontWeight: 300, fontSize: "1.245vw", lineHeight: "1.3vw", cursor: "pointer", margin: "0.2vw 0 1.1vw" }}>
                        {LabName === 'Product Lab' ? product.NameOfProduct : product.NameOfTechnology}
                      </h3>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
            <div className="content">
            {showDescription && (
              <>
                <h2 style={{fontWeight: 500, fontSize: "1.56vw",lineHeight:"2vw", letterSpacing: "-0.02em",color: "#2C2C2C"}}>Description</h2>
                <p className="lab-description">{labDescription}</p>
              </>
            )}
              {!showDescription && selectedProduct && (
                <>
              <h2 style={{fontWeight: 500, fontSize: "1.56vw",lineHeight:"2vw", letterSpacing: "-0.02em",color: "#2C2C2C"}}>{LabName === 'Product Lab' ? selectedProduct.NameOfProduct : selectedProduct.NameOfTechnology}</h2>
              <div className="videoORimage">
                {isLoading ? ( // Display loading symbol if isLoading is true
                  <div style={{ height: '15.4vw', borderRadius: '8px', margin: '0vw 0 0.3vw' }}>
                    <img src={LoadingSpinner} alt="Loading" style={{ width: '3.5vw', height: '3.5vw', margin: '10vw 28vw 0' }} />
                  </div>
                ) : (
                  <>
                    {selectedProduct.TechnologyVideo && selectedProduct.TechnologyVideo.key ? ( // Display video if available
                      <video
                        controls
                        src={`https://tto-asset.s3.ap-south-1.amazonaws.com/${selectedProduct.TechnologyVideo.key}`}
                        style={{ width: '63vw', height: '15.4vw', borderRadius: '8px', margin: '0vw 0 0.3vw' }}
                      />
                    ) : (
                      <img // Display image if video is not available
                        src={getMediaURL(selectedProduct)}
                        alt="Product"
                        style={{ width: '63vw', height: '15.4vw', borderRadius: '8px', margin: '0vw 0 0.3vw' }}
                      />
                    )}
                  </>
                )}
              </div>
                  <div className="faculty-name">
                  Faculty Name: &nbsp;&nbsp;{selectedProduct.FacultyName}
                  </div>
                  <div className="keywords">
                  Keywords: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {selectedProduct.keywords}
                  </div>
                  <div className="nav-bar">
                  <div
                      className={`nav_link ${selectedSection === 'overview' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('overview')}
                  >
                  Overview
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'technology' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('technology')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Type of work
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'market-use-case' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('market-use-case')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      State of work
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'current-traction' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('current-traction')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Potential Applications
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'linked-patent' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('linked-patent')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Related Publications
                  </div>
                  <div
                      className={`nav_link ${selectedSection === 'demo-link' ? 'active' : ''}`}
                      onClick={() => handleNavLinkClick('demo-link')}
                      style={{marginLeft:"4.1vw"}}
                  >
                      Demo Link
                  </div>
                  </div>
                  <div className={`section ${selectedSection === 'overview' ? 'active' : ''}`} id="overview">
                    <p>{selectedProduct.Description}</p>
                  </div>
                  <div className={`section ${selectedSection === 'technology' ? 'active' : ''}`} id="technology">
                    <p>{selectedProduct.TypeOfWork}</p>
                  </div>
                  <div className={`section ${selectedSection === 'market-use-case' ? 'active' : ''}`} id="market-use-case">
                    <p>{selectedProduct.CurrentStateOfWork}</p>
                  </div>
                  <div className={`section ${selectedSection === 'current-traction' ? 'active' : ''}`} id="current-traction">
                    <p>{selectedProduct.PotentialApplication}</p>
                  </div>
                  <div className={`section ${selectedSection === 'linked-patent' ? 'active' : ''}`} id="linked-patent">
                    <p>{selectedProduct.RelatedPublication}</p>
                  </div>
                  <div className={`section ${selectedSection === 'demo-link' ? 'active' : ''}`} id="demo-link">
                    <p><a href={selectedProduct.DemoLink}>{selectedProduct.demoLink}</a></p>
                  </div>
                </>
              )}
            </div>
            </div>
        </div>
    </>
  );
}

export default Lab_Technologies;
