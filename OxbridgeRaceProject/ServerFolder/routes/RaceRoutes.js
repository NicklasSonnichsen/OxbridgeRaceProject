const express = require('express');
const RaceModel = require('../Models/RaceModel.js');
const CrewModel = require('../Models/CrewModel.js');
const app = express();
  /**
   * Gets every collection in the database table
   */
  app.get('/race', async (req, res) => {
    try {
        const tbl_Race = await RaceModel.find({});
        res.status(200).send(tbl_Race);
    } catch (error) {
      res.status(500).send(error)
    }
  });

  
  
  /**
   * Finds the specified entry in the database
   */
  app.get('/race/:fld_Zipcode', async (req, res) => {
  
    //Should search for the specified event coordinator by email
    try {
        const tbl_Race = await RaceModel.findOne({ fld_Zipcode: req.params.fld_Zipcode});
        console.log(tbl_Race);
        res.status(200).send(tbl_Race);
      } catch (err) {
        res.status(500).send(err);
      }
    });
  
  /**
   * Creates a new entry in the database
   */
  app.post('/race', async (req, res) => {
  
    const tbl_Race = new RaceModel(req.body);
    try {
        await tbl_Race.save();
        res.status(201).json({message: "race has been created", tbl_Race});
    } catch (error) {
      console.log(error);
    }
  })
  
    /**
     * Deletes the specified entry in the database
     */
    app.delete('/race/:fld_Zipcode', async (req, res) => {
      
      try {
          const tbl_Race = await RaceModel.deleteOne({fld_Zipcode: req.params.fld_Zipcode});
          if (!tbl_Race) {
            res.status(404).send("No item found")
          } else{
            res.status(200).send({tbl_Race})
          }
      } catch (err) {
          res.status(500).send(err)
        }
    })
  
    /**
     * Updates the specified entry in the database
     */
    // app.patch('/race/:fld_Zipcode', async (req, res) => {
    //   try {
    //     var user = req.cookies['user'];
    //     if (user) {
    //       var tbl_Race = await RaceModel.findOne({fld_Zipcode: req.params.fld_Zipcode})
          
    //       if (!tbl_Race) {
    //         res.status(404).send("No item found")
    //       } else{
  
    //         await tbl_Race.replaceOne(req.body);
    //         await tbl_Race.save();
    //         return res.status(200).send({tbl_Race});
    //       }
    //     } else {
    //       return res.status(400).send("no cookie found");
    //     }
    //   } catch (err) {
    //     res.status(500).send(err)
    //   }
    // })


    app.patch('/race/:fld_Zipcode', async (req, res) => {
      try {
          var tbl_Race = await RaceModel.findOne({fld_Zipcode: req.params.fld_Zipcode})
          
          if (!tbl_Race) {
            res.status(404).send("No item found")
          } else{
  
            await tbl_Race.updateOne(req.body);
            await tbl_Race.save();
            return res.status(200).send({tbl_Race});
          }
      } catch (err) {
        res.status(500).send(err)
      }
    })

    app.put('/contestants/:fld_Zipcode', async(req, res) =>{

      try {
        const tbl_Crew = await new CrewModel(req.body)
        const tbl_Race = await RaceModel.findOneAndUpdate({fld_Zipcode: req.params.fld_Zipcode}, {$push: {"fld_Contestants": tbl_Crew}});
        if (!tbl_Race) {
          return res.status(404).send("Cannot find race");
        } else {
          await tbl_Race.save();
          res.status(200).send({tbl_Crew});         
        }
      } catch (error) {
        console.log(error.message);
      }
    })
module.exports = app