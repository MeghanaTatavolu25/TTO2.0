import React from "react"
import "../styles/Home.css"
import bg from "../assets/cc.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Grid, Button, Divider } from '@material-ui/core';
import { Row, Col, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import t1 from '../Img/image 28.png'
import ResponsiveImage from "../components/ResponsiveImage"
import Modal from 'react-modal';


import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from "react";
import upload from '../Img/upload.png'
import axios from 'axios';


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

const SearchBar = ({ setfunction }) => {
    return (
        <Paper
            elevation={0}
            style={{
                backgroundColor: '#EEEEEE',
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                width: '20vw',
                borderRadius: '0.86vw',
                maxHeight: '4vw'
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
                placeholder="Search Catalogue"
                style={{
                    fontSize: "1.3vw",
                    flex: 1,
                }}
                onChange={(e) => { setfunction(e.target.value); console.log(e.target.value) }}
            />

        </Paper>
    );
};



function Catalogue() {
    const [technologies, setTechnologies] = useState([]);
    const [centers, setCenters] = useState([]);
    const [faculties, setFaculties] = useState([]);
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

    useEffect(() => {
        // Call your API here and store the response in searchResults state
        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/tech/technologies')
            .then(response => response.json())
            .then(data => setTechnologies(data));

        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/center/centers')
            .then(response => response.json())
            .then(data => setCenters(data));

        fetch('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/faculty/faculties')
            .then(response => response.json())
            .then(data => setFaculties(data));


    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [techName, settechName] = useState("");
    const [techCenter, settechCenter] = useState("");
    const [techFaculty, settechFaculty] = useState("");
    const [techOverview, settechOverview] = useState("");
    const [techDescription, settechDescription] = useState("");
    const [potentialApplications, setpotentialApplications] = useState("");
    const [relatedPublications, setrelatedPublications] = useState("");
    const [typeOfWork, settypeOfWork] = useState("");
    const [stateofWork, setstateofWork] = useState("");
    const [demoLink, setdemoLink] = useState("");

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTech = {
            Name: techName,
            CenterName: techCenter,
            FacultyName: techFaculty,
            Overview: techOverview,
            Description: techDescription,
            Potential_Applications: potentialApplications,
            Related_Publications: relatedPublications,
            Type_of_Work: typeOfWork,
            State_of_Work: stateofWork,
            Demo_Link: demoLink

        }
        axios.post('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:4000/tech/technology', newTech)
            .then(function (res) {
                window.location = "/catalogue/admin"

            });
    }

    const filteredtech = technologies.filter(tech => {
        return tech.Name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <>
            <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: 0, paddingLeft: "3vw", paddingTop: "9vw" }}>
                <span style={{ color: '#9D9D9D', fontWeight: 500 }}>Home / </span>
                <span style={{ color: '#1F669F', fontWeight: 500 }}> Technology Catalogue
                </span>
            </p>
            <Container style={{ maxWidth: "80%", fontFamily: 'Prompt', paddingTop: "3vw" }}>

                <Grid container spacing={0} >
                    <Grid item xs={6} sm={6} md={6}>
                        <p style={{ color: "#2C2C2C", fontSize: "2.87vw", fontWeight: 600 }}>Technology Catalogue</p>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} container justify="flex-end">
                        <Paper style={{ maxHeight: 60, marginRight: 40, backgroundColor: "#09A5AF", padding: "0.35vw 0", borderRadius: "0.86vw" }}>
                            <span onClick={openModal} style={{ fontSize: "1.3vw", color: "#FFFFFF", paddingRight: 20 }}>&nbsp;<ResponsiveImage src={upload} maxHeight={20} maxWidth={40} />&nbsp; Upload</span>
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
                                    <p style={{ textAlign: 'center', font: "Prompt", fontSize: "1.63vw", fontColor: "#2C2C2C", fontWeight: "400" }}>Add Technology</p>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3}>
                                    {/* <Button variant="contained" style={{ font: "Roboto", fontWeight: 500, textTransform: 'none', fontSize: "1.14vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "1vw 2.2vw", maxHeight: '3.2vw' }}>
                                        Upload Technology
                                    </Button> */}
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} container justify="flex-end">
                                    <button onClick={closeModal} style={{ transform: 'scale(0.6)', width: '1.5vw', height: '1.5vw', borderRadius: '50%', border: '1px solid #49454F', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', color: '#49454F', fontWeight: 'bold', fontSize: '1vw' }}>
                                        X
                                    </button>
                                </Grid>
                            </Grid>




                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Name</label>
                                    <input
                                        type="text"
                                        value={techName}
                                        onChange={(e) => settechName(e.target.value)}
                                        style={{ width: '50%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}
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
                                        fontSize: '27px',
                                        lineHeight: '48px',
                                        letterSpacing: '-0.04em',
                                        color: '#2C2C2C',
                                    }}
                                >
                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Center Name</label>
                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <select
                                            value={techCenter}
                                            onChange={(e) => settechCenter(e.target.value)}
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#F1FEFF',
                                                border: '1px solid #09A5AF',
                                                boxSizing: 'border-box',
                                                paddingLeft: '5px',
                                                paddingRight: '1px',
                                                appearance: 'none',
                                                MozAppearance: 'none',
                                                WebkitAppearance: 'none',
                                                fontWeight: 300
                                            }}
                                        >
                                            <option value="">Select centre</option>
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
                                        fontSize: '27px',
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
                                                fontSize: '27px',
                                                lineHeight: '48px',
                                                letterSpacing: '-0.04em',
                                                color: '#2C2C2C',
                                                appearance: 'none',
                                                position: 'relative',
                                                zIndex: '1',
                                                cursor: 'pointer',
                                                paddingLeft: '5px',
                                                paddingRight: '30px',
                                                backgroundColor: '#F1FEFF',
                                                fontWeight: 300
                                            }}
                                        >
                                            <option value="" disabled hidden>
                                                Add faculty
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










                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Overview of Technology</label>
                                    <input
                                        type="text"
                                        value={techOverview}
                                        onChange={(e) => settechOverview(e.target.value)}
                                        style={{ width: '100%', height: '14vh', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

                                    />
                                </div>

                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Description of Technology</label>
                                    <input
                                        type="text"
                                        value={techDescription}
                                        onChange={(e) => settechDescription(e.target.value)}
                                        style={{ width: '100%', height: '14vh', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

                                    />
                                </div>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Potential Applications</label>
                                    <input
                                        type="text"
                                        value={potentialApplications}
                                        onChange={(e) => setpotentialApplications(e.target.value)}
                                        style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

                                    />
                                </div>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Related Publications</label>
                                    <input
                                        type="text"
                                        value={relatedPublications}
                                        onChange={(e) => setrelatedPublications(e.target.value)}
                                        style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

                                    />
                                </div>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Type of Work</label>
                                    <input
                                        type="text"
                                        value={typeOfWork}
                                        onChange={(e) => settypeOfWork(e.target.value)}
                                        style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

                                    />
                                </div>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>State of Work</label>
                                    <input
                                        type="text"
                                        value={stateofWork}
                                        onChange={(e) => setstateofWork(e.target.value)}
                                        style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

                                    />
                                </div>
                                <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '27px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

                                    <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Demo Link</label>
                                    <input
                                        type="text"
                                        value={demoLink}
                                        onChange={(e) => setdemoLink(e.target.value)}
                                        style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

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
                        <SearchBar setfunction={setSearchQuery} />
                    </Grid>


                    <Grid item xs={12} style={{ borderBottom: '0.27vw solid #535353' }}></Grid>

                    <Grid container spacing={0}>
                        {filteredtech.map(result => (
                            <Grid xs={4} sm={4} md={4} key={result.id}>
                                <Grid container style={{ padding: "2.5vw 0" }}>
                                    <Grid item xs={2} sm={2} md={2}>
                                        <ResponsiveImage src={t1} alt="icon" maxWidth={100} maxHeight={100} />
                                    </Grid>

                                    <Grid item xs={8} sm={8} md={8}>
                                        <a href={`/technology/${result._id}`} style={{ fontSize: "1.19vw", color: "#353535", fontWeight: "300", textDecoration: "None" }}>{result.Name}</a>
                                        <p style={{ fontSize: "0.97vw", color: "#757575", fontWeight: "300" }}>{result.Description}</p>
                                        <p style={{ fontSize: "0.97vw", color: "#757575", fontWeight: "300" }}>{result.CenterName}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}

                    </Grid>



                </Grid>
            </Container >
        </>
    )
}


export default Catalogue




////
// 1. Compile all the APIs for technologies and patents and form a document
// 2. Add more fields to addition of tech and patent
// Implement the search funcitonality 
// 3. Try to improve the UI and final display
// 
// 4. Compile all the rest APIs like centers,publications etc.