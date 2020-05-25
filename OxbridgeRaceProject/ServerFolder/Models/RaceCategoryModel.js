const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_racecategory = new mongoose.Schema({
    fld_CategoryName: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate(value) {
        if (value == "") throw new Error("No category entered");
      }
    },
  });

const RaceCategory = mongoose.model("tbl_racecategory", tbl_racecategory);
module.exports = RaceCategory;