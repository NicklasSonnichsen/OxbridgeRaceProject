const express = require('express');
const RaceCategoryModel = require('../Models/RaceCategoryModel.js');
const cookieparser = require('cookie-parser');
const app = express();
app.use(cookieparser());

  /**
   * Gets every collection in the database table
   */
  app.get('/racecategory', async (req, res) => {
    try {
      var user = req.cookies['user'];
      if (user) {
        const tbl_CategoryName = await RaceCategoryModel.find({});
        res.status(200).send({tbl_CategoryName});
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
  app.get('/racecategory/:fld_CategoryName', async (req, res) => {
  
    //Should search for the specified event coordinator by email
    try {
      var user = req.cookies['user'];
      if (user) {
        const tbl_CategoryName = await RaceCategoryModel.findOne({ fld_CategoryName: req.params.fld_CategoryName});
        res.status(200).send({tbl_CategoryName});
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
  app.post('/racecategory', async (req, res) => {
  
    const tbl_CategoryName = new RaceCategoryModel(req.body);
    try {
      var user = req.cookies['user'];
      if (user) {
        tbl_CategoryName.save();
        res.status(201).json({message: "race category has been created", tbl_CategoryName});
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
    app.delete('/racecategory/:tbl_CategoryName', async (req, res) => {
      
      try {
        var user = req.cookies['user'];
        if (user) {
          const tbl_CategoryName = await RaceCategoryModel.deleteOne({tbl_CategoryName: req.params.tbl_CategoryName});
          if (!tbl_CategoryName) {
            res.status(404).send("No item found")
          } else{
            res.status(200).send({tbl_CategoryName})
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
    app.patch('/racecategory/:tbl_CategoryName', async (req, res) => {
      try {
  
        var user = req.cookies['user'];
        if (user) {
          var tbl_CategoryName = await RaceCategoryModel.findOne({tbl_CategoryName: req.params.tbl_CategoryName})
          
          if (!tbl_CategoryName) {
            res.status(404).send("No item found")
          } else{
            await tbl_CategoryName.replaceOne(req.body);
            await tbl_CategoryName.save();
            return res.status(200).send({tbl_CategoryName});
          }
        } else {
          return res.status(400).send("no cookie found");
        }
      } catch (err) {
        res.status(500).send(err)
      }
    })

module.exports = app