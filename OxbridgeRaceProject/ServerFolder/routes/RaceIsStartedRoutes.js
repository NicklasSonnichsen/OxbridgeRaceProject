const express = require('express');
const RaceIsStartedModel = require('../Models/RaceIsStartedModel');
const app = express();

var bcrypt = require('bcryptjs');

/*
for getting a specific boolean if race is started
*/ 
app.get('/bool/:fld_Id', async (req, res) => {
  
    try {
        const tbl_RaceIsStarted = await RaceIsStartedModel.find({});
        res.status(200).send(tbl_RaceIsStarted);
    } catch (error) {
      res.status(500).send(error)
    }
  });
  /* 
    posting a new bool
  */
  app.post('/bool', async (req, res) => {
  
    const tbl_RaceIsStarted = new RaceIsStartedModel(req.body);
    try {
        tbl_RaceIsStarted.save();
        res.status(200).send(tbl_RaceIsStarted);

    } catch (error) {
      console.log(error);
    }
  })

  

  module.exports = app