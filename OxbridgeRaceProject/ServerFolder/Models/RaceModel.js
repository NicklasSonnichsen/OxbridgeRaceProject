const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_race = new mongoose.Schema({
    fld_Zipcode: {
      type: Number,
      required: true,
      index: true,
      unique: true,
      validate(value) {
        if (value < 0) throw new Error("No zipcode entered");
      }
    },

    // fld_Date:{
    //   type: Date,
    //   required: true,
    // },


  });

const Race = mongoose.model("tbl_race", tbl_race);
module.exports = Race;