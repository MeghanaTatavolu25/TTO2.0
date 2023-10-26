import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Techlicensing.css"
import { Grid, Button, Divider } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Chatbot from "../chatbot/Chatbot"

const Technologylicensing = () => {
  return (
    <>
    <Chatbot />
    <p style={{ fontFamily: "Prompt", fontSize: "1.145vw", margin: "0", padding:" 8vw 3vw 0" }}>
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
                <span style={{ color: '#1F669F', fontWeight: 500 }}> Technology Licensing
                </span>
            </p>
            <Container style={{ maxWidth: "78%", fontFamily: 'Prompt', paddingTop: "1.5vw 0 0", letterSpacing:"0em"}}>
              <Grid container spacing={0} >
                    <Grid item xs={6} sm={6} md={6}>
                        <p style={{color: "#343434", fontSize: "2.49vw", fontWeight: 400, margin: "0", letterSpacing:"-0.04em" }}>Technology Licensing</p>
                    </Grid>
                    <Grid>
                      <div style={{ fontWeight: 400, fontFamily: 'Prompt', color: "#434343", fontSize: "0.98vw"}}>
                        <div style={{background: "#343434", height: "0.156249vw", marginTop:'0.5vw' }}></div>
                        <h2 style={{ fontSize: "1.66vw", fontWeight: 400, margin:"1.2vw 0 0", color: "#2C2C2C"}}>Summary</h2>
                        <p style={{ lineHeight:"1.1vw",margin:"0.2vw",}}>
                          IIIT-H emphasizes the importance of innovations and assists in transiting them into products, processes and services for both commercial benefits and the widest public good. Technology transfer and outreach at IIIT-H is facilitated by the Technology Transfer Office (TTO).TTO manages the transfer process of Intellectual Property (IP) produced in IIIT-H to appropriate bodies including industry, entrepreneurs, etc. and makes all attempts to commercialize the IP. It provides a platform where IP meets potential users and financiers. This in a way contributes towards IIIT-H's primary responsibility of fostering, stimulating and encouraging create activities in science and technology in the widest sense.TTO also manages Product Labs that develops market relevant product prototypes from research output of the Labs at our Institute. Product labs work with industry partners to develop relevant prototypes
                        </p>
                        <p style={{margin:"1vw 0.2vw 0"}}>IIIT-H technology can be leveraged through the following licensing models:</p>
                        <p style={{ fontWeight: 500, margin:"0.3vw 0.2vw 0"}}>IP Exclusivity</p>
                        <ul style={{ listStyleType: 'none', margin: '0.3vw -1.8vw 0', lineHeight: '1.6vw' }}>
                          <li style={{ position: 'relative', paddingLeft: '1em'}}>
                            <span style={{ fontWeight: 500 }}>Exclusive license - </span>The parties agree that no other person/legal entity can exploit the relevant Intellectual Property Rights (IPRs), except the licensee
                          </li>
                          <li style={{ position: 'relative', paddingLeft: '1em' }}>
                            <span style={{ fontWeight: 500 }}>Non-exclusive license - </span>This grants to the licensee the right to use the IPRs, but on a non-exclusive basis. Sublicensing is not preferred.
                          </li>
                        </ul>
                        <h2 style={{ fontSize: "1.66vw", fontWeight: 400, margin:"1.2vw 0 0 0", color: "#2C2C2C" }}>Conditions</h2>
                        <ul style={{margin:"0.3vw -0.7vw 0", lineHeight:"1.6vw"}}>
                          <li>One time purchase</li>
                          <li>Revenue share (royalty)</li>
                          <li>Equity</li>
                        </ul>
                        <p style={{ letterSpacing:"-0.02em" ,margin:"0.5vw 0.2vw 0",lineHeight:"1.2vw"}}>
                          Potential licensees can submit the technology licensing request to <a href="mailto:tto@iiit.ac.in">tto@iiit.ac.in</a>. All requests will be examined by TTO to determine and execute the term sheet for licensing.
                        </p>
                      </div>
                    </Grid>
               </Grid>
            </Container>
    </>
  );
}

export default Technologylicensing;
