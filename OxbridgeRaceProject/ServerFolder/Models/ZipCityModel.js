const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_zipcity = new mongoose.Schema({ id:false,
    fld_Zipcode: {
      type: Number,
      unique: true,
      index: true,
      required: true,
    },
    fld_City: {
      type: String,
      required: true,
      validate(value) {
        if (value == "") throw new Error("No city entered");
      }
    },
  });

const ZipCity = mongoose.model("tbl_zipcity", tbl_zipcity);
module.exports = ZipCity;