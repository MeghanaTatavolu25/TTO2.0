import React from "react"
import { useState, useEffect } from "react";
import "../styles/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Button } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Chatbot from "../chatbot/Chatbot"
import t1 from '../Img/t1.png'
import t2 from '../Img/t2.png'
import t3 from '../Img/t3.png'
import t4 from '../Img/t4.png'
import ImageSlider from "../components/LinkSlider"
import HomeCards from "../components/HomeCards";
import mixpanel from 'mixpanel-browser';
import useWindowDimensions from "./useWindowsDimensions";

const Home = () => {

    const [centers, setCenters] = useState([]);
    const [startup,setstartup]=useState([]);
    const [patent,setpatent]=useState([]);
    const [product,setproduct]=useState([]);
    const [researchLabs, setResearchLabs] = useState([]);
    const [productCenters, setProductCenters] = useState([]);
    const [monthsAgo1, setMonthsAgo1] = useState(null);
    const [monthsAgo2, setMonthsAgo2] = useState(null);
    const [monthsAgo3, setMonthsAgo3] = useState(null);
    const [monthsAgo4, setMonthsAgo4] = useState(null);
    const {width} = useWindowDimensions();
    const [mobileDisplay, setMobileDisplay] = useState(false);

    if(width < 960) {
        if(mobileDisplay == false)
            setMobileDisplay(true);
    }else{
        if(mobileDisplay == true)
            setMobileDisplay(false);

    }
    useEffect(() => {
        // fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
        fetch('http://localhost:3002/api/researchlabs')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);
                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setCenters(randomCenter);
                    let ageText;
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo1(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        // fetch('https://ttobackend.iiithcanvas.com/api/startups')
        fetch('http://localhost:3002/api/startups')
            .then(response => response.json())
            .then(data => {
                // Filter out centers with valid Est_Year values
                const validCenters = data.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);
                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setstartup(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    let ageText;

                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo2(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        Promise.all([
            // fetch('https://ttopatents.iiithcanvas.com/patents/patents'),
            // fetch('https://ttobackend.iiithcanvas.com/api/researchlabs'),
            fetch('http://localhost:3002/api/patents/'),
            fetch('http://localhost:3002/api/researchlabs'),
          ])
            .then(([patentsResponse, researchLabsResponse]) =>
              Promise.all([patentsResponse.json(), researchLabsResponse.json()])
            )
            .then(([patentsData, researchLabsData]) => {
                // Filter out centers with valid Est_Year values
                const validCenters = patentsData.filter(center => center.Published_Date);

                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.Published_Date - a.Published_Date);
                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));
                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    // Update the state with the selected center
                    setpatent(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.Published_Date, new Date());
                    let ageText;
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo3(ageText);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter);

                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
                setResearchLabs(researchLabsData);
            })
            
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);

    const researchLabNames = researchLabs.reduce((map, lab) => {
        map[lab._id] = lab.Research_Lab;
        return map;
      }, {});
    
    useEffect(() => {
        Promise.all([
            // fetch('https://ttobackend.iiithcanvas.com/api/productlab'),
            // fetch('https://ttobackend.iiithcanvas.com/api/researchlabs')
            fetch('http://localhost:3002/api/productlab'),
            fetch('http://localhost:3002/api/researchlabs')
          ])
        .then(([productsResponse, researchLabsResponse]) => Promise.all([productsResponse.json(), researchLabsResponse.json()]))
        .then(([productsData, researchLabsData]) => {
                // Filter out centers with valid Est_Year values
                const validCenters = productsData.filter(center => center.created_at);
                if (validCenters.length > 0) {
                    // Sort the valid centers array based on the Est_Year field in descending order
                    const sortedCenters = validCenters.sort((a, b) => b.created_at - a.created_at);

                    // Get the top 10 centers from the sorted array or centers if there are fewer than 10
                    const top10Centers = sortedCenters.slice(0, Math.min(sortedCenters.length, 10));

                    // Select a random center from the top 10
                    const randomIndex = Math.floor(Math.random() * top10Centers.length);
                    const randomCenter = top10Centers[randomIndex];
                    let ageText;
                    // Update the state with the selected center
                    setproduct(randomCenter);
                    const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    if (monthsDifference < 12) {
                        ageText = `${monthsDifference} Months Old`;
                      } else {
                        const years = Math.floor(monthsDifference / 12);
                        const months = monthsDifference % 12;
                        ageText = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''} Old`;
                      }
                    setMonthsAgo4(ageText);
                    // const monthsDifference = calculateMonthsDifference(randomCenter.created_at, new Date());
                    // setMonthsAgo4(monthsDifference);
                    // Do something with the randomCenter if needed
                    console.log("research lab name:", randomCenter.Name);
                } else {
                    // Handle the case where there are no valid centers with Est_Year values
                    console.log('No valid centers found.');
                }
                setProductCenters(researchLabsData);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch or data processing
                console.error('Error:', error);
            });
    }, []);

    const productCenterName = productCenters.reduce((map, lab) => {
        map[lab._id] = lab.Research_Lab;
        return map;
      }, {});
    const calculateMonthsDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const monthsDifference = (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());
        return monthsDifference;
      };

    // Function to track a navigation event
    const trackNavigation = (explorepagenames) => {
        mixpanel.track('Explore Pages', { 'Explore pages': explorepagenames });
      };

    return (
        <>
            <div className="home" style={{fontFamily: "Prompt" }} >
                <Chatbot />
                <HomeCards />
                <div className="explore_container">
                    <div className="techCat_cont">
                        <div className="home_heading">Technology Catalogue</div>
                        <div className="divider"></div>
                        <div className="tech_cat">
                          <div className="image_container">
                             <div className="wh-img"><img className="img" src={t1} alt="Your image description"/></div>
                          </div>
                          <div className='space'></div>
                          <div className="link">
                            <a href={`/Lab_Technologies/${centers.Research_Lab}/${centers.ResearchLabCode}`} className="title_link">
                                <p className="title_name">{centers.Research_Lab}</p>
                                <p className="description_text" >{centers.Description}</p>
                            </a>
                            <a href="./Technology_Catalogues" className="explore_buttons"
                            onClick={() => {
                                trackNavigation('Explore catalogues'); 
                                mixpanel.track('Explore Pages', { 'Explore pages': 'Explore catalogues' }); 
                            }}
                            >Explore catalogues</a>
                          </div>
                        </div>
                    </div>

                    <div className="startups_cont">
                        <div className="home_heading">Startups</div>
                        <div className="divider"></div>
                        <div className="startups">
                          <div className="link">
                            <a href={startup.Website} className="title_link" target="_blank" >
                                <p className="title_name">{startup.StartUp_Name}</p>
                                <p className="description_text" >{startup.Idea_Description}</p>
                            </a> 
                            <a href="./Startups" className="explore_buttons1"
                                onClick={() => {
                                    trackNavigation('Explore startups'); // Track the Explore Pages event
                                    mixpanel.track('Explore Pages', { 'Explore pages': 'Explore startups' }); // Track the event in Mixpanel
                                }}
                            >Explore startups</a>
                          </div>
                          <div className='space'></div>
                          <div className="image_container1">
                             <div className="wh-img"><img className="img" src={t2} alt="Your image description"/></div>
                          </div>
                        </div>
                    </div>

                    <div className="patents_cont">
                        <div className="home_heading">Patents</div>
                        <div className="divider"></div>
                        <div className="patents">
                          <div className="image_container">
                             <div className="wh-img"><img className="img" src={t3} alt="Your image description"/></div>
                          </div>
                          <div className='space'></div>
                          <div className="link">
                            <p className="title_name">{patent.Title}</p>
                            <div className="description_text">
                            <div >Research Lab - {researchLabNames[patent.Center_Name]}</div>
                            <div className="faculty"> Faculty - {patent.Faculty_List && patent.Faculty_List.length > 1 ? patent.Faculty_List.join(', ') : patent.Faculty_List} </div>
                            </div>
                            <a href="/patents" className="explore_buttons"
                                onClick={() => {
                                  trackNavigation('Explore patents'); // Track the Explore Pages event
                                  mixpanel.track('Explore Pages', { 'Explore pages': 'Explore patents' }); // Track the event in Mixpanel
                                }}
                              >
                                 Explore patents 
                            </a>
                          </div>
                        </div>
                    </div>

                    <div className="products_cont">
                        <div className="home_heading">Products</div>
                        <div className="divider"></div>
                        <div className="products">  
                          <div className="link">
                            <a href={`/Products_Technologies/${productCenterName[product.CentreName]}/${encodeURIComponent(product.NameOfProduct)}`} className="title_link">
                                <p className="title_name">{product.NameOfProduct}</p>
                                <p className="description_text">{product.Description}</p>
                            </a>
                            <a href="./Products" className="explore_buttons1"
                                onClick={() => {
                                    trackNavigation('Explore products'); // Track the Explore Pages event
                                    mixpanel.track('Explore Pages', { 'Explore pages': 'Explore products' }); // Track the event in Mixpanel
                                }}
                            >
                                Explore products 
                            </a>
                          </div>
                          <div className='space'></div>
                            <div className="image_container1">
                                <div className="wh-img"><img className="img" src={t4} alt="Your image description"/></div>
                            </div>
                        </div>
                    </div>

                    <div className="contact_us">
                        <div className="home_heading">Contact us</div>
                        <div className="divider"></div>
                    </div>

                </div>

                <div style={{width: "96%", margin:'auto'}}>
                    <ImageSlider />
                </div>
            </div >
        </>
    );
}
export default Home;