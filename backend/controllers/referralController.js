const Referral = require("../models/referralModel");

// Create new referral
exports.createReferral = async (req, res) => {
  try {
    const userId = req.user;
    const { candidateName, email, phone, jobTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Resume is required" });
    }

    // Additional duplicate check
    const existingReferral = await Referral.findOne({ 
      email, 
      createdBy: userId 
    });
    
    if (existingReferral) {
      return res.status(400).json({ 
        success: false, 
        message: "A referral with this email already exists" 
      });
    }

    const newReferral = await Referral.create({
      candidateName,
      email,
      phone,
      jobTitle,
      resumeUrl: req.file.path,
      createdBy: userId
    });

    const populatedReferral = await Referral.findById(newReferral._id).populate("createdBy", "name email");
    res.status(201).json({ success: true, data: populatedReferral });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's referrals
exports.getMyReferrals = async (req, res) => {
  try {
    const userId = req.user;
    const referrals = await Referral.find({ createdBy: userId }).populate("createdBy", "name email");
    res.json({ success: true, data: referrals });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all referrals (admin)
exports.getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find().populate("createdBy", "name email");
    res.json({ success: false, data: referrals });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update referral details
exports.updateReferral = async (req, res) => {
  try {
    const referralId = req.params.id;
    const role = req.role;
    const userId = req.user;

    let referral = await Referral.findById(referralId);
    if (!referral) return res.status(404).json({ success: false, message: "Referral not found" });

    // Check user permissions
    if (role === "User" && referral.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updateData = { ...req.body };
    // Users cannot update status
    if (role === "User" && updateData.status) {
      delete updateData.status;
    }

    // Handle resume update
    if (req.file) {
      updateData.resumeUrl = req.file.path;
    }

    referral = await Referral.findByIdAndUpdate(
      referralId, 
      updateData, 
      { new: true }
    ).populate("createdBy", "name email");

    res.json({ success: true, data: referral });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update referral status
exports.updateStatus = async (req, res) => {
  try {
    const referralId = req.params.id;
    const { status } = req.body;

    const referral = await Referral.findByIdAndUpdate(
      referralId,
      { status },
      { new: true }
    ).populate("createdBy", "name email");

    if (!referral) {
      return res.status(404).json({ success: false, message: "Referral not found" });
    }

    res.json({ success: true, data: referral });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete referral
exports.deleteReferral = async (req, res) => {
  try {
    const referralId = req.params.id;
    const role = req.role;
    const userId = req.user;

    const referral = await Referral.findById(referralId);
    if (!referral) return res.status(404).json({ success: false, message: "Referral not found" });

    if (role === "User" && referral.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Referral.findByIdAndDelete(referralId);
    res.json({ success: true, message: "Referral deleted" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get resume file
exports.getResume = async (req, res) => {
  try {
    const referralId = req.params.id;
    const referral = await Referral.findById(referralId);

    if (!referral || !referral.resumeUrl) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const fileUrl = referral.resumeUrl;
    return res.redirect(fileUrl);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};