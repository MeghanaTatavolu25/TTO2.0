import React from "react"
import "../styles/Home.css"
import bg from "../assets/cc.jpg"
import Navbar from "../components/Navbar"
import Navbar2 from "../components/Navbar2"
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
                onChange={(e) => {setfunction(e.target.value); console.log(e.target.value)}}
            />

        </Paper>
    );
};



function Catalogue() {
    const [technologies, setTechnologies] = useState([]);
    const [centers, setCenters] = useState([]);
    const [faculties, setFaculties] = useState([]);

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
                window.location = "/brief"

            });

        alert(`The name you entered was: ${techName}`)
    }

    const filteredtech = technologies.filter(tech => {
        return tech.Name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <>
            <p style={{ fontFamily: "Montserrat", fontSize: "1.1vw", margin: 0, paddingLeft: "3vw", paddingTop: "9vw" }}>
                <span style={{ color: '#9D9D9D', fontWeight: 500 }}>Home / CVIT /</span>
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
                            <span onClick={openModal} style={{ fontSize: "1.3vw", color: "#FEFEFE", paddingRight: 20 }}>&nbsp;<ResponsiveImage src={upload} maxHeight={20} maxWidth={40} />&nbsp; Upload</span>
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
                                    backgroundColor: '#F1FEFF;',
                                },
                                content: {
                                    width: '60%',
                                    height: '60%',
                                    margin: 'auto',
                                },
                            }}
                        >
                           



                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Name:</label>
                                    <input
                                        type="text"
                                        value={techName}
                                        onChange={(e) => settechName(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Center Name:

                                        <select value={techCenter} onChange={(e) => settechCenter(e.target.value)} style={{ flex: '1', maxWidth: '300px' }}>
                                            {centers.map(result => (
                                                <option value={result.Name}>{result.Name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Faculty Name:
                                        <select value={techCenter} onChange={(e) => settechCenter(e.target.value)} style={{ flex: '1', maxWidth: '300px' }}>
                                            {faculties.map(result => (
                                                <option value={result.Name}>{result.Name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Overview of Technology :</label>
                                    <input
                                        type="text"
                                        value={techOverview}
                                        onChange={(e) => settechOverview(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px', height: '300px' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Description of Technology :</label>
                                    <input
                                        type="text"
                                        value={techDescription}
                                        onChange={(e) => settechDescription(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px', height: '300px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Potential Applications :</label>
                                    <input
                                        type="text"
                                        value={potentialApplications}
                                        onChange={(e) => setpotentialApplications(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px', height: '300px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Related Publications :</label>
                                    <input
                                        type="text"
                                        value={relatedPublications}
                                        onChange={(e) => setrelatedPublications(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px', height: '300px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Type of Work :</label>
                                    <input
                                        type="text"
                                        value={typeOfWork}
                                        onChange={(e) => settypeOfWork(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px', height: '300px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>State of Work :</label>
                                    <input
                                        type="text"
                                        value={stateofWork}
                                        onChange={(e) => setstateofWork(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px', height: '300px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ flex: '0 0 200px' }}>Demo Link :</label>
                                    <input
                                        type="text"
                                        value={demoLink}
                                        onChange={(e) => setdemoLink(e.target.value)}
                                        style={{ flex: '1', maxWidth: '300px' }}
                                    />
                                </div>

                                <input type="submit" value="Submit" />
                            </form>
                        </Modal>
                        <SearchBar setfunction={setSearchQuery}/>
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
                                        <a href={`/patent/${result._id}`} style={{ fontSize: "1.19vw", color: "#353535", fontWeight: "300", textDecoration: "None" }}>{result.Name}</a>
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