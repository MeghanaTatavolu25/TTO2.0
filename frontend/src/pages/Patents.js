import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import "../styles/Patent.css"
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from "../Img/calendar.png";
import 'react-calendar/dist/Calendar.css';
import SearchIcon from '@material-ui/icons/Search';
import Chatbot from '../chatbot/Chatbot';
import LoadingSpinner from '../Img/loading.gif'; 
import mixpanel from 'mixpanel-browser';

const SearchBar = ({ setSearchQuery }) => {
  return (
      <Paper
          elevation={0}
          style={{
              backgroundColor: '#EEEEEE',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '0.86vw',
              height: '3.5vw',

          }}
      >
          <IconButton
              type="submit"
              aria-label="search"
              style={{
                  padding: 10,
              }}
          >
              <SearchIcon style={{ fontSize: "2vw" }} />
          </IconButton>
          <InputBase
              placeholder="Search Patents"
              style={{
                  fontSize: "1.245vw",
                  flex: 1,

              }}
              onChange={(e) => { setSearchQuery(e.target.value); console.log(e.target.value) }}
              // Add a class name for targeting the placeholder
              classes={{ input: 'input-field' }}
          />
      </Paper>
  );
};

function Component1({ setSearchQuery, setactiveLab, setactiveStatus, activeLab, activeStatus, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const pages = [];
  const [isLoading, setIsLoading] = useState(true);
  const [patents, setPatents] = useState([]);
  const [researchLabs, setResearchLabs] = useState([]);
  const [patentStatuses, setPatentStatuses] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const [patentsResponse, researchLabsResponse, patentStatusesResponse] = await Promise.all([
          fetch('https://ttopatents.iiithcanvas.com/patents/patents'),
          fetch('https://ttobackend.iiithcanvas.com/api/researchlabs'),
          fetch('https://ttobackend.iiithcanvas.com/api/patentStatus')
        ]);
  
        const [patentsData, researchLabsData, patentStatusesData] = await Promise.all([
          patentsResponse.json(),
          researchLabsResponse.json(),
          patentStatusesResponse.json()
        ]);
  
        const uniqueNames = Array.from(new Set(patentsData.map(patent => patent.Center_Name)));
        const uniquePatents = uniqueNames.map(name => {
          return patentsData.find(patent => patent.Center_Name === name);
        });
        setPatents(uniquePatents);
        setResearchLabs(researchLabsData);
        setPatentStatuses(patentStatusesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const researchLabNames = researchLabs.reduce((map, lab) => {
    map[lab._id] = lab.Research_Lab;
    return map;
  }, {});
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <div>
        <SearchBar setSearchQuery={setSearchQuery} />
        <Grid container spacing={1} style={{ paddingTop: "0.5vw" }}>
          <Grid item xs={12} sm={12} md={12}>
            <a href=""><p onClick={() => { setactiveLab(""); setactiveStatus(""); setSelectedStartDate(null); setSelectedEndDate(null); }} style={{ width: '100%', color: "#A0A0A0", fontSize: "1.0417vw", fontWeight: 400 }}>Reset Filters</p></a>
          </Grid>
        </Grid>
        <p style={{ color: '#2C2C2C', fontSize: "1.66vw", fontWeight: '500', paddingTop: "0.2vw" }}>
          Patent Status
          <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
        </p>
        <div className='patent_status'>
          {patentStatuses.map(status => (
            <a href="#" key={status._id}>
              <p
                style={{
                  color: activeStatus === status.name ? "#1369CB" : "#2C2C2C",
                }}
                onClick={() => setactiveStatus(activeStatus === status.name ? "" : status.name)}
                onMouseEnter={(e) => {
                  e.target.style.color = "#1369CB";
                  e.target.style.textDecoration = "none";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeStatus === status.name ? "#1369CB" : "#2C2C2C";
                  e.target.style.textDecoration = "none";
                }}
              >
                {status.name}
              </p>
            </a>
          ))}
        </div>
      </div>
      <div>
        <p style={{ color: '#2C2C2C', fontSize: "1.66vw", fontWeight: '500', paddingTop: "0.2vw" }}>
          Research Lab
          <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0', }}></Grid>
        </p>
        <div className="center-name">
          {patents.map(patent => (
            <a href="#" key={patent._id}>
              <p
                style={{
                  color: activeLab === researchLabNames[patent.Center_Name] ? "#1369CB" : "#2C2C2C",
                  lineHeight: '1.2vw',
                  textDecoration: 'none', // Remove underline
                  transition: 'color 0.3s ease-in-out', // Add transition
                }}
                onClick={() => setactiveLab(activeLab === researchLabNames[patent.Center_Name] ? "" : researchLabNames[patent.Center_Name])}
                onMouseEnter={(e) => {
                  e.target.style.color = "#1369CB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeLab === researchLabNames[patent.Center_Name] ? "#1369CB" : "#2C2C2C";
                }}
              >
                {researchLabNames[patent.Center_Name]}
              </p>
            </a>
          ))}
        </div>
      </div>
      <div>
        <p style={{ color: '#2C2C2C', fontSize: "1.66vw", fontWeight: '500', paddingTop: "1.5vw" }}>
          Search By Date
          <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>
        </p>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} style={{ padding: "1vw 0 5vw 0" }}>
            <Typography style={{ color: '#2C2C2C', fontSize: "1.0417vw", fontWeight: '400', fontFamily: "Prompt" }}>Start Date</Typography>
            <div style={{ position: "relative", width: "100%" }}>
              <label style={{ position: "relative", width: "100%" }}>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText=""
                  className="custom-datepicker"
                />
                <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
              </label>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography style={{ color: '#2C2C2C', fontSize: "1.0417vw", fontWeight: '400', fontFamily: "Prompt" }}>End Date</Typography>
            <div style={{ position: "relative", width: "100%" }}>
              <label style={{ position: "relative", width: "100%" }}>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText=""
                  className="custom-datepicker"
                />
                <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
              </label>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
function Component2({ searchQuery, sortOption, activeLab, activeStatus, selectedStartDate, selectedEndDate }) {
  const [patents, setPatents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patentsPerPage = 7; // Number of patents to display per page
  const [isLoading, setIsLoading] = useState(true);
  const [researchLabs, setResearchLabs] = useState([]);
  const [patentStatuses, setPatentStatuses] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://ttopatents.iiithcanvas.com/patents/patents'),
      fetch('https://ttobackend.iiithcanvas.com/api/researchlabs'),
      fetch('https://ttobackend.iiithcanvas.com/api/patentStatus')
    ])
      .then(([patentsResponse, researchLabsResponse, patentStatusesResponse]) =>
        Promise.all([patentsResponse.json(), researchLabsResponse.json(), patentStatusesResponse.json()])
      )
      .then(([patentsData, researchLabsData, patentStatusesData]) => {
        setPatents(patentsData);
        setResearchLabs(researchLabsData);
        setPatentStatuses(patentStatusesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);
  // Map research lab names
  const researchLabNames = researchLabs.reduce((map, lab) => {
    map[lab._id] = lab.Research_Lab;
    return map;
  }, {});

  // Map patent status names
  const patentStatus = patentStatuses.reduce((map, status) => {
    map[status._id] = status.name; 
    return map;
  }, {});
  // Apply filters
  let filterPatents = patents;
  if (searchQuery) {
    filterPatents = filterPatents.filter(patent =>
      patent.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  // Apply sorting
  if (sortOption === "Newest") {
    filterPatents = filterPatents.sort((a, b) => {
      const yearA = a.Published_Date ? parseInt(a.Published_Date.substring(0, 4), 10) : 0;
      const yearB = b.Published_Date ? parseInt(b.Published_Date.substring(0, 4), 10) : 0;
      return yearB - yearA;
    });
  } else if (sortOption === "Oldest") {
    filterPatents = filterPatents.sort((a, b) => {
      const yearA = a.Published_Date ? parseInt(a.Published_Date.substring(0, 4), 10) : 0;
      const yearB = b.Published_Date ? parseInt(b.Published_Date.substring(0, 4), 10) : 0;
      return yearA - yearB;
    });
  } else if (sortOption === "A-Z") {
    filterPatents = filterPatents.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortOption === "Z-A") {
    filterPatents = filterPatents.sort((a, b) => b.Title.localeCompare(a.Title));
  }
  if (activeLab) {
    filterPatents = filterPatents.filter(patent => researchLabNames[patent.Center_Name] === activeLab);
  }
  if (activeStatus) {
    filterPatents = filterPatents.filter(
      patent => patentStatus[patent.Status] === activeStatus
    );
  }
  if (selectedStartDate && selectedEndDate) {
    filterPatents = filterPatents.filter(patent => {
      const publishedYear = new Date(patent.Published_Date).getFullYear();
      return (
        publishedYear >= selectedStartDate.getFullYear() &&
        publishedYear <= selectedEndDate.getFullYear()
      );
    });
  } else if (selectedStartDate) {
    filterPatents = filterPatents.filter(patent => {
      const publishedYear = new Date(patent.Published_Date).getFullYear();
      return publishedYear >= selectedStartDate.getFullYear();
    });
  } else if (selectedEndDate) {
    filterPatents = filterPatents.filter(patent => {
      const publishedYear = new Date(patent.Published_Date).getFullYear();
      return publishedYear <= selectedEndDate.getFullYear();
    });
  }

  // Pagination
  const indexOfLastPatent = currentPage * patentsPerPage;
  const indexOfFirstPatent = indexOfLastPatent - patentsPerPage;
  const currentPatents = filterPatents.slice(indexOfFirstPatent, indexOfLastPatent);
  const totalPages = Math.ceil(filterPatents.length / patentsPerPage);

  const handlePageClick = value => {
    setCurrentPage(value);
  };

  // Function to track a navigation event
  const patentsTracking = (patentnames) => {
    mixpanel.track('Patents', { 'About Patent': patentnames});
  };

  return (
    <div className="headerContainer" style={{ textAlign: 'left' }}>
      <div>
      {isLoading ? (
        <div style={{ height: '25vw' }}>
          <img src={LoadingSpinner} alt="Loading" style={{ width: '5vw', height: '5vw', margin: '12vw 23vw 0' }} />
        </div>
      ) : (
        currentPatents.map(result => (
          <Grid  style={{ paddingBottom: '2.6vw' }} key={result.id}
            onClick={() => {
              patentsTracking(result.Title);
              mixpanel.track('Patents', { 'About Patent': result.Title });
            }}
          >
            <p style={{ fontWeight: '400', fontSize: '1.0417vw' }}>
            {patentStatus[result.Status]} |{' '}
              <span style={{ color: '#2C2C2C' }}>{researchLabNames[result.Center_Name]}</span> |{' '}
              <span style={{ color: '#2C2C2C' }}>
                {Number.isNaN(new Date(result.Published_Date).getFullYear()) || result.Published_Date === ""
                  ? 'Not available'
                  : new Date(result.Published_Date).getFullYear()}
              </span>
            </p>
            <p style={{ fontWeight: '500', color: '#2C2C2C', fontSize: '1.66vw', lineHeight:'1.8vw' }}>{result.Title}</p>
            <p style={{ fontWeight: '400', color: '#525252', fontSize: '1.0417vw' }}>
              Patent No - {result.Patent_Number},
              Application - {result.Application_Number}
            </p>
            <p style={{ fontWeight: '400', color: '#A7A6A6', fontSize: '1.0417vw' }}>
             Faculty - {result.Faculty_List && result.Faculty_List.length > 1 ? result.Faculty_List.join(', ') : result.Faculty_List}
            </p>
          </Grid>
        ))
      )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="patent-pagination" style={{ fontFamily: 'Inter' }}>
          {currentPage > 1 && (
            <div className="patent-pagination-arrow" onClick={() => handlePageClick(currentPage - 1)}>
              &lt;
            </div>
          )}
          <div className="patent-pagination-box">
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
                    className={`patent-pagination-button ${pageNumber === currentPage ? 'current' : ''}`}
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
            <div className="patent-pagination-arrow" onClick={() => handlePageClick(currentPage + 1)}>
              &gt;
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function Patent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [activeLab, setactiveLab] = useState("");
  const [activeStatus, setactiveStatus] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleOptionClick = (event) => {
    const optionValue = event.target.value;
    setSortOption(optionValue);
  };

  return (
      <>
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
        <span className='page_breadcrumb'> Patents</span>
      </div>
      <div className='header_container'>
        <div className='page_header'>
          <div className='page_title'>All Patents</div>
          <div className='sortby_selector'>
            <select id="sort-select" value={sortOption} onChange={handleOptionClick}>
              <option>Sort By</option>
              <option className='dropdown' value="newest">Newest</option>
              <option className='dropdown' value="oldest">Oldest</option>
              <option className='dropdown' value="az">A-Z</option>
              <option className='dropdown' value="za">Z-A</option>
            </select>
          </div>
        </div>
        <div className='line_divider'></div>
      </div> 
      <div style={{ marginTop: "1vw", display: "flex", width: "100%" }}>
        <div
            style={{
                width: '22%',
                height: 'auto',
                minHeight: '42vw',
                overflowY: 'auto',
                overflowX:'hidden',
            }}
        >
        <Component1
          setSearchQuery={setSearchQuery}
          setactiveLab={setactiveLab}
          setactiveStatus={setactiveStatus}
          activeLab={activeLab}
          activeStatus={activeStatus}
          selectedStartDate={selectedStartDate}
          setSelectedStartDate={setSelectedStartDate}
          selectedEndDate={selectedEndDate}
          setSelectedEndDate={setSelectedEndDate}
        />
        </div>

        <div style={{
            width: '100%',
            marginLeft:'4vw',
            paddingBottom: "10vw"
        }}>
          <Component2
            searchQuery={searchQuery}
            sortOption={sortOption}
            activeLab={activeLab}
            activeStatus={activeStatus}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
          />
      </div>
      </div>
      </>
  );
}
export default Patent;