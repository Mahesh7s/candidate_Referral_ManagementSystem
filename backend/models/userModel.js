const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name:String,
	email:{type:String,required:true,unique:true},
	password:{type:String,required:true},
	role:{type:String,enum:["User","Admin"],default:"User"}
})

const userModel = mongoose.model("Users",userSchema);
module.exports = userModel;