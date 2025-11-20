const express = require("express");
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
const { validateReferralData } = require("../middlewares/validationMiddleware");

const router = express.Router();

// Create referral route
router.post(
  "/",
  auth(["User", "Admin"]),
  upload.single("resume"),
  handleUploadErrors,
  validateReferralData,
  createReferral
);

// Get user referrals
router.get("/my", auth(["User", "Admin"]), getMyReferrals);

// Get all referrals
router.get("/", auth(["Admin"]), getAllReferrals);

// Update referral details
router.put(
  "/:id", 
  auth(["User", "Admin"]), 
  validateReferralData,
  updateReferral
);

// Update referral with resume
router.put(
  "/:id/with-resume",
  auth(["User", "Admin"]),
  upload.single("resume"),
  handleUploadErrors,
  validateReferralData,
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