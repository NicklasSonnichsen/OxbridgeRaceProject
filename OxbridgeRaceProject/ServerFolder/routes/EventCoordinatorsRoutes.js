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

      jwt.verify(token, config.secret, (err, user) =>{
        if(err){
          console.log("Error with token " + err);
          return res.sendStatus(403);
        }
        req.user = user;
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


    res.send(tbl_EventCoordinator);
    console.log(res.fld_Email);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/eventcoordinator', async (req, res) => {
    const tbl_EventCoordinator = new EventCoordinatorModel(req.body);

    try {  
      const hashedPassword = await bcrypt.hash(req.body.fld_Password, salt);
      tbl_EventCoordinator.fld_Password = hashedPassword;

      await tbl_EventCoordinator.save(function (err) {
        if (err) {
          return res.status(500).send("There was a problem registrating the user.")
        }
        var validToken = jwt.sign({fld_Email: tbl_EventCoordinator.fld_Email}, config.secret,{
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({
          validToken
        });
        req.headers['x-access-token'].replace();
      })
      res.status(200).send({auth: true, token: validToken});
    } catch (err) {
      res.status(500).send(err);
    }
  });

  /**
   * handles login for the event Coordinators
   * not async because of errors with HTTP headers
   */
  app.post('/login', async (req, res) => {
    const tbl_EventCoordinator = await EventCoordinatorModel.findOne({fld_Email: req.body.fld_Email})
    try {
      var enteredpsw = JSON.stringify(req.body.fld_Password);
      var storedpsw = JSON.stringify(tbl_EventCoordinator.fld_Password);
      console.log(enteredpsw);
      console.log(storedpsw);

      var passwordIsValid = bcrypt.compare(req.body.fld_Password, tbl_EventCoordinator.fld_Password, (error, success) =>{
        if (success) {
          var validToken = jwt.sign({id: tbl_EventCoordinator.fld_Email}, config.secret,{
            expiresIn: 86400
          })
          res.status(200).send({auth: true, token: validToken});
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
      const tbl_EventCoordinator = await EventCoordinatorModel.deleteOne({fld_Email: req.params.fld_Email})
  
      if (!tbl_EventCoordinator) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/eventcoordinator/:fld_Email', async (req, res) => {
    try {
      await EventCoordinatorModel.updateOne({fld_Email: fld_Email}, req.body)
      await EventCoordinatorModel.save()
      res.send(tbl_EventCoordinator)
    } catch (err) {
      res.status(500).send(err)
    }
  })


  // async function pswAsync(psw, dbpsw){
  //   console.log("calling pswAsync");
    
  // return promise;
  // }


module.exports = app