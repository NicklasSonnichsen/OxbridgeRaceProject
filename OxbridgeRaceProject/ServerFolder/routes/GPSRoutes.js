const express = require('express');
const GPSCoordinatesModel = require('../Models/GpsCoordinatesModel');
const app = express();

var bcrypt = require('bcryptjs');

/**
 * Gets all of the collections in the database
 */
app.get('/gps', async (req, res) => {
  
    try {
        const tbl_Gps = await GPSCoordinatesModel.find({});
        res.status(200).send({tbl_Gps});
    } catch (error) {
      res.status(500).send(error)
    }
  });
  
  /**
   * Finds the specified entry in the database
   */
  app.get('/gps/:fld_CrewName', async (req, res) => {
  
    //Should search for the specified event coordinator by email
    try {
        const tbl_Gps = await GPSCoordinatesModel.findOne({ fld_Email: req.params.fld_CrewName});
        res.status(200).send({tbl_Gps});
  
      } catch (err) {
        res.status(500).send(err);
      }
    });
  
  /**
   * Creates a new entry in the database
   */
  app.post('/gps', async (req, res) => {
  
    const tbl_Crew = new GPSCoordinatesModel(req.body);
    try {
        tbl_Gps.save();
        res.status(200).send({tbl_Gps});

    } catch (error) {
      console.log(error);
    }
  })
  
    /**
     * Deletes the specified entry in the database
     */
    app.delete('/gps/:fld_CrewName', async (req, res) => { 
      try {
          const tbl_Gps = await GPSCoordinatesModel.deleteOne({fld_CrewName: req.params.fld_CrewName});
          if (!tbl_Gps) {
            res.status(404).send("No item found")
            } else{
            res.status(200).send(tbl_Gps)
            }
        } catch (err) {
          res.status(500).send(err)
        }
    })

    app.patch('/gps/:fld_CrewName', async (req, res) => {
        try {
            var tbl_CategoryName = await RaceCategoryModel.findOne({tbl_CategoryName: req.params.tbl_CategoryName})
                await tbl_Gps.replaceOne(req.body);
                await tbl_Gps.save();
                return res.status(200).send({tbl_Gps});
        } catch (err) {
            res.status(500).send(err)
        }
    })
  

module.exports = app