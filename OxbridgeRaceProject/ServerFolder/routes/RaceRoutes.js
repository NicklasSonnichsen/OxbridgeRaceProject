const express = require('express');
const RaceModel = require('../Models/RaceModel.js');
const app = express();


//gets all entries in the tbl_races in mongodb
app.get('/race', async (req, res) => {
  const tbl_RaceCategory = await RaceModel.find({});

  try {
    res.send(tbl_RaceCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Should search for the specified race by city (will be changed )
app.get('/race/:fld_Zipcode', async (req, res) => {

  const tbl_Race = await RaceModel.find({ fld_Zipcode: req.params.fld_Zipcode});
  try {
    res.send(tbl_Race);
    console.log(res.fld_Zipcode);
  } catch (err) {
    res.status(500).send(err);
  }
});

//post new race to the database
app.post('/race', async (req, res) => {
    const tbl_Race = new RaceModel(req.body);
  
    try {
      await tbl_Race.save();
      res.send(tbl_Race);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //delete from searched zipcode
  app.delete('/race/:fld_Zipcode', async (req, res) => {
    try {
      const tbl_Race = await RaceModel.deleteOne({fld_Zipcode: req.params.fld_Zipcode})
  
      if (!tbl_Race) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  //patch from searched zipcode, JSON body required
  app.patch('/race/:fld_Zipcode', async (req, res) => {
    try {
        await RaceModel.updateOne({fld_Zipcode: req.params.fld_Zipcode}, req.body)
        await RaceModel.save()
        res.send(tbl_Race)
      } catch (err) {
        res.status(500).send(err)
      }
  })

module.exports = app