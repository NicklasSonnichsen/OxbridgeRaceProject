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
        res.status(200).send(tbl_Gps);
    } catch (error) {
      res.status(500).send(error)
    }
  });

  /**
 * Gets all of the collections in the database
 */
app.get('/gpsnames', async (req, res) => {
  
  try {
      const tbl_Gps = await GPSCoordinatesModel.distinct("fld_CrewName");
      const tbl_Gps2 = await GPSCoordinatesModel.aggregate([
        {$match:{}},
        {$group:{_id:"$fld_CrewName",lat:{$last:"$fld_Lattitude"},lng:{$last:"$fld_Longitude"}}}
      ])
      res.status(200).send(tbl_Gps2);
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
      // var user = req.cookies['user'];
      // if (user) {
        const tbl_Gps = await GPSCoordinatesModel.findOne({ fld_CrewName: req.params.fld_CrewName},{__v:0}).sort({_id:-1});
      
        res.status(200).send(tbl_Gps);
        // } else {
        // res.status(400).send("No cookie found")
        // }
  
      } catch (err) {
        res.status(500).send(err);
      }
    });
  

     

    

  /**
   * Creates a new entry in the database
   */
  app.post('/gps', async (req, res) => {
  
    const tbl_Gps = new GPSCoordinatesModel(req.body);
    try {
        tbl_Gps.save();
        res.status(200).send(tbl_Gps);

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
            var tbl_Gps = await GPSCoordinatesModel.findOne({tbl_Gps: req.params.tbl_Gps})
                await tbl_Gps.replaceOne(req.body);
                await tbl_Gps.save();
                return res.status(200).send(tbl_Gps);
        } catch (err) {
            res.status(500).send(err)
        }
    })
  

module.exports = app