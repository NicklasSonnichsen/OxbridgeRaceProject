const express = require('express');
const CrewModel = require('../Models/CrewModel');
const cookieparser = require('cookie-parser');
const app = express();
app.use(cookieparser());

// AUTHENTICATION

var bcrypt = require('bcryptjs');

/**
 * Gets all of the collections in the database
 */
app.get('/crew', async (req, res) => {
  
  try {
    var user = req.cookies['user'];
    if (user) {
      const tbl_Crew = await CrewModel.find({});
      res.status(200).send(tbl_Crew);
    } else {
      res.status(400).send("No cookie found")
    }
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
    var user = req.cookies['user'];
    if (user) {
      const tbl_Crew = await CrewModel.findOne({ fld_Email: req.params.fld_CrewName});

      res.status(200).send({tbl_Crew});
      } else {
      res.status(400).send("No cookie found")
      }

    } catch (err) {
      res.status(500).send(err);
    }
  });

/**
 * Creates a new entry in the database
 */
app.post('/crew', async (req, res) => {

  const tbl_Crew = new EventCoordinatorModel(req.body);
  try {
    var user = req.cookies['user'];
    if (user) {
      tbl_Crew.save();
      res.status(200).send(tbl_Crew);
    } else {
      res.status(400).send("No cookie found")
    }
  } catch (error) {
    console.log(error);
  }
})

  /**
   * Deletes the specified entry in the database
   */
  app.delete('/crew/:fld_CrewName', async (req, res) => {
    
    try {
      var user = req.cookies['user'];
      if (user) {
        const tbl_Crew = await CrewModel.deleteOne({fld_Email: req.params.fld_CrewName});
        if (!tbl_Crew) {
          res.status(404).send("No item found")
        } else{
          res.status(200).send(tbl_Crew)
        }
      } else {
        return res.status(400).send("no cookie found");
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
      var user = req.cookies['user'];
      if (user) {
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
      } else {
        return res.status(400).send("no cookie found");
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