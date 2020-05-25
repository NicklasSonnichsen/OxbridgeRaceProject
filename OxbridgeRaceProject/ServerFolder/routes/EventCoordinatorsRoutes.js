const express = require('express');
const EventCoordinatorModel = require('../Models/EventCoordinatorModel.js');
const app = express();

// AUTHENTICATION

var auth = false;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

const salt = bcrypt.genSalt(10);
app.get('/eventcoordinator', async (req, res) => {
  const tbl_EventCoordinator = await EventCoordinatorModel.find({});

  try {
    // Uncomment when login is working...

    //Requires a token to view everything
    var token = req.headers['x-access-token'];
    if(!token){
      return res-status(401).send({auth: false, message: 'No token provided.'});
    }

    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
    })

    res.send(tbl_EventCoordinator);
  } catch (err) {
    res.status(500).send(err);
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
        var validToken = jwt.sign({id: tbl_EventCoordinator.fld_Email}, config.secret,{
          expiresIn: 86400 // expires in 24 hours
        });
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
    var promise = new Promise(function(resolve, reject){
      try {
        const tbl_EventCoordinator = EventCoordinatorModel.findOne({ fld_Email: req.body.fld_Email }, function (err, user) {
        
          //Check for errors before decryption of the password
        if (err) {
          res.status(500).send('Error on the server.');
          console.log(err);
          return;
        }
        if (!user) {
          res.status(404).send('No user found.');
          return;
        } 

        //returns an error if the password is not stringified
        var enteredpsw = JSON.stringify(req.body.fld_Password)
        var storedpsw = JSON.stringify(user.fld_Password);

        //bcrypt should then decrypt the hashed password from the server
        var passwordIsValid = bcrypt.compare(enteredpsw, storedpsw);
        
        console.log(enteredpsw);
        console.log(storedpsw);

        if (passwordIsValid) {
            
          //when the event coordinator successfully logs in, then the event coordinator gets a token
          var validToken = jwt.sign({ fld_Email: user.fld_Email }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
          });
          console.log(passwordIsValid);
          
          resolve("password is valid and token should be signed???");
        }else if (!passwordIsValid) {
          
          console.log("password is not valid")
          reject(Error("Password is not valid"))
          return res.status(401).send({ auth: false, token: null });
        }else  {
          reject(Error("It broke"));
        }

        promise.then(function(result) {
          res.status(200).send({auth: true, token: validToken});
          console.log(result); // "Stuff worked!"
        }, function(err) {
          console.log(err); // Error: "It broke"
        });

      });


        
      } catch (error) {
        res.status(500).send(err);
      }

    })  
    
  })

  app.get('/logout', async (req, res) => {
    const tbl_EventCoordinator = await EventCoordinatorModel.findOne({fld_Email : req.params.fld_Email}, function (err, user) {
      try {
        res.status(200).send({ auth: false, token: null });
      } catch (err) {
        res.status(500).send("server error");
      }
    })
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

module.exports = app