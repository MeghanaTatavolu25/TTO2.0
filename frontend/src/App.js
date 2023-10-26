import "./App.css"
import AdminJS from "./pages/Admin"
import Home from "./pages/Home"
import Products_Technologies from "./pages/Products_Technologies"
import Lab_Technologies from "./pages/Lab_Technologies"
import Technologylicensing from "./pages/Technologylicensing"
import Productize from "./pages/Productize"
import Startups from "./pages/Startups"
import Team from "./pages/Team"
import Technology_Catalogues from "./pages/Technology_Catalogues"
import Products from "./pages/Products"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar"
import AdminPatent from "./pages/AdminPatents"
import Patent from "./pages/Patents"
import Publications from "./pages/Publications"
import Randomtry from "./pages/use"
import Footbar from "./Footer/Footbar"
import AdminCatalogue from "./pages/AdminCatalogue"
import JobSeeker from "./pages/JobSeeker"
import Entrepreneur from "./pages/Entrepreneur"
import Industry from "./pages/Industry"
import React, {useEffect } from 'react';
import mixpanel from "mixpanel-browser"; 

function App() {
  useEffect(() => {
    // Initialize Mixpanel with your project token
    mixpanel.init("496f9fe244ac2b6ad3115540f31c60f1");
  }, []);
  
    return (

        <div className="App" >
            <Router>
            <div className="fixed-navbars">  
              <Navbar/> 
            </div>
                <Switch>
                  <div className="pagesall">
                    <Route path="/" exact component={Home} />
                    <Route path="/catalogue/admin" exact component={AdminCatalogue} />
                    <Route path="/patents" exact component={Patent} />
                    <Route path="/publications" exact component={Publications} />
                    <Route path="/patents/admin" exact component={AdminPatent} />
                    <Route path="/try" exact component={Randomtry} />
                    <Route path="/Technologylicensing" component={Technologylicensing}/>
                    <Route path="/Productize" component={Productize} />
                    <Route path="/Startups" component={Startups} />
                    <Route path="/Products" component={Products} />
                    <Route path="/Technology_Catalogues" component={Technology_Catalogues} />
                    <Route path="/Products_Technologies/:LabName/:ProductName" component={Products_Technologies} />
                    <Route path="/Lab_Technologies/:LabName" component={Lab_Technologies} />
                    <Route path="/Team" component={Team} />
                    <Route path="/JobSeeker"component={JobSeeker} />
                    <Route path="/Industry"component={Industry} />
                    <Route path="/Entrepreneur"component={Entrepreneur} />
                    <Route path="/admin" component={AdminJS} />
                   
                    {/* <Route path="/chat" exact component={LoginPage} /> */}
                    {/* <Route path="/chathome" exact component={HomePage} /> */}

                    {/* <h1>asDada</h1> */}
                  </div>
                </Switch>

              <div className="TTO_Footer">
                <Footbar/>
              </div>
            </Router>

        </div>

    );
}
export default App;