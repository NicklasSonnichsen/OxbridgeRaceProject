const express = require('express');
const GPSCoordinatesModel = require('../Models/GpsCoordinatesModel');
const app = express();

// AUTHENTICATION

var auth = false;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

app.get('/gps', async (req, res) => {
    const tbl_Gps = await GPSCoordinatesModel.find({});

    try {
        res.send(tbl_Gps);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/gps/:fld_CrewName', async (req, res) => {

    //Should search for the specified crew by their crew name
    const tbl_Gps = await GPSCoordinatesModel.find({ fld_CrewName: req.params.fld_CrewName });
    try {
        res.send(tbl_Gps);
        console.log(res.fld_CrewName);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.post('/gps', async (req, res) => {
    const tbl_Gps = new GPSCoordinatesModel(req.body);   
    try {
        await tbl_Gps.save();
        res.send(tbl_Gps);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/gps/:fld_CrewName', async (req, res) => {
    try {
        const tbl_Gps = await GPSCoordinatesModel.deleteOne({ fld_CrewName: req.params.fld_CrewName })

        if (!tbl_Gps) res.status(404).send("No item found");
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

app.patch('/gps/:fld_CrewName', async (req, res) => {
    try {
        await GPSCoordinatesModel.replaceOne({ fld_CrewName: req.params.fld_CrewName }, req.body)
        await GPSCoordinatesModel.save()
        res.send(tbl_Gps)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = app