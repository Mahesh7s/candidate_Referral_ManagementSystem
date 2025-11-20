const express = require("express");
const { body } = require("express-validator");
const {
  createReferral,
  getMyReferrals,
  getAllReferrals,
  updateReferral,
  updateStatus,
  deleteReferral,
  getResume
} = require("../controllers/referralController");

const auth = require("../middlewares/authMiddleware");
const { upload, handleUploadErrors } = require("../middlewares/resumeUpload");

const router = express.Router();

// Create referral route
router.post(
  "/",
  auth(["User", "Admin"]),
  upload.single("resume"),
  handleUploadErrors,
  [
    body("candidateName").notEmpty().withMessage("Candidate name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").isMobilePhone().withMessage("Valid phone required"),
    body("jobTitle").notEmpty().withMessage("Job title required")
  ],
  createReferral
);

// Get user referrals
router.get("/my", auth(["User", "Admin"]), getMyReferrals);

// Get all referrals
router.get("/", auth(["Admin"]), getAllReferrals);

// Update referral details
router.put("/:id", auth(["User", "Admin"]), updateReferral);

// Update referral with resume
router.put(
  "/:id/with-resume",
  auth(["User", "Admin"]),
  upload.single("resume"),
  handleUploadErrors,
  updateReferral
);

// Update status route
router.put(
  "/:id/status",
  auth(["Admin"]),
  [
    body("status")
      .isIn(["Pending", "Reviewed", "Rejected", "Selected"])
      .withMessage("Invalid status"),
  ],
  updateStatus
);

// Delete referral route
router.delete("/:id", auth(["User", "Admin"]), deleteReferral);

// Get resume route
router.get('/:id/resume', getResume);

module.exports = router;