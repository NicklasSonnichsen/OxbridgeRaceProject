const express = require('express');
const zipcityModel = require('../Models/ZipCityModel');
const app = express();

  /**
 * Gets all of the collections in the database
 */
app.get('/zipcity', async (req, res) => {
  try {
      const tbl_ZipCity = await zipcityModel.find({});
      res.status(200).send({tbl_ZipCity});
  } catch (error) {
    res.status(500).send(error)
  }
});

/**
 * Finds the specified entry in the database
 */
app.get('/zipcity/:fld_Zipcode', async (req, res) => {

  //Should search for the specified event coordinator by email
  try {
      const tbl_ZipCity = await zipcityModel.findOne({ fld_Zipcode: req.params.fld_Zipcode});
      res.status(200).send({tbl_ZipCity});
    } catch (err) {
      res.status(500).send(err);
    }
  });

/**
 * Creates a new entry in the database
 */
app.post('/zipcity', async (req, res) => {

  const tbl_ZipCity = new zipcityModel(req.body);
  try {
      tbl_ZipCity.save();
      res.status(201).json({message: "City has been created", tbl_ZipCity});
  } catch (error) {
    console.log(error);
  }
})

  /**
   * Deletes the specified entry in the database
   */
  app.delete('/zipcity/:fld_Zipcode', async (req, res) => {
    
    try {
        const tbl_ZipCity = await zipcityModel.deleteOne({fld_Zipcode: req.params.fld_Zipcode});
        if (!tbl_ZipCity) {
          res.status(404).send("No item found")
        } else{
          res.status(200).send({tbl_ZipCity})
        }
    } catch (err) {
        res.status(500).send(err)
      }
  })

  /**
   * Updates the specified entry in the database
   */
  app.patch('/zipcity/:fld_Zipcode', async (req, res) => {
    try {
        console.log("user found")
        var tbl_ZipCity = await zipcityModel.findOne({fld_Zipcode: req.params.fld_Zipcode})
        
        if (!tbl_ZipCity) {
          res.status(404).send("No item found")
        } else{

          await tbl_ZipCity.replaceOne(req.body);
          await tbl_ZipCity.save();
          return res.status(200).send({tbl_ZipCity});
        }
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app