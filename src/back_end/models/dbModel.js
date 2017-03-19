var mongoose = require("mongoose");

//TODO: should be uncommented, if you want authorization
// mongoose.connect("mongodb://localhost:27017/Users");

mongoose.set("debug", true);

module.exports.User = require("./userModel");