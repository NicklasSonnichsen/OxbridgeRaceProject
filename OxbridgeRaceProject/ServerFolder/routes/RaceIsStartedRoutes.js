const express = require('express');
const RaceIsStartedModel = require('../Models/RaceIsStartedModel');
const app = express();

var bcrypt = require('bcryptjs');

/*
for getting a specific boolean if race is started
*/ 
app.get('/bool/:fld_Id', async (req, res) => {
  
    try {
        const tbl_RaceIsStarted = await RaceIsStartedModel.findOne({fld_Id: req.params.fld_Id},{__v:0,_id:0,fld_Id:0});
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

  //updating a bool 
  app.put('/updateBool/:fld_Id', async(req, res) =>{

    try {
      var updatedBool = req.body;
      const tbl_RaceIsStarted2 = await RaceIsStartedModel.findOneAndUpdate({fld_Id: req.params.fld_Id}, updatedBool);
      if (!tbl_RaceIsStarted2) {
        return res.status(404).send("Cannot find the boolean");
      } else {
        await tbl_RaceIsStarted2.save();
        res.status(200).send({updatedBool});         
      }
    } catch (error) {
      console.log(error.message);
    }
  })

  module.exports = app