const { body, validationResult } = require("express-validator");

// Custom phone number validation
const validatePhoneNumber = (value) => {
  // Remove any non-digit characters
  const cleanPhone = value.replace(/\D/g, '');
  
  // Check if it's exactly 10 digits
  if (cleanPhone.length !== 10) {
    throw new Error('Please enter a 10-digit phone number');
  }
  
  // Check for invalid patterns
  const invalidPatterns = [
    { pattern: /^0+$/, message: 'Phone number cannot be all zeros' },
    { pattern: /^1+$/, message: 'Phone number cannot be all ones' },
    { pattern: /^1234567890$/, message: 'Phone number cannot be sequential numbers' },
    { pattern: /^(\d)\1+$/, message: 'Phone number cannot have all same digits' },
  ];
  
  for (let { pattern, message } of invalidPatterns) {
    if (pattern.test(cleanPhone)) {
      throw new Error(message);
    }
  }
  
  return true;
};

// Custom email validation
const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(value)) {
    throw new Error('Please enter a valid email address (example: name@company.com)');
  }
  
  // Check for common invalid email patterns
  const invalidPatterns = [
    { pattern: /^test@/i, message: 'Please use a real email address, not test accounts' },
    { pattern: /^demo@/i, message: 'Please use a real email address, not demo accounts' },
    { pattern: /^admin@/i, message: 'Please use a personal or company email address' },
    { pattern: /^user@/i, message: 'Please use a valid email address' },
    { pattern: /123@/, message: 'Email address seems invalid' },
    { pattern: /abc@/, message: 'Email address seems invalid' },
  ];
  
  for (let { pattern, message } of invalidPatterns) {
    if (pattern.test(value)) {
      throw new Error(message);
    }
  }
  
  return true;
};

// Validation middleware for referral creation/update
const validateReferralData = [
  body("candidateName")
    .notEmpty()
    .withMessage("Please enter candidate name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name should be between 2 to 50 characters")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Name can only contain letters and spaces"),
  
  body("email")
    .notEmpty()
    .withMessage("Please enter email address")
    .isEmail()
    .withMessage("Please enter a valid email format (name@domain.com)")
    .custom(validateEmail)
    .withMessage("Please provide a valid email address"),
  
  body("phone")
    .notEmpty()
    .withMessage("Please enter phone number")
    .isMobilePhone('any')
    .withMessage("Please enter a valid phone number")
    .custom(validatePhoneNumber)
    .withMessage("Please enter a valid 10-digit phone number"),
  
  body("jobTitle")
    .notEmpty()
    .withMessage("Please enter job title")
    .isLength({ min: 2, max: 100 })
    .withMessage("Job title should be between 2 to 100 characters"),
  
  // Handle validation errors - sends first error only
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Get only the first error to show in toast
      const firstError = errors.array()[0].msg;
      
      return res.status(400).json({ 
        success: false, 
        message: firstError
      });
    }
    next();
  }
];

// Alternative: Sequential validation that stops at first error
const validateReferralDataSequential = [
  // Candidate Name validation
  (req, res, next) => {
    if (!req.body.candidateName || req.body.candidateName.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter candidate name" 
      });
    }
    
    if (req.body.candidateName.length < 2 || req.body.candidateName.length > 50) {
      return res.status(400).json({ 
        success: false, 
        message: "Name should be between 2 to 50 characters" 
      });
    }
    
    if (!/^[a-zA-Z\s]*$/.test(req.body.candidateName)) {
      return res.status(400).json({ 
        success: false, 
        message: "Name can only contain letters and spaces" 
      });
    }
    
    next();
  },
  
  // Email validation
  (req, res, next) => {
    if (!req.body.email || req.body.email.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter email address" 
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter a valid email format (name@domain.com)" 
      });
    }
    
    // Check for invalid email patterns
    const invalidEmailPatterns = [
      { pattern: /^test@/i, message: 'Please use a real email address, not test accounts' },
      { pattern: /^demo@/i, message: 'Please use a real email address, not demo accounts' },
      { pattern: /^admin@/i, message: 'Please use a personal or company email address' },
    ];
    
    for (let { pattern, message } of invalidEmailPatterns) {
      if (pattern.test(req.body.email)) {
        return res.status(400).json({ 
          success: false, 
          message: message 
        });
      }
    }
    
    next();
  },
  
  // Phone validation
  (req, res, next) => {
    if (!req.body.phone || req.body.phone.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter phone number" 
      });
    }
    
    const cleanPhone = req.body.phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter a 10-digit phone number" 
      });
    }
    
    // Check for invalid phone patterns
    const invalidPhonePatterns = [
      { pattern: /^0+$/, message: 'Phone number cannot be all zeros' },
      { pattern: /^1+$/, message: 'Phone number cannot be all ones' },
      { pattern: /^1234567890$/, message: 'Phone number cannot be sequential numbers' },
      { pattern: /^(\d)\1+$/, message: 'Phone number cannot have all same digits' },
    ];
    
    for (let { pattern, message } of invalidPhonePatterns) {
      if (pattern.test(cleanPhone)) {
        return res.status(400).json({ 
          success: false, 
          message: message 
        });
      }
    }
    
    next();
  },
  
  // Job Title validation
  (req, res, next) => {
    if (!req.body.jobTitle || req.body.jobTitle.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter job title" 
      });
    }
    
    if (req.body.jobTitle.length < 2 || req.body.jobTitle.length > 100) {
      return res.status(400).json({ 
        success: false, 
        message: "Job title should be between 2 to 100 characters" 
      });
    }
    
    next();
  }
];

module.exports = {
  validateReferralData,           // Shows first error only
  validateReferralDataSequential, // Sequential validation (stops at first error)
  validatePhoneNumber,
  validateEmail
};