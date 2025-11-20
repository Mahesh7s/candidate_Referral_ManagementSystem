const mongoose = require("mongoose");

const connectToDataBase = async()=>{
	try{
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to the database");
	}catch(err){
		console.log(`Failed to Connect to the Databse, Error:${err.message}`);
	}
}


module.exports = connectToDataBase;