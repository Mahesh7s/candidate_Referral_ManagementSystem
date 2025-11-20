// middlewares/uploadMiddleware.js - UPDATED WITH UNSIGNED UPLOAD
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

console.log("🔧 Setting up UNSIGNED upload middleware...");

// UNSIGNED UPLOAD: Bypass security restrictions
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    allowed_formats: ["pdf"],
    resource_type: "auto", // Use auto for better compatibility
    public_id: (req, file) => {
      const originalName = file.originalname.replace(/\.[^/.]+$/, "");
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9-_]/g, '_');
      return `resume_${Date.now()}_${sanitizedName}`;
    },
    access_mode: "public", // Make files publicly accessible
    type: "upload",
    // ✅ CRITICAL: Use unsigned uploads
upload_preset: "unsigned_pdfs"
  },
});

// Rest remains the same...
const fileFilter = (req, file, cb) => {
  console.log("📄 File received:", file.originalname, file.mimetype);
  
  if (file.mimetype !== "application/pdf") {
    console.log("❌ Invalid file type:", file.mimetype);
    return cb(new Error("Only PDF files allowed!"), false);
  }
  console.log("✅ Valid PDF file");
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

module.exports = { upload, handleUploadErrors };