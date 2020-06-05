const express = require('express');
const CrewModel = require('../Models/CrewModel');
const app = express();

// AUTHENTICATION

var bcrypt = require('bcryptjs');

/**
 * Gets all of the collections in the database
 */
app.get('/crew', async (req, res) => {
  
  try {
      const tbl_Crew = await CrewModel.find({});
      res.status(200).send(tbl_Crew);

  } catch (error) {
    res.status(500).send(error)
  }
});

/**
 * Finds the specified entry in the database
 */
app.get('/crew/:fld_CrewName', async (req, res) => {
  //Should search for the specified event coordinator by email
  try {
      const tbl_Crew = await CrewModel.findOne({ fld_CrewName: req.params.fld_CrewName});
      console.log({tbl_Crew})
      res.status(200).send(tbl_Crew);


    } catch (err) {
      res.status(500).send(err);
    }
  });

/**
 * Creates a new entry in the database
 */
app.post('/crew', async (req, res) => {

  const tbl_Crew = new CrewModel(req.body);
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.fld_Password, 10);
    tbl_Crew.fld_Password = hashedPassword;

    await tbl_Crew.save();
    res.status(200).send({tbl_Crew});
      
    
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

  /**
   * Deletes the specified entry in the database
   */
  app.delete('/crew/:fld_CrewName', async (req, res) => {
    
    try {
      
        const tbl_Crew = await CrewModel.deleteOne({fld_Email: req.params.fld_CrewName});
        if (!tbl_Crew) {
          res.status(404).send("No item found")
        } else{
          res.status(200).send(tbl_Crew)
        }
      
    } catch (err) {
        res.status(500).send(err)
      }
  })

  /**
   * Updates the specified entry in the database
   */
  app.patch('/crew/:fld_CrewName', async (req, res) => {
    try {
      
        var tbl_Crew = await CrewModel.findOne({fld_CrewName: req.params.fld_CrewName})
        
        if (!tbl_Crew) {
          res.status(404).send("No item found")
        } else{

          await tbl_Crew.replaceOne(req.body);

          const hashedPassword = await bcrypt.hash(req.body.fld_Password, 10);
          tbl_Crew.fld_Password = hashedPassword;
          
          await tbl_Crew.save();

          console.log("Updating crew")
          return res.status(200).send({tbl_Crew});
        }
      
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