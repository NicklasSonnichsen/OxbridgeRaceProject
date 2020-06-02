const express = require('express');
const RaceModel = require('../Models/RaceModel.js');
const app = express();
var date = Date.now();


//gets all entries in the tbl_races in mongodb
app.get('/race', async (req, res) => {
  const tbl_Race = await RaceModel.find({});

  try {
    res.send(tbl_Race);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Should search for the specified race by fld_RaceName (will be changed )
app.get('/race/:fld_RaceName', async (req, res) => {

  const tbl_Race = await RaceModel.find({ fld_RaceName: req.params.fld_RaceName});
  try {
    res.send(tbl_Race);
    console.log(res.fld_RaceName);
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

  //delete from searched fld_RaceName
  app.delete('/race/:fld_RaceName', async (req, res) => {
    try {
      const tbl_Race = await RaceModel.deleteOne({fld_RaceName: req.params.fld_RaceName})
  
      if (!tbl_Race) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  //patch from searched fld_RaceName, JSON body required
  app.patch('/race/:fld_RaceName', async (req, res) => {
    try {
        await RaceModel.updateOne({fld_RaceName: req.params.fld_RaceName}, req.body)
        await RaceModel.save()
        res.send(tbl_Race)
      } catch (err) {
        res.status(500).send(err)
      }
  })


  //Should search for the specified race by fld_RaceName (will be changed )
app.get('/racedate', async (req, res) => {

  const tbl_Race = await RaceModel.find();
  try {
    res.send(tbl_Race.fld_Date);
    console.log(res.fld_Date);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = app