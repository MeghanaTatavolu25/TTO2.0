import React from "react"
import "../styles/Patent.css"
import bg from "../assets/cc.jpg"
import Navbar from "../components/Navbar"
import Navbar2 from "../components/Navbar2"
import cvit from "../assets/cvit.png"
import ButtonRow from "../components/Buttonrow"
import { Maximize } from "@material-ui/icons"
import { Grid, Paper, Button, Divider } from '@material-ui/core';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { Select, MenuItem } from '@material-ui/core';
import DatePicker from "react-datepicker";

import { Typography, Checkbox, FormControlLabel, Box, TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaCalendarAlt } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import { Search } from '@material-ui/icons';
import Modal from 'react-modal';

import ResponsiveImage from "../components/ResponsiveImage"

import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import upload from '../Img/upload.png'
import axios from 'axios';

// Modal.setAppElement('#yourAppElement');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        backgroundColor: '#e7f2fb',
        padding: theme.spacing(2),
        minHeight: '100vh',
        padding: ' 0 2em'
    },
    filterGroup: {
        marginTop: theme.spacing(2),
    },


    pagination: {
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },

    heading: {
        fontFamily: 'Prompt',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '22px',
        lineHeight: '45px',
        letterSpacing: '-0.04em',
        color: '#2C2C2C        '
    },

    eachitem: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 500,
        color: '#4591C5',
        lineHeight: '5px',

    },



    tableitem: {
        fontFamily: 'Hahmlet',
        fontStyle: 'normal',
        fontWeight: 500,
        color: '#2C2C2C',
        lineHeight: '2em',
        fontSize: '19px',

    }
    ,
    checkbox: {
        color: '#4591C5  ', // set the color to blue
        '&$checked': {
            color: '#0E66AC          ', // set the color of the checked state to blue
        },
        // border: '1px solid #0E66AC',

        borderRadius: '4px'
    },

    checked: {},
}));


const SearchBar = ({ setSearchQuery }) => {
    return (
        <Paper
            elevation={0}
            style={{
                backgroundColor: '#EEEEEE',
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                borderRadius: '0.86vw',
                maxHeight: '4.5vw'
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
                    fontSize: "1.3vw",
                    flex: 1,
                }}
                onChange={(e) => { setSearchQuery(e.target.value); console.log(e.target.value) }}
            />

        </Paper>
    );
};



function Component1({ setSearchQuery, setactiveLab, setactiveStatus }) {

    const [activeIndex, setActiveIndex] = useState(null);

    const handlePClick = (index) => {
        setActiveIndex(index);
    }





    const [faculties, setFaculties] = useState([]);

    // const faculties = [
    //     { Name: 'Faculty 1' },
    //     { Name: 'Faculty 2' },
    //     { Name: 'Faculty 3' },
    //     // Add more faculties as needed
    //   ];

    const [selectedFaculties, setSelectedFaculties] = useState([]);

    const handleSelectChange = (event) => {
        const selectedFacultyName = event.target.value;
        if (selectedFacultyName !== '') {
            const isAlreadySelected = selectedFaculties.includes(selectedFacultyName);
            if (!isAlreadySelected) {
                const newSelectedFaculties = [...selectedFaculties, selectedFacultyName];
                setSelectedFaculties(newSelectedFaculties);
            }
        }
    };

    const handleDeselect = (facultyName) => {
        const newSelectedFaculties = selectedFaculties.filter(
            (name) => name !== facultyName
        );
        setSelectedFaculties(newSelectedFaculties);
    };







    const classes = useStyles();


    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [showCalendar1, setShowCalendar1] = useState(false);
    const toggleCalendar1 = () => setShowCalendar1(!showCalendar1);
    const [endDate, setEndDate] = useState(new Date());
    const [showCalendar2, setShowCalendar2] = useState(false);
    const toggleCalendar2 = () => setShowCalendar2(!showCalendar2);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [patentTitle, setpatentTitle] = useState("");
    const [patentLab, setpatentLab] = useState("");
    const [patentYear, setpatentYear] = useState("");
    const [patentNumber, setpatentNumber] = useState("");
    const [patentHolderName, setpatentHolderName] = useState("");
    const [patentStatus, setpatentStatus] = useState("");

    const [centers, setCenters] = useState([]);




    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPatent = {
            Title: patentTitle,
            Center_Name: patentLab,
            Year: patentYear,
            Patent_Number: patentNumber,
            Faculty: [patentHolderName],
            Status: patentStatus

        }
        axios.post('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patent', newPatent)
            .then(function (res) {
                window.location = "/patents/admin"
            });
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };
    const handleShowMoreFilters = () => {
        setShowMoreFilters(true);
    };
    const handleShowLessFilters = () => {
        setShowMoreFilters(false);
    };

    const handleClearAll = () => {
        setShowMoreFilters(false)

    }

    useEffect(() => {
        // Call your API here and store the response in searchResults state
        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/center/centers')
            .then(response => response.json())
            .then(data => setCenters(data));

        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/faculty/faculties')
            .then(response => response.json())
            .then(data => setFaculties(data));


    }, []);


    return (
        <>
            <div style={{ padding: "0 3vw" }}>
                <SearchBar setSearchQuery={setSearchQuery} />
                <Grid container spacing={1} style={{ paddingTop: "1vw" }}>
                    <Grid item xs={6} sm={6} md={6}>
                        <p onClick={() => { setactiveLab(""); setactiveStatus("") }} style={{ color: "#A0A0A0", fontSize: "1.3vw", padding: "0.35vw 0" }}>Reset Filters</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Paper style={{ backgroundColor: "#09A5AF", padding: "0.35vw 0", borderRadius: "0.86vw" }}>
                            <span onClick={openModal} style={{ fontSize: "1.3vw", color: "#FEFEFE" }}>&nbsp;<ResponsiveImage src={upload} maxHeight={40} maxWidth={40} />&nbsp; Upload</span>

                        </Paper>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            style={{
                                overlay: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(71, 70, 70, 0.75)',
                                },
                                content: {
                                    width: '60%',
                                    height: '60%',
                                    margin: 'auto',
                                    backgroundColor: 'linear-gradient(0deg, rgba(2, 134, 142, 0.05), rgba(2, 134, 142, 0.05)), #FFFBFE',
                                    borderRadius: '10px',
                                },
                            }}
                        >
                            <Grid container spacing={0} >
                                <Grid item xs={4} sm={4} md={4}>
                                    {/* <p style={{ color: "#2C2C2C", fontSize: "1.87vw", fontWeight: 600 }}>Upload Technology</p> */}
                                </Grid>
                                <Grid item xs={4} sm={4} md={4}>
                                    <p style={{ textAlign: 'center', font: "Prompt", fontSize: "1.63vw", fontStyle: 'normal', letterSpacing: '-0.04em', fontColor: "#2C2C2C", fontWeight: "400" }}>Add Patent</p>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3}>
                                    {/* <Button variant="contained" style={{ font: "Roboto", fontWeight: 500, textTransform: 'none', fontSize: "1.14vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "1vw 2.2vw", maxHeight: '3.2vw' }}>
                                        Upload Technology
                                    </Button> */}
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} container justify="flex-end">
                                    <button onClick={closeModal} style={{ transform: 'scale(0.6)', width: '1.5vw', height: '1.5vw', borderRadius: '1vw' }}>X</button>
                                </Grid>
                            </Grid>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Patent Title </label>
                                    <input
                                        type="text"
                                        value={patentTitle}
                                        onChange={(e) => setpatentTitle(e.target.value)}
                                        style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginBottom: '2%',
                                        marginLeft: '2%',
                                        marginRight: '2%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Prompt',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        fontSize: '32px',
                                        lineHeight: '48px',
                                        letterSpacing: '-0.04em',
                                        color: '#2C2C2C',
                                    }}
                                >
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Patent Status</label>
                                    <div style={{ position: 'relative', width: '50%' }}>
                                        <select
                                            value={patentStatus}
                                            onChange={(e) => setpatentStatus(e.target.value)}
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#F1FEFF',
                                                border: '0.058vw solid #09A5AF',
                                                paddingRight: '2rem',
                                                paddingLeft: '5px',
                                                appearance: 'none',
                                                MozAppearance: 'none',
                                                WebkitAppearance: 'none',
                                            }}
                                        >
                                            <option value="">Select status</option>
                                            <option value="Filed">Filed</option>
                                            <option value="Published">Published</option>
                                            <option value="Granted">Granted</option>
                                        </select>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '0.5rem',
                                                transform: 'translateY(-50%)',
                                                width: '0',
                                                height: '0',
                                                borderStyle: 'solid',
                                                borderWidth: '0.5rem 0.5rem 0 0.5rem',
                                                borderColor: '#09A5AF transparent transparent transparent',
                                            }}
                                        ></div>
                                    </div>
                                </div>





                                <div
                                    style={{
                                        marginBottom: '2%',
                                        marginLeft: '2%',
                                        marginRight: '2%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Prompt',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        fontSize: '32px',
                                        lineHeight: '48px',
                                        letterSpacing: '-0.04em',
                                        color: '#2C2C2C',
                                    }}
                                >
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Research Lab</label>
                                    <div style={{ position: 'relative', width: '60%' }}>
                                        <select
                                            value={patentLab}
                                            onChange={(e) => setpatentLab(e.target.value)}
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#F1FEFF',
                                                border: '1px solid #09A5AF',
                                                paddingRight: '2rem',
                                                appearance: 'none',
                                                MozAppearance: 'none',
                                                WebkitAppearance: 'none',
                                                paddingLeft: '5px',
                                            }}
                                        >
                                            <option value="">Select Centre</option>
                                            {centers.map(result => (
                                                <option key={result.Name} value={result.Name}>{result.Name}</option>
                                            ))}
                                        </select>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '0.5rem',
                                                transform: 'translateY(-50%)',
                                                width: '0',
                                                height: '0',
                                                borderStyle: 'solid',
                                                borderWidth: '0.5rem 0.5rem 0 0.5rem',
                                                borderColor: '#09A5AF transparent transparent transparent',
                                            }}
                                        ></div>
                                    </div>
                                </div>




                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Patent Number</label>
                                    <input
                                        type="text"
                                        value={patentNumber}
                                        onChange={(e) => setpatentNumber(e.target.value)}
                                        style={{ width: '50%', backgroundColor: "#F1FEFF", border: "1px solid #09A5AF", paddingLeft: '5px' }}
                                    />

                                </div>
                                <div
                                    style={{
                                        marginBottom: '2%',
                                        marginLeft: '2%',
                                        marginRight: '2%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontFamily: 'Prompt',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        fontSize: '32px',
                                        lineHeight: '48px',
                                        letterSpacing: '-0.04em',
                                        color: '#2C2C2C',
                                    }}
                                >
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>
                                        Patent Faculty
                                    </label>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            backgroundColor: '#F1FEFF',
                                            border: '1px solid #09A5AF',
                                            borderRadius: '4px',
                                            padding: '5px',
                                            position: 'relative',
                                        }}
                                    >
                                        {selectedFaculties.map((facultyName, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    padding: '0px 0px 0px 16px',
                                                    background: '#09A5AF',
                                                    boxShadow:
                                                        '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
                                                    borderRadius: '4px',
                                                    color: '#F4EFF4',
                                                    fontFamily: 'Roboto',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    fontSize: '16px',
                                                    lineHeight: '20px',
                                                    letterSpacing: '0.25px',
                                                    marginRight: '5px',
                                                }}
                                            >
                                                <span>{facultyName}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeselect(facultyName);
                                                    }}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        marginLeft: '5px',
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                        <select
                                            value=""
                                            onChange={handleSelectChange}
                                            style={{
                                                flex: '1',
                                                border: 'none',
                                                background: 'none',
                                                outline: 'none',
                                                fontSize: '32px',
                                                lineHeight: '48px',
                                                letterSpacing: '-0.04em',
                                                color: '#2C2C2C',
                                                appearance: 'none',
                                                position: 'relative',
                                                zIndex: '2', // Updated zIndex value
                                                cursor: 'pointer',
                                                paddingLeft: '5px',
                                                paddingRight: '30px',
                                                backgroundColor: '#F1FEFF',
                                            }}
                                        >
                                            <option value="" disabled hidden>
                                                Select a faculty
                                            </option>
                                            {faculties.map((result, index) => (
                                                <option key={index} value={result.Name}>
                                                    {result.Name}
                                                </option>
                                            ))}
                                        </select>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '0.5rem',
                                                transform: 'translateY(-50%)',
                                                width: '0',
                                                height: '0',
                                                borderStyle: 'solid',
                                                borderWidth: '0.5rem 0.5rem 0 0.5rem',
                                                borderColor: '#09A5AF transparent transparent transparent',
                                                backgroundColor: '#F1FEFF', // Add background color
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Patent Year</label>
                                    <input
                                        type="text"
                                        value={patentYear}
                                        onChange={(e) => setpatentYear(e.target.value)}
                                        style={{ width: '50%', backgroundColor: "#F1FEFF", border: "1px solid #09A5AF", paddingLeft: '5px' }}
                                    />

                                </div>







                                <div style={{ bottom: '10px', right: '0%' }}>
                                    <Grid container spacing={0} justify="space-between">
                                        <Grid item xs={4} sm={4} md={4}>
                                            {/* <p style={{ color: "#2C2C2C", fontSize: "1.87vw", fontWeight: 600 }}>Upload Technology</p> */}
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4}>
                                            {/* <p style={{ color: "#2C2C2C", fontSize: "1.87vw", fontWeight: 600 }}>Upload Technology</p> */}
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button type="submit" variant="contained" style={{ font: "Roboto", fontWeight: 500, textTransform: 'none', fontSize: "1.14vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "1vw 2.2vw", maxHeight: '3.2vw' }}>
                                                Upload Patent
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </div>

                            </form>
                        </Modal>
                    </Grid>
                </Grid>
                <p style={{ color: '#2C2C2C', fontSize: "1.73vw", fontWeight: '400', paddingTop: "2vw" }}>
                    Patent Status
                    <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>

                </p>
                <div style={{ fontSize: "1.28vw", fontWeight: 300 }}>
                    <p style={{ color: activeIndex === 9 ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Filed")}>Filed</p>
                    <p style={{ color: activeIndex === 9 ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Published")}>Published</p>
                    <p style={{ color: activeIndex === 9 ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveStatus("Granted")}>Granted</p>
                </div>

            </div>

            <div style={{ padding: "2vw 3vw" }}>
                <p style={{ color: '#2C2C2C', fontSize: "1.73vw", fontWeight: '400' }}>
                    Research Lab
                    <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>

                </p>
                <div style={{ fontSize: "1.28vw", fontWeight: '300' }}>
                    {centers.map(result => (
                        <p style={{ color: activeIndex === 9 ? "#1369CB" : "#2C2C2C", }} onClick={() => setactiveLab(result.Name)}>{result.Name}</p>
                    ))}

                </div>

            </div>


            <div style={{ padding: "0 3vw" }}>
                <p style={{ color: '#2C2C2C', fontSize: "1.73vw", fontWeight: '400' }}>
                    Search By Date
                    <Grid item xs={12} style={{ borderBottom: '0.19vw solid #535353', margin: '0.21vw 0' }}></Grid>

                </p>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} style={{ padding: "1vw 0 5vw 0" }}>
                        <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>Start Date</Typography>
                        <div style={{ position: "relative", width: "100%" }}>
                            <TextField
                                style={{
                                    background: "#FFFFFF",
                                    boxShadow:
                                        "0px 4px 4px rgba(194, 194, 194, 0.25), 4px 4px 4px rgba(163, 163, 163, 0.25)",
                                    width: "100%",
                                    maxWidth: "300px",
                                    margin: "0 auto",
                                }}
                                variant="outlined"
                                size="small"
                                value={startDate.toLocaleDateString()}
                                InputProps={{
                                    endAdornment: (
                                        <FaCalendarAlt
                                            className={classes.icon}
                                            onClick={toggleCalendar1}
                                            style={{ cursor: "pointer", color: "#626262" }}
                                        />
                                    ),
                                }}
                            />
                            {showCalendar1 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        zIndex: "9999",
                                        margin: "0 auto",
                                        maxWidth: "300px",
                                    }}
                                >
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="yyyy/MM/dd"
                                        onClickOutside={() => setShowCalendar1(false)}
                                        inline
                                    />
                                </div>
                            )}
                        </div>

                        <style>
                            {`
  @media (max-width: 600px) {
    .MuiOutlinedInput-root {
      font-size: 12px;
    }
  
    .react-datepicker {
      font-size: 12px;
    }
  }
  `}
                        </style>
                    </Grid>


                    <Grid item xs={12} sm={12} md={12}>
                        <Typography style={{ color: '#2C2C2C', fontSize: "0.97vw", fontWeight: '400', fontFamily: "Prompt" }}>End Date</Typography>
                        <div style={{ position: "relative" }}>
                            <TextField
                                style={{
                                    background: "#FFFFFF",
                                    boxShadow:
                                        "0px 4px 4px rgba(194, 194, 194, 0.25), 4px 4px 4px rgba(163, 163, 163, 0.25)",
                                    width: "100%",
                                    maxWidth: "300px",
                                    margin: "0 auto",
                                }}
                                variant="outlined"
                                size="small"
                                value={endDate.toLocaleDateString()}
                                InputProps={{
                                    endAdornment: (
                                        <FaCalendarAlt
                                            className={classes.icon}
                                            onClick={toggleCalendar2}
                                            style={{ cursor: "pointer", color: "#626262" }}
                                        />
                                    ),
                                }}
                            />
                            {showCalendar2 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        zIndex: "9999",
                                        margin: "0 auto",
                                        maxWidth: "300px",
                                    }}
                                >
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="yyyy/MM/dd"
                                        onClickOutside={() => setShowCalendar2(false)}
                                        inline
                                    />
                                </div>
                            )}
                        </div>

                        <style>
                            {`
  @media (max-width: 600px) {
    .MuiOutlinedInput-root {
      font-size: 12px;
    }
  
    .react-datepicker {
      font-size: 12px;
    }
  }
  `}
                        </style>

                    </Grid>


                </Grid>

            </div>
        </>


    )
}


import { FiChevronDown } from 'react-icons/fi';
import { act } from "react-dom/test-utils"

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        // Handle the click event for each option
        console.log('Clicked option:', option);
    };

    return (
        <div className="dropdown-menu">
            <div className="dropdown-toggle" onClick={handleToggle}>
                Sort By <FiChevronDown />
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    <div className="option" onClick={() => handleOptionClick('oldest')}>
                        Oldest
                    </div>
                    <div className="option" onClick={() => handleOptionClick('newest')}>
                        Newest
                    </div>
                    <div className="option" onClick={() => handleOptionClick('current')}>
                        Current
                    </div>
                </div>
            )}
        </div>
    );
};




function Component2(searchQuery) {

    const [patents, setpatents] = useState([]);

    useEffect(() => {
        // Call your API here and store the response in searchResults state
        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/patents/patents')
            .then(response => response.json())
            .then(data => setpatents(data));
    }, []);
    console.log(patents);
    var filterpatents = patents.filter(tech => {
        console.log(searchQuery);
        return tech.Title.toLowerCase().includes(searchQuery.searchQuery.toLowerCase())
    })
    console.log(searchQuery.sortvar)
    if (searchQuery.sortvar == 1) {
        console.log("hre too");
        filterpatents = filterpatents.sort((a, b) => a.Year - b.Year);
    }
    else if (searchQuery.sortvar == 2) {
        console.log("hre too");
        filterpatents = filterpatents.sort((a, b) => b.Year - a.Year);
    }
    if (searchQuery.activeLab) {
        filterpatents = filterpatents.filter(patent => { return patent.Center_Name == searchQuery.activeLab });
    }
    if (searchQuery.activeStatus) {
        filterpatents = filterpatents.filter(patent => { return patent.Status == searchQuery.activeStatus });
    }

    return (
        <div className="headerContainer" style={{ textAlign: "left" }}>
            <div >
                {filterpatents.map(result => (
                    <Grid item xs={10} sm={10} md={10} style={{ paddingBottom: "6vw" }} key={result.id}>
                        <p style={{ fontWeight: "300", fontSize: "1.5vw" }}> Patent | <span style={{ color: "#1191A3" }}> {result.Center_Name} </span>| <span style={{ color: "#08C089" }}> {result.Year} </span> </p>
                        <p style={{ fontWeight: "500", color: "#2C2C2C", fontSize: "1.83vw" }}>{result.Title}</p>
                        <p style={{ fontWeight: "300", color: "#525252", fontSize: "1.62vw" }}>Application/Patent No - {result.Patent_Number}</p>
                        <p style={{ fontWeight: "400", color: "#A7A6A6" }}>{result.Faculty.map(result2 => (<p>{result2}</p>))}</p>
                    </Grid>
                ))}
            </div>
        </div>

    )
}

function Patent() {

    const [sortOption, setSortOption] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortvar, setsortvar] = useState(0);
    const [sortstring, setsortstring] = useState("None");
    const [activeLab, setactiveLab] = useState("");
    const [activeStatus, setactiveStatus] = useState("");

    // const [varValue, setVarValue] = useState(0);

    // Function to update the 'var' value
    const updatesortVar = () => {
        console.log("here");
        if (sortvar == 0 || sortvar == 2) {
            setsortvar(1);
            setsortstring("Oldest"); // Update 'var' value to 1
        }
        else {
            setsortvar(2);
            setsortstring("Newest");
        }
    };


    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        setIsDropdownOpen(false);
    };

    const handleSortClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <>
            <div style={{ paddingTop: "7vw" }}>

                <Container style={{ maxWidth: "95%", fontFamily: 'Prompt', paddingTop: "2em", margin: "0 0 0 2vw" }}>
                    <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: 0 }}>
                        <span style={{ color: '#9D9D9D', fontWeight: 500 }}>Home / </span>
                        <span style={{ color: '#1F669F', fontWeight: 500 }}> All Patents
                        </span>
                    </p>

                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={6}>
                            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600, margin: 0 }}>All Patents</p>
                            </div>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                                <p onClick={updatesortVar} style={{ fontSize: "1.3vw", margin: 0 }}>Sort By:  {sortstring}</p><DropdownMenu />


                            </div>
                        </Grid>


                        <Grid item xs={11} style={{ borderBottom: '0.27vw solid #535353' }}></Grid>

                    </Grid>



                </Container>


                <div style={{ marginTop: "2rem", display: "flex" }}>


                    <div
                        style={{
                            paddingTop: "1em",
                            width: '24vw',
                            marginRight: '5vw',
                            fontFamily: 'Prompt',
                            height: 'auto',
                            minHeight: '84vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Component1 setSearchQuery={setSearchQuery} setactiveLab={setactiveLab} setactiveStatus={setactiveStatus} />
                    </div>

                    <div style={{
                        width: '72vw',
                        fontFamily: 'Prompt',
                        paddingBottom: "10vw"
                    }}>
                        <Component2 searchQuery={searchQuery} sortvar={sortvar} activeLab={activeLab} activeStatus={activeStatus} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Patent;