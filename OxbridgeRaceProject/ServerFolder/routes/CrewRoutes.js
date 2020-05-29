const express = require('express');
const CrewModel = require('../Models/CrewModel');
const app = express();

// AUTHENTICATION

var auth = false;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

app.get('/crew', async (req, res) => {
  const tbl_Crew = await CrewModel.find({});

  try {
    res.send(tbl_Crew);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/crew/:fld_CrewName', async (req, res) => {

  //Should search for the specified crew by their crew name
  const tbl_Crew = await CrewModel.find({ fld_CrewName: req.params.fld_CrewName});
  try {
    res.send(tbl_Crew);
    console.log(res.fld_CrewName);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Remember to decrypt password on phone
app.post('/crew', async (req, res) => {
    const tbl_Crew = new CrewModel(req.body);
    console.log(tbl_Crew.fld_Password);
    var hashedPassword = bcrypt.hashSync(req.body.fld_Password, 10);
    tbl_Crew.fld_Password = hashedPassword;
    console.log(tbl_Crew.fld_Password);
    try {
      await tbl_Crew.save();
      res.send(tbl_Crew);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete('/crew/:fld_CrewName', async (req, res) => {
    try {
      const tbl_Crew = await CrewModel.deleteOne({fld_CrewName: req.params.fld_CrewName})
  
      if (!tbl_Crew) res.status(404).send("No item found");
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/crew/:fld_CrewName', async (req, res) => {
    try {
      await CrewModel.replaceOne({fld_CrewName: req.params.fld_CrewName}, req.body)
      await CrewModel.save()
      res.send(tbl_Crew)
    } catch (err) {
      res.status(500).send(err)
    }
  })


app.post('/logincrew', async (req, res) => {
    const tbl_Crew = await CrewModel.findOne({ fld_CrewName: req.body.fld_CrewName })
    try {

        var passwordIsValid = bcrypt.compare(req.body.fld_Password, tbl_Crew.fld_Password, (error, success) => {
            if (success) {
                res.send(tbl_Crew);
            } else {
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error)
    }
})

module.exports = app