const express = require('express');
const EventCoordinatorModel = require('../Models/EventCoordinatorModel.js');
const cookieparser = require('cookie-parser');
const app = express();

app.use(cookieparser());
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSalt(10);

//Debugging
app.get('/getcookie', function(req, res) {
  var user = req.cookies['user'];
  if (user) {
      return res.send(user);        
  }

  return res.send('No cookie found');
});

/**
 * Gets all of the collections in the database
 */
app.get('/eventcoordinator', async (req, res) => {
  try {
    var user = req.cookies['user'];
    if (user) {
      const tbl_EventCoordinator = await EventCoordinatorModel.find({});
      res.status(200).send({tbl_EventCoordinator});
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
app.get('/eventcoordinator/:fld_Email', async (req, res) => {

  //Should search for the specified event coordinator by email
  try {
    var user = req.cookies['user'];
    if (user) {
      const tbl_EventCoordinator = await EventCoordinatorModel.findOne({ fld_Email: req.params.fld_Email});

      res.status(200).send({tbl_EventCoordinator});
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
app.post('/eventcoordinator', async (req, res) => {

  const tbl_EventCoordinator = new EventCoordinatorModel(req.body);
  try {
    var user = req.cookies['user'];
    if (user) {
      const hashedPassword = await bcrypt.hash(req.body.fld_Password, 10);
      tbl_EventCoordinator.fld_Password = hashedPassword;

      tbl_EventCoordinator.save();
      res.status(201).json({message: "User has been created", tbl_EventCoordinator});
    } else {
      res.status(400).send("No cookie found")
    }
  } catch (error) {
    console.log(error);
  }
})


  /**
   * handles login for the event Coordinators
   */
  app.post('/login', async (req, res) =>{
    const tbl_EventCoordinator = await EventCoordinatorModel.findOne({fld_Email: req.body.fld_Email});
  
    try {
      await bcrypt.compare(req.body.fld_Password, tbl_EventCoordinator.fld_Password, (err, success) => {
        if (success) {
          res.cookie("user", tbl_EventCoordinator,{maxAge: 864000, httpOnly: true});
          console.log("Successfull login")
          return res.status(200).send({tbl_EventCoordinator});
        } else if (err) {
          console.log(err.message);
          res.status(400).send("login error")
        }
      })
    } catch (error) {
      console.log(error.message);  
    }
  })

  /**
   * When the user logs out, the cookie is deleted
   */
  app.get('/logout', async (req, res) => {
    var user = req.cookies['user'];
    if (user) {
      res.clearCookie('user')
        return res.send("you are logged out");        
    }
  
    return res.send('No cookie found');
  })

  /**
   * Deletes the specified entry in the database
   */
  app.delete('/eventcoordinator/:fld_Email', async (req, res) => {
    
    try {
      var user = req.cookies['user'];
      if (user) {
        const tbl_EventCoordinator = await EventCoordinatorModel.deleteOne({fld_Email: req.params.fld_Email});
        if (!tbl_EventCoordinator) {
          res.status(404).send("No item found")
        } else{
          res.status(200).send({tbl_EventCoordinator})
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
  app.patch('/eventcoordinator/:fld_Email', async (req, res) => {
    try {
      var user = req.cookies['user'];
      if (user) {
        console.log("user found")
        var tbl_EventCoordinator = await EventCoordinatorModel.findOne({fld_Email: req.params.fld_Email})
        
        if (!tbl_EventCoordinator) {
          res.status(404).send("No item found")
        } else{

          await tbl_EventCoordinator.replaceOne(req.body);

          const hashedPassword = await bcrypt.hash(req.body.fld_Password, 10);
          tbl_EventCoordinator.fld_Password = hashedPassword;
          
          await tbl_EventCoordinator.save();

          console.log("Updating user")
          return res.status(200).send({tbl_EventCoordinator});
        }
      } else {
        return res.status(400).send("no cookie found");
      }
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app