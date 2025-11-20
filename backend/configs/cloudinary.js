// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// module.exports = cloudinary;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

console.log("🔧 Configuring Cloudinary...");
console.log("Cloud Name:", process.env.CLOUD_NAME ? "✅ Set" : "❌ Missing");
console.log("API Key:", process.env.CLOUD_API_KEY ? "✅ Set" : "❌ Missing");
console.log("API Secret:", process.env.CLOUD_API_SECRET ? "✅ Set" : "❌ Missing");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;
