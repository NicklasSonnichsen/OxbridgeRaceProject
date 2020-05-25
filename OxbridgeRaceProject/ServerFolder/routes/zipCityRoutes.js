const express = require('express');
const zipcityModel = require('../Models/ZipCityModel');
const app = express();

app.get('/zipcity', async (req, res) => {
  const tbl_ZipCity = await zipcityModel.find({});
  console.log(req)

  try {
    res.send(tbl_ZipCity);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/zipcity/:fld_Zipcode', async (req, res) => {

  //Should search for the specified city
  const tbl_ZipCity = await zipcityModel.find({ fld_Zipcode: req.params.fld_Zipcode});
  try {
    res.send(tbl_ZipCity);
    console.log(res.fld_Zipcode);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/zipcity', async (req, res) => {
    const tbl_ZipCity = new zipcityModel(req.body);
  
    try {
      var result = await tbl_ZipCity.save();
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete('/zipcity/:fld_Zipcode', async (req, res) => {
    try {
      const tbl_ZipCity = await zipcityModel.deleteOne({fld_Zipcode: req.params.fld_Zipcode});
  
      if (!tbl_ZipCity) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/zipcity/:fld_Zipcode', async (req, res) => {
    try {
        await zipcityModel.updateOne({fld_Zipcode: req.params.fld_Zipcode}, req.body);
        await zipcityModel.save()
        res.send(tbl_ZipCity)
      } catch (err) {
        res.status(500).send(err)
      }
  })

module.exports = app