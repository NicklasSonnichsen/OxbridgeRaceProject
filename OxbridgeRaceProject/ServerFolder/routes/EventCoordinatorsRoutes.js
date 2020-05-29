const express = require('express');
const EventCoordinatorModel = require('../Models/EventCoordinatorModel.js');
const app = express();
const tokenList = {};

// app.use(require('../config/tokenChecker'))

// AUTHENTICATION

//var auth = false;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

const salt = bcrypt.genSalt(10);


app.get('/eventcoordinator', async (req, res,) => {
  const tbl_EventCoordinator = await EventCoordinatorModel.find({});
    //Requires a token to view everything
    var authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
      //split the header to get authentication
      const token = authHeader.split(' ')[1];

      JSON.stringify(token);
      jwt.verify(token, config.secret, (err) =>{

        if(err){
          console.log("Error with token " + err);

          //Debug
          console.log("new token signed");

          return res.status(400).send("Not authenticated");
        }
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
  const tbl_EventCoordinator = await EventCoordinatorModel.find({ fld_Email: req.body.fld_Email});
  try {

    var authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {

      const token = authHeader.split(' ')[1];
      
      JSON.stringify(token);
      jwt.verify(token, config.secret, (err) =>{
        if(err.message == "jwt expired"){
          console.log(err);
          const refreshToken = jwt.sign({id: tbl_EventCoordinator.fld_Email}, config.refresh,{expiresIn: config.refreshTokenLife});
          console.log("RefreshToken:" + refreshToken);
          console.log(jwt.decode(refreshToken, ));
          return res.send(tbl_EventCoordinator);
        }
        console.log("token success");
      })
      res.send(tbl_EventCoordinator);
      console.log(res.fld_Email);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/eventcoordinator', async (req, res) => {

  const tbl_EventCoordinator = new EventCoordinatorModel(req.body);
  try {

    console.log(tbl_EventCoordinator.fld_Password);
    var testpsw = JSON.stringify(tbl_EventCoordinator.fld_Password)
    
    var passwordToString = JSON.stringify(req.body.fld_Password);
    const hashedPassword = await bcrypt.hash(testpsw, 10);
    tbl_EventCoordinator.fld_Password = hashedPassword;

    await tbl_EventCoordinator.save();
  } catch (error) {
    console.log("Error with hashing: " + error);
  }

  // var authHeader = req.headers.authorization;
  //   if (authHeader) {
  //     var token = authHeader.split(' ')[1];

  //     jwt.verify(token, config.secret, (err, user) =>{
  //       if(err){
  //         console.log("Error with token " + err);
  //         return res.sendStatus(403);
  //       }
  //       console.log("Token confirmed");
  //     })        
          
      

      
      res.status(200).send(tbl_EventCoordinator); 

      console.log("res.status(200) send");
                   
  // } else {
  //   console.log("No Token/Header")
  // }
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
          const validToken = jwt.sign({id: tbl_EventCoordinator.fld_Email}, config.secret,{ expiresIn: config.tokenLife });
          const refreshToken = jwt.sign({id: tbl_EventCoordinator.fld_Email}, config.refresh,{ expiresIn: config.refreshTokenLife});
          var response = {
            "fld_Email":tbl_EventCoordinator.fld_Email,
            "fld_Password":tbl_EventCoordinator.fld_Password,
            "token":validToken,
            "refreshToken":refreshToken
          }
          res.send(response);
        } else {
          res.status(500).send(respone);
        }
      });
    } catch (error) {
      console.log(error)
    }
  })

  app.post('/token', async (req,res) => {
    // refresh the damn token
    const tbl_EventCoordinator = req.body
    // if refresh token exists
    console.log(tbl_EventCoordinator.refreshToken)
    if((tbl_EventCoordinator) && (tbl_EventCoordinator in tokenList)) {
        console.log("refresh token true")
        const token = jwt.sign({id: tbl_EventCoordinator}, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        console.log(response)
        // update the token in the list
        tokenList[tbl_EventCoordinator.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
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
  
      if (!tbl_EventCoordinator) {
        res.status(404).send("No item found")
      }  

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