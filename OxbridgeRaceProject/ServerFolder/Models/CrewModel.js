const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tbl_crew = new mongoose.Schema({
    fld_CrewName: {
        type: String,
        required: true,
        unique: true,
        index: true,
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
            if(value == "") throw new Errors("Password must be entered");
        }
    },
    fld_Email:{
        type: String,
        required: true,
        validate(value){
            if(value == "") throw new Errors("Email must be entered");
        }
    },

        fld_Category:{
        type: String,
        required: true,
        validate(value){
            if(value == "") throw new Errors("Category must be selected");
        }
    },
});

const Crew = mongoose.model("tbl_crew", tbl_crew);
module.exports = Crew;