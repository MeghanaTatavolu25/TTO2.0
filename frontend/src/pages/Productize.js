import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Chatbot from '../chatbot/Chatbot';

const Technologylicensing = () => {
  return (
    <>
    <Chatbot />
    <p style={{ fontFamily: "Prompt", fontSize: "1.145vw", margin: "0" }}>
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
                <span style={{ color: '#1F669F', fontWeight: 500 }}> Productize
                </span>
            </p>
            <Container style={{ maxWidth: "80%", fontFamily: 'Prompt', paddingTop: "1.2vw"}}>
              <Grid container spacing={0} >
                    <Grid item xs={6} sm={6} md={6}>
                        <p style={{color: "#343434", fontSize: "2.7041vw", fontWeight: 600, margin: "0" }}>Product Labs</p>
                    </Grid>
                    <Grid>
                      <div style={{ fontWeight: 400, fontFamily: 'Prompt', color: "#434343", fontSize: "0.92vw"}}>
                        <div style={{ background: "#343434", height:"0.2vw"}}></div>
                        <h2 style={{ fontSize: "1.66vw", fontWeight: 400, margin:"1vw 0 0", color: "#2C2C2C"}}>Summary</h2>
                        <p style={{ lineHeight:"1.1vw",margin:"0.2vw"}}>
                           IIIT-H emphasizes the importance of innovations and assists in transiting them into products, processes and services for both commercial benefits and the widest public good. Technology transfer and outreach at IIIT-H is facilitated by the Technology Transfer Office (TTO).TTO manages the transfer process of Intellectual Property (IP) produced in IIIT-H to appropriate bodies including industry, entrepreneurs, etc. and makes all attempts to commercialize the IP. It provides a platform where IP meets potential users and financiers. This in a way contributes towards IIIT-H's primary responsibility of fostering, stimulating and encouraging create activities in science and technology in the widest sense.TTO also manages Product Labs that develops market relevant product prototypes from research output of the Labs at our Institute. Product labs work with industry partners to develop relevant prototypes
                        </p>
                        <p style={{margin:"0.8vw 0.2vw 0"}}>Product labs is the market relevant product engineering arm of technology transfer office (TTO) that:</p>
                        <ul style={{margin:"0.3vw -0.8vw 0", lineHeight:"1.4vw"}}>
                            <li>Curates & Brings Relevant Market/Business Insights to the institute</li>
                            <li>Defines products based on market potential</li>
                            <li>Enables Market/Licensing Readiness Of Institute Research</li>
                            <li>Identifies “Go To Market” Owner & Collaborates with partnering Corporates/Investors</li>
                        </ul>
                        <h2 style={{ fontSize: "1.66vw", fontWeight: 400, margin:"1.2vw 0 0 0", color: "#2C2C2C" }}>Product Labs Programs</h2>
                        <ul style={{margin:"0.4vw -0.7vw 0", lineHeight:"1.3vw"}}>
                          <li>Entrepreneur In Residence - Build your startup using our technologies and we will enable your MVP development.</li>
                          <li>Corporate Innovation - We develop prototypes aligned to sponsor’s areas of interest. You could be a company/incubator/VC/Investor</li>
                          <li>Social Innovation - Enables technology for larger social good. We develop the prototype.</li>
                        </ul>
                        <p style={{ margin:"0.9vw 0.2vw 0",lineHeight:"1.2vw"}}>
                           Potential licensees can submit the technology licensing request to tto@iiit.ac.in All requests will be examined by TTO to determine and execute the term sheet for licensing.
                        </p>
                      </div>
                    </Grid>
               </Grid>
            </Container>
    </>
  );
}

export default Technologylicensing;
