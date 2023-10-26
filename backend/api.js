import express from 'express'

import Team         from './collection/team.mjs'
import Patent       from './collection/patent.mjs'
import StartUp      from './collection/startup.mjs'
import Faculty      from './collection/faculties.mjs'
import Industry     from './collection/industry.mjs'
import Research     from './collection/research_labs.mjs'
import JobSeeker    from './collection/jobSeeker.mjs'
import Technology   from './collection/technologies.mjs'
import ProductLab   from './collection/productlab.mjs'
import Publication  from './collection/publication.mjs';
import PatentStatus from './collection/status.mjs'
import Entrepreneur from './collection/entrepreneur.mjs'

const app = express()
export const apiRouter = express.Router();

  apiRouter.get('/patents', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const patents = await Patent.find();
      
      // Send the response with the retrieved patents
      res.json(patents);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve patents' });
    }
  });

  apiRouter.get('/startups', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const startUps = await StartUp.find();
      
      // Send the response with the retrieved patents
      res.json(startUps);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Start Ups' });
    }
  });

  apiRouter.get('/teams', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const teams = await Team.find();
      
      // Send the response with the retrieved teams
      res.json(teams);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Start Ups' });
    }
  });

  apiRouter.get('/researchlabs', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const patents = await Research.find();
      
      // Send the response with the retrieved patents
      res.json(patents);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Research Labs' });
    }
  });

  apiRouter.get('/technologies', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const technologies = await Technology.find();
      
      // Send the response with the retrieved patents
      res.json(technologies);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve technologies' });
    }
  });

  apiRouter.get('/productlab', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const productlab = await ProductLab.find();
      
      // Send the response with the retrieved patents
      res.json(productlab);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve productlab' });
    }
  });

  apiRouter.get('/faculties', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const faculties = await Faculty.find();
      
      // Send the response with the retrieved patents
      res.json(faculties);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Faculties' });
    }
  });

  apiRouter.get('/publications', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const publications = await Publication.find();
      
      // Send the response with the retrieved patents
      res.json(publications);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve publications' });
    }
  });
  // apiRouter.post('/../admin/resources/Entrepreneur/actions/new', async (req, res) => {

  apiRouter.post('/../admin/resources/Entrepreneur', async (req, res) => {
    if(error)   res.status(400).send(error.details[0].message);

    const entrepreneur = new Entrepreneur({
      StartUp_Name: req.body.StartUp_Name,
      Problem_Statement: req.body.Problem_Statement,
      Founder_Name: req.body.Founder_Name,
      Email_Id: req.body.Email_Id,
      Phone_Number: req.body.Phone_Number,
      WhatHelpYouNeedFromiiit: req.body.WhatHelpYouNeedFromiiit,
    })
    await entrepreneur.save();
    res.send(entrepreneur);
  });

  apiRouter.post('/../admin/resources/Job_Seeker', async (req, res) => {
    // if(error)   res.status(400).send(error.details[0].message);

    const jobseeker = new JobSeeker({
      Name: req.body.Name,
      Position: req.body.Position,
      Email_id: req.body.Email_id,
      Phone_Number: req.body.Phone_Number,
      Skills: req.body.Skills,
      UploadResume: req.body.UploadResume,
    })
    await jobseeker.save();
    res.send(jobseeker);
  });

  apiRouter.post('/../admin/resources/Industry', async (req, res) => {
    if(error)   res.status(400).send(error.details[0].message);

    const industry = new Industry({
      Name_of_comapny: req.body.Name_of_comapny,
      Contact_person_Name: req.body.Contact_person_Name,
      Position: req.body.Position,
      Email_Id: req.body.Email_Id,
      PhoneNumber: req.body.PhoneNumber,
      Query: req.body.Query,
    })
    await industry.save();
    res.send(industry);
  });

  apiRouter.get('/entrepreneur', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const entrepreneur = await Entrepreneur.find();
      
      // Send the response with the retrieved patents
      res.json(entrepreneur);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Entrepreneurs' });
    }
  });

  apiRouter.get('/jobseeker', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const jobseeker = await JobSeeker.find();
      
      // Send the response with the retrieved patents
      res.json(jobseeker);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Job Seekers' });
    }
  });

  apiRouter.get('/industry', async (req, res) => {
    try {
      // Retrieve the patent records from the database
      const industry = await Industry.find();
      
      // Send the response with the retrieved patents
      res.json(industry);
    } catch (error) {
      // Handle any errors that occur during the retrieval
      res.status(500).json({ error: 'Failed to retrieve Industries' });
    }
  });

  apiRouter.get('/patentStatus', async (req, res) => {
    try {
      const patentStatus = await PatentStatus.find();      
      res.json(patentStatus);
    } 
    catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Research Labs' });
    }
  });

  // Mount the API router on a specific route
  app.use('/api', apiRouter);