const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_eventCoordinators = new mongoose.Schema({
    fld_FirstName: {
      type: String,
      required: true,
      validate(value) {
        if (value == "") throw new Error("No first name entered");
      }
    },
    fld_LastName: {
        type: String,
        required: true,
        validate(value) {
          if (value == "") throw new Error("No last name entered");
        }
      },
      fld_Email:{
        type: String,
        required: true,
        unique: true,
        index: true,
        validate(value){
            if(value == "") throw new Errors("Email must be entered");
        }
    },

    fld_Password:{
        type: String,
        required: true,
        validate(value){
            if(value == "") throw new Errors("Password must be entered");
        }
    },
  });

const EventCoordinators = mongoose.model("tbl_eventCoordinators", tbl_eventCoordinators);
module.exports = EventCoordinators;