const express = require('express');
const EventCoordinatorModel = require('../Models/EventCoordinatorModel.js');
const app = express();

// AUTHENTICATION

//var auth = false;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

const salt = bcrypt.genSalt(10);


app.get('/eventcoordinator', async (req, res, next) => {
  const tbl_EventCoordinator = await EventCoordinatorModel.find({});
    // Uncomment when login is working...

    //Requires a token to view everything
    var authHeader = req.headers.authorization;

    if (authHeader) {
      
      const token = authHeader.split(' ')[1];
      console.log(token);
      JSON.stringify(token);
      jwt.verify(token, config.secret, (err, user) =>{
        if(err){
          console.log("Error with token " + err);
          return res.sendStatus(403);
        }
        req.user = user;
        console.log("token success");
        res.status(200).send(tbl_EventCoordinator);
        next();
      })
    } else {
      res.sendStatus(401);
    }

});

app.get('/eventcoordinator/:fld_Email', async (req, res) => {

  //Should search for the specified event handler by email
  const tbl_EventCoordinator = await EventCoordinatorModel.find({ fld_Email: req.params.fld_Email});
  try {
    var authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      console.log(token);
      JSON.stringify(token);
      jwt.verify(token, config.secret, (err, user) =>{
        if(err){
          console.log("Error with token " + err);
          return res.sendStatus(403);
        }
        req.user = user;
        console.log("token success");
        res.status(200).send(tbl_EventCoordinator);
        next();
      })
    } else {
      res.sendStatus(401);
    }


    res.send(tbl_EventCoordinator);
    console.log(res.fld_Email);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/eventcoordinator', async (req, res) => {

  const tbl_EventCoordinator = new EventCoordinatorModel(req.body);

  try {
    console.log(tbl_EventCoordinator.fld_Password);
    var testpsw = JSON.stringify(tbl_EventCoordinator.fld_Password)
    console.log(testpsw);
    var passwordToString = JSON.stringify(req.body.fld_Password);
    const hashedPassword = await bcrypt.hash(testpsw, 10);
    tbl_EventCoordinator.fld_Password = hashedPassword;
  } catch (error) {
    console.log("Error with hashing: " + error);
  }

  var authHeader = req.headers.authorization;
    if (authHeader) {
      var token = authHeader.split(' ')[1];

      jwt.verify(token, config.secret, (err, user) =>{
        if(err){
          console.log("Error with token " + err);
          return res.sendStatus(403);
        }
        console.log("Token confirmed");
      })        
          
      

      tbl_EventCoordinator.save();
      res.status(200).send(tbl_EventCoordinator); 

      console.log("res.status(200) send");
                   
  } else {
    console.log("No Token/Header")
  }
})


  /**
   * handles login for the event Coordinators
   * not async because of errors with HTTP headers
   */
  app.post('/login', async (req, res) => {
    const tbl_EventCoordinator = await EventCoordinatorModel.findOne({fld_Email: req.body.fld_Email})
    try {

      var passwordIsValid = bcrypt.compare(req.body.fld_Password, tbl_EventCoordinator.fld_Password, (error, success) =>{
        if (success) {
          var validToken = jwt.sign({tbl_EventCoordinator}, config.secret,{
            expiresIn: 86400
          })
          res.send(tbl_EventCoordinator);
        } else {
          res.status(500).send(error);
        }
      });
    } catch (error) {
      console.log(error)
    }
  })

  // router.route('/logout')
//     .get(function(req, res) {
//       res.status(200).send({ auth: false, token: null });
// });

  app.delete('/eventcoordinator/:fld_Email', async (req, res) => {
    try {

      var authHeader = req.headers.authorization;

    if (authHeader) {
      
      const token = authHeader.split(' ')[1];
      console.log(token);
      JSON.stringify(token);
      jwt.verify(token, config.secret, (err, user) =>{
        if(err){
          console.log("Error with token " + err);
          return res.sendStatus(403);
        }
        req.user = user;
        console.log("token success");
        res.status(200).send(tbl_EventCoordinator);
        next();
      })
    } else {
      res.sendStatus(401);
    }

      const tbl_EventCoordinator = await EventCoordinatorModel.deleteOne({fld_Email: req.params.fld_Email})
  
      if (!tbl_EventCoordinator) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/eventcoordinator/:fld_Email', async (req, res) => {
    try {
      var authHeader = req.headers.authorization;

      if (authHeader) {
      
        const token = authHeader.split(' ')[1];
        JSON.stringify(token);
        jwt.verify(token, config.secret, (err, user) =>{
          if(err){
            console.log("Error with token " + err);
            
            var validToken = jwt.sign({tbl_EventCoordinator}, config.secret, {
              expiresIn: 86400
            })
            console.log("Giving new token");
        }
        
        req.user = user;
        var tbl_EventCoordinator = EventCoordinatorModel.updateOne({fld_Email: fld_Email}, req.body)
        tbl_EventCoordinator.save();
        res.status(200).send(tbl_EventCoordinator + " Success");
        
        console.log("token success");
        next();
        })
      } else {
        res.sendStatus(401);
      }


      //const tbl_EventCoordinator = await EventCoordinatorModel.updateOne();
      //tbl_EventCoordinator.save();
      //res.status(200).send(tbl_EventCoordinator);
      } catch (err) {
        res.status(500).send(err)
      }
    })

module.exports = app