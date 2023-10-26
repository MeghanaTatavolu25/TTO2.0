import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/contactUs.css"
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import upArrow from  '../Img/uploadArrow.png'
import axios from 'axios';
import Chatbot from '../chatbot/Chatbot';


const Enterpreneur = () => {
  const [startupName, setStartupName] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [founderName, setFounderName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [helpNeed, setHelpNeed] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Startup Name:', startupName);
    console.log('Problem Statement:', problemStatement);
    const authToken = localStorage.getItem('authToken');

    try {
      const newEntrepreneur = {
        StartUp_Name: startupName,
        Problem_Statement: problemStatement,
        Founder_Name: founderName,
        Email_Id: email,
        Phone_Number: phoneNumber,
        WhatHelpYouNeedFromiiit: helpNeed,
      };
      console.log(newEntrepreneur);
     
      // const response =  await axios.post(' http://localhost:3002/admin/api/resources/Entrepreneur/actions/new', newEntrepreneur, {
      const response =  await axios.post('https://ttobackend.iiithcanvas.com/admin/api/resources/Entrepreneur/actions/new', newEntrepreneur, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      })
      .then(function (res) {
        window.location = "/Entrepreneur"
      })
      console.log(response.data);
      console.log('Form data submitted successfully!');
      } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <>
    <Chatbot />
    <p style={{ fontFamily: "Prompt", fontSize: "1.145vw", margin: "0"}}>
        <a  href="/" 
            style={{ textDecoration: 'none', color: '#9D9D9D'}} 
            onMouseEnter={(e) => {
            e.target.style.color = '#1369CB';
            e.target.style.fontWeight = 600;
            }}
            onMouseLeave={(e) => {
            e.target.style.color = '#9D9D9D';
            e.target.style.fontWeight = 500;
            }}
            >
                <span>Home </span>/
        </a>
        <span style={{ color: '#1F669F', fontWeight: 500 }}> Entrepreneur</span>
    </p>
    <Container style={{ maxWidth: "76%", fontFamily: 'Prompt', paddingTop: "1.2vw", letterSpacing:"0em"}}>
        <Grid container spacing={0} >
            <Grid item xs={6} sm={6} md={6}>
                <p style={{color: "#343434", fontSize: "2.7041vw", fontWeight: 600, margin: "0", letterSpacing:"-0.04em" }}>Contact us</p>
            </Grid>
            <div className="form-container">
                <div style={{ background: "#343434", height:"0.15vw"}}></div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="startupName">
                            Startup name<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="startupName"
                            placeholder="Enter startup name"
                            value={startupName}
                            onChange={(e) => setStartupName(e.target.value)}
                            required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="problemStatement">
                            Problem Statement<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="problemStatement"
                            placeholder="Type here"
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            style={{height:"9vw"}}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="founderName">
                            Founder name<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="founderName"
                            placeholder="Enter founder name"
                            value={founderName}
                            onChange={(e) => setFounderName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="email">
                            Email Id<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="email"
                            id="email"
                            placeholder="Enter email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </div> 
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="phoneNumber">
                            Phone Number<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="tel"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="helpNeed">
                            What help you need <br></br> from IIIT<span className="required" style={{ color: "#F83333" }}>*</span>
                            </label>
                            <input
                            className='input'
                            type="text"
                            id="helpNeed"
                            placeholder="Type here"
                            value={helpNeed}
                            onChange={(e) => setHelpNeed(e.target.value)}
                            style={{height:"5.5vw"}}
                            required
                            />
                        </div>
                    </div>
                    <div className="confrim">
              <input
                  className='checkbox'
                  type="checkbox"
                  checked={confirmation}
                  onChange={(e) => setConfirmation(e.target.checked)}
              />
              <p>I hereby confirm that all the above-mentioned information is true to the best of my knowledge. If found incorrect at any stage in the process, my candidature stands cancelled.</p>
            </div>

            <div className="register">
              <button className='button' type="submit" disabled={!confirmation} style={{ cursor: confirmation ? 'pointer' : 'not-allowed' }}>
              Register
              </button>
            </div>     
          </form>
        </div>
      </Grid>
    </Container>
    </>
  );
};

export default Enterpreneur;
