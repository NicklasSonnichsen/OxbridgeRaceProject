const express = require('express');
const AdminModel = require('../Models/AdminModel');
const app = express();

// AUTHENTICATION

var auth = false;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

app.get('/admin', async (req, res) => {
  const tbl_Crew = await AdminModel.find({});

  try {
    res.send(tbl_Crew);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/admin/:fld_AdminName', async (req, res) => {

  //Should search for the specified crew by their crew name
  const tbl_Admin = await AdminModel.find({ fld_AdminName: req.params.fld_AdminName});
  try {
    res.send(tbl_Admin);
    console.log(res.fld_AdminName);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Remember to decrypt password on phone
app.post('/admin', async (req, res) => {
    const tbl_Admin = new AdminModel(req.body);
    console.log(tbl_Admin.fld_Password);
    var hashedPassword = bcrypt.hashSync(req.body.fld_Password, 10);
    tbl_Admin.fld_Password = hashedPassword;
    console.log(tbl_Admin.fld_Password);
    try {
      await tbl_Admin.save();
      res.send(tbl_Admin);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete('/admin/:fld_AdminName', async (req, res) => {
    try {
      const tbl_Admin = await AdminModel.deleteOne({fld_AdminName: req.params.fld_AdminName})
  
      if (!tbl_Admin) res.status(404).send("No item found");
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/admin/:fld_AdminName', async (req, res) => {
    try {
      await AdminModel.replaceOne({fld_AdminName: req.params.fld_AdminName}, req.body)
      await AdminModel.save()
      res.send(tbl_Admin)
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app