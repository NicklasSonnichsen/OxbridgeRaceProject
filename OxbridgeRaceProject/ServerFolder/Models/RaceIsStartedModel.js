const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_RaceIsStarted = new mongoose.Schema({

    fld_Id: {
        type: Number,
        required: true,
        validate(value) {
          if (value < 0) throw new Error("No ID entered");
        }
      },
      fld_IsStarted:{
        type: Boolean
  
      }
})
const RaceIsStarted = mongoose.model("tbl_RaceIsStarted", tbl_RaceIsStarted);
module.exports = RaceIsStarted;