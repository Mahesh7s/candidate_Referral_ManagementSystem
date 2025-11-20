// models/referralModel.js
const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  jobTitle: { type: String, required: true },
  resumeUrl: { type: String, required: true },

  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Rejected", "Selected"],
    default: "Pending"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Referral", referralSchema);
