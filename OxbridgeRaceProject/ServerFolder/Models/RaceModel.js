const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const tbl_Crew = require("./CrewModel")

const tbl_race = new mongoose.Schema({
    fld_Zipcode: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error("No zipcode entered");
      }
    },
    fld_Date:{
      type: String,

    },
    fld_IsStarted:{
      type: Boolean,
      required: true
    },
    fld_IsEnded:{
      type: Boolean,
      required: true
    },
    fld_RaceName:{
      type: String,
      required: true,
      validate(value){
        if (value == ""){
          throw new Error("Race name must be entered")
        }
      }
    },
    fld_RaceCoordinator:{
      type: String,
      required: true,
      validate(value){
        if (value == ""){
          throw new Error("Race coordinator must be entered")
        }
      }
    },
    fld_Contestants: [{

      fld_CrewName: {
        type: String,
        
    },

    fld_Captain:{
        type: String,
        
    },

    fld_Members:{
        type: Number,
        
    },

    fld_Position:{
        type: Number,
        
    },

    fld_Password:{
        type: String,
        
    },
    fld_Email:{
        type: String,
        
    },

        fld_Category:{
        type: String,
        
    },
  }]
  });

const Race = mongoose.model("tbl_race", tbl_race);
module.exports = Race;