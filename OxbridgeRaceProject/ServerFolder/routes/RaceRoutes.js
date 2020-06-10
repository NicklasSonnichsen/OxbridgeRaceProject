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
  app.get('/race/:_id', async (req, res) => {
  
    //Should search for the specified event coordinator by email
    try {
        const tbl_Race = await RaceModel.findOne({ _id: req.params._id});
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
    app.delete('/race/:_id', async (req, res) => {
      
      try {
          const tbl_Race = await RaceModel.deleteOne({_id: req.params._id});
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
     * Deletes a nested document from the table
     */
    app.delete('race/:_id', async(req, res)=>{

      try {
        const tbl_Contestants = await RaceModel.findOne({_id: req.params._id}, function(err, result){
          if (err) {
            res.status(404).send("contestant not found");
          } else {
            result.remove(function (err) {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.status(200).send("contestant has been removed")
              }
            })
          }
        })
        await tbl_Contestants.save();
      } catch (error){
        res.status(500).send("Server Error - Delete contestant : " + error.message);
      }
    })


    app.patch('/race/:_id', async (req, res) => {
      try {
          var tbl_Race = await RaceModel.findOne({_id: req.params._id})
          
          if (!tbl_Race) {
            res.status(404).send("No item found")
          } else{
  
            await tbl_Race.updateOne(req.body);
            await tbl_Race.save();
            return res.status(200).send(tbl_Race);
          }
      } catch (err) {
        res.status(500).send(err.message)
      }
    })

    app.put('/contestants/:_id', async(req, res) =>{

      try {
        const tbl_Crew = await new CrewModel(req.body)
        const tbl_Race = await RaceModel.findOneAndUpdate({_id: req.params._id}, {$push: {fld_Contestants: tbl_Crew}});
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

    app.patch('/contestants/:_id', async(req, res) =>{

      try {
        const tbl_Crew = await new CrewModel(req.body)
        console.log(tbl_Crew);
        const tbl_Race = await RaceModel.update({_id: req.params._id}, {$pull: {fld_Contestants: tbl_Crew}});
        if (!tbl_Race) {
          return res.status(404).send("Cannot find race: ");
        } else {
          res.status(200).send("Contestants have been removed");         
        }
      } catch (error) {
        console.log(error);
      }
    })

    app.get("/contestants/:fld_Zipcode", async(req, res)=>{
      try{
        const tbl_Contestants = await RaceModel.findOne({fld_Zipcode: req.params.fld_Zipcode}, {"fld_Contestants": "test2"});
        console.log(tbl_Contestants);
        res.status(200).send(tbl_Contestants)
      } catch(err){
        console.log(err)
      }
    })

  
    

module.exports = app