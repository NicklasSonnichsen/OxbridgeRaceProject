const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_admin = new mongoose.Schema({
    fld_AdminName: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate(value) {
          if (value == "") throw new Error("Admin name must be entered");
        }
    },

    fld_AdminLastName: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate(value) {
          if (value == "") throw new Error("Admin name must be entered");
        }
    },

   
    fld_Email:{
        type: String,
        required: true,
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
    }
});

const Admin = mongoose.model("tbl_admin", tbl_admin);
module.exports = Admin;