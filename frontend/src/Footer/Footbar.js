import React from "react";
import "./Footer.css";
import call_img from './call.png'
import mail_img from './mail.png'
import { Grid, Paper, Button, Divider } from '@material-ui/core';
const Footbar = () => {
  return (

    <div className="tto-footer">
      <div className="footbar_container" >
        <div className="contact_details">
          <div className="mobile_no" >
            <div className="call_img"> <img src={call_img} alt="icon" /></div>
            <div className="number"> 91-0990897689</div>
          </div>

          <div className="mail_id">
            <div className="mail_img"> <img src={mail_img} alt="icon" /></div>
            <div className='mail'> www.tto.iiit.ac.in</div>
          </div>
        </div>

        <div className="about_us">
          <div className="abt_us_text">About us</div>
          <div className="abtUs_description" >We manages the transfer process of Intellectual Property (IP) produced in IIIT-H to appropriate bodies including industry, entrepreneurs, etc. and makes all attempts to commercialize the IP. We provides a platform where IP meets potential users and financiers. This in a way contributes towards IIIT-H's primary responsibility of fostering, stimulating and encouraging create activities in science and technology in the widest sense. </div>
        </div>
      </div>
    </div>
  );
}

export default Footbar;