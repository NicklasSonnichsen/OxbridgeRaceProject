const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_GPSCoordinates = new mongoose.Schema({
    fld_CrewName: {
      type: String,
      required: true,
      validate(value) {
        if (value == "") throw new Error("No Crew name entered");
      }
    },
    fld_Date: {
        type: Date,
        required: true,
        validate(value) {
          if (value == "") throw new Error("No Date entered");
        }
      },
    fld_Lattitude: {
        type: Number,
        required: true,
        validate(value){
            if(value == "") throw new Erros("Lattitude be entered");
        }
    },

    fld_Longitude: {
        type: Number,
        required: true,
        validate(value){
            if(value == "") throw new Erros("Longitude must be entered");
        }
    },
  });

const GPSCoordinates = mongoose.model("tbl_GPSCoordinates", tbl_GPSCoordinates);
module.exports = GPSCoordinates;