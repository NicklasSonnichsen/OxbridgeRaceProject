const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const tbl_Crew = require("./CrewModel")

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
    fld_Date:{
      type: Date,
      required: true

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
        required: true,
        validate(value) {
          if (value == "") throw new Error("Crew name must be entered");
        }
    },

    fld_Captain:{
        type: String,
        required: true,
        validate(value){
            if (value ==""){
                throw new Error("Captain not defined")
            }
        }
    },

    fld_Members:{
        type: Number,
        required: true,
        validate(value){
            if(value < 0) throw new Error("Members must be more than 0");
        }
    },

    fld_Position:{
        type: Number,
        required: false,
        default: 0,
    },

    fld_Password:{
        type: String,
        required: true,
        validate(value){
            if(value == "") throw new Erros("Password must be entered");
        }
    },
    fld_Email:{
        type: String,
        required: true,
        validate(value){
            if(value == "") throw new Erros("Email must be entered");
        }
    },

        fld_Category:{
        type: String,
        required: true,
        validate(value){
            if(value == "") throw new Erros("Category must be selected");
        }
    },
  }]
  });

const Race = mongoose.model("tbl_race", tbl_race);
module.exports = Race;