const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require("body-parser");

//Unit testing
//const morgan = require('morgan');
//const config = require('./config/test.json');


const cors = require('cors');


//Defining the routes
const zipCityRouter = require('./routes/zipCityRoutes.js');
const crewRouter = require('./routes/CrewRoutes.js');
const raceRouter = require('./routes/RaceRoutes.js');
const raceCategoryRouter = require('./routes/RaceCategoryRoutes.js');
const EventCoordinatorsRoutes = require('./routes/EventCoordinatorsRoutes.js');
const GpsCoordinatesRouter = require('./routes/GPSRoutes.js')
const AdminRoutes = require('./routes/AdminRoutes.js')



const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // Make sure it comes back as json
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));



/**
 * Connects to our cloud server (MongoDB Atlas)
 * Remember to whitelist your pc's IP address and create an alias/user
 * else the server will fail to connect on launch
 */
mongoose.connect('mongodb+srv://Mathias:test1234@oxbridge-drekb.azure.mongodb.net/OxbridgeRaceDB?authSource=admin&replicaSet=Oxbridge-shard-0&readPreference=primary&ssl=true', {
  useNewUrlParser: true
});


//gets the path from the models, look in the router classes for path prefix
//RaceRoutes.js contains comments on CRUD operations
app.use(zipCityRouter);
app.use(crewRouter);
app.use(raceRouter);
app.use(raceCategoryRouter);
app.use(EventCoordinatorsRoutes);
app.use(GpsCoordinatesRouter);
app.use(AdminRoutes);

// if(config.util.getEnv('NODE_ENV') !== 'test') {
//   //use morgan to log at command line
//   app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

//listens to localhost:3000 for CRUD operations
app.listen(3000, () => { console.log('Server is running...') });

module.exports = app;





