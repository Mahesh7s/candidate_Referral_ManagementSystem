const { body, validationResult } = require("express-validator");

// Custom phone number validation
const validatePhoneNumber = (value) => {
  // Remove any non-digit characters
  const cleanPhone = value.replace(/\D/g, '');
  
  // Check if it's exactly 10 digits
  if (cleanPhone.length !== 10) {
    throw new Error('Phone number must be exactly 10 digits');
  }
  
  // Check for invalid patterns
  const invalidPatterns = [
    /^0+$/, // All zeros
    /^1+$/, // All ones
    /^1234567890$/, // Sequential
    /^(\d)\1+$/, // All same digits
  ];
  
  for (let pattern of invalidPatterns) {
    if (pattern.test(cleanPhone)) {
      throw new Error('Invalid phone number pattern');
    }
  }
  
  return true;
};

// Custom email validation
const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(value)) {
    throw new Error('Invalid email format');
  }
  
  // Check for common invalid email patterns
  const invalidPatterns = [
    /^test@/i,
    /^demo@/i,
    /^admin@/i,
    /^user@/i,
    /123@/,
    /abc@/,
  ];
  
  for (let pattern of invalidPatterns) {
    if (pattern.test(value)) {
      throw new Error('Please use a valid email address');
    }
  }
  
  return true;
};

// Validation middleware for referral creation/update
const validateReferralData = [
  body("candidateName")
    .notEmpty()
    .withMessage("Candidate name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2-50 characters")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Name can only contain letters and spaces"),
  
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(validateEmail)
    .withMessage("Please provide a valid email address"),
  
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone('any')
    .withMessage("Must be a valid phone number")
    .custom(validatePhoneNumber)
    .withMessage("Phone number must be 10 digits and valid"),
  
  body("jobTitle")
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Job title must be between 2-100 characters"),
  
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed",
        errors: errorMessages 
      });
    }
    next();
  }
];

module.exports = {
  validateReferralData,
  validatePhoneNumber,
  validateEmail
};