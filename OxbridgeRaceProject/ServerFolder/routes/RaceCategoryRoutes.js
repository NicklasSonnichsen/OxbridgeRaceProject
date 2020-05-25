const express = require('express');
const RaceCategoryModel = require('../Models/RaceCategoryModel.js');
const app = express();

app.get('/racecategory', async (req, res) => {
  const tbl_RaceCategory = await RaceCategoryModel.find({});

  try {
    res.send(tbl_RaceCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/racecategory/:fld_CategoryName', async (req, res) => {

  //Should search for the specified category by name
  const tbl_RaceCategory = await RaceCategoryModel.find({ fld_CategoryName: req.params.fld_CategoryName});
  try {
    res.send(tbl_RaceCategory);
    console.log(res.fld_CategoryName);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/racecategory', async (req, res) => {
    const tbl_RaceCategory = new RaceCategoryModel(req.body);
  
    try {
      await tbl_RaceCategory.save();
      res.send(tbl_RaceCategory);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete('/racecategory/:fld_CategoryName', async (req, res) => {
    try {
      const tbl_RaceCategory = await RaceCategoryModel.deleteOne({fld_CategoryName: req.params.fld_CategoryName})
  
      if (!tbl_RaceCategory) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/racecategory/:fld_CategoryName', async (req, res) => {
    try {
      await RaceCategoryModel.updateOne({fld_CategoryName: req.params.fld_CategoryName}, req.body);
      await RaceCategoryModel.save()
      res.send(tbl_EventHandler)
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app