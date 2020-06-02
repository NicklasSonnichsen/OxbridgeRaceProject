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

    fld_Date: {
      type: String,
      required: true,
      validate(value) {
        if (value == "") throw new Error("No Date entered");
      }
    },
    
    fld_IsStarted:
    {
      type:Boolean,
      required: true
    },

    fld_IsEnded:
    {
      type:Boolean,
      required: true
    },

    fld_RaceName: {
      type : String,
      required: true,
      validate(value) {
        if (value == "") throw new Error("No Name of the race entered");
      }
    },

    fld_RaceCoordinator:{
      type: String,
      required: true,
      validate(value) {
        if (value == "") throw new Error("No RaceCoordinator entered");
      }

    }


  });

const Race = mongoose.model("tbl_race", tbl_race);
module.exports = Race;