# 🌟 Candidate Referral Management System

A full-stack web application for managing employee referrals with **role-based access**, **Cloudinary PDF uploads**, and **secure authentication**.

## 🚀 Live Deployment Links

### **Frontend (Live App):**  
👉 https://candidate-referral-management.netlify.app/

### **Backend (API Server):**  
👉 https://candidate-referral-managementsystem.onrender.com

## 🔐 Admin Credentials (for Testing)

Email: admin@gmail.com  
Password: admin@123

## 📂 Project Structure

/backend  
/frontend  
README.md

## ✨ Features Implemented

### 👤 User Authentication
- JWT-based Authentication
- Login & Register
- Role-based Access (Admin / User)
- Protected Routes

### 📝 Referral Management
- Create a referral
- Upload candidate resume (PDF only)
- Update your referral
- Delete your referral
- Open PDF in a new tab
- Cloudinary Integration

### 👑 Admin Features
- View ALL referrals
- Update referral Status
- Access any resume

### ☁️ Cloud Features
- Cloudinary Unsigned PDF Uploads
- Auto-generated public resume URL
- Direct PDF access without token

### 🔐 Validations
- Email validation
- Phone number (10-digit) validation
- Form validations using express-validator

### 🖥 Frontend Features
- Responsive UI
- User Dashboard
- Admin Dashboard
- Resume Preview
- Status update controls

# ⚙️ Backend Setup Instructions

## 1️⃣ Clone Repository
```bash
git clone https://github.com/Mahesh7s/candidate_Referral_ManagementSystem.git
cd candidate_Referral_ManagementSystem/backend
```

## 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Create .env File (Backend)
```
PORT=5000
MONGO_URI=your_mongo_db_url

# JWT
JWT_PRIVATE_KEY=your_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 4️⃣ Start Backend
```bash
npm run dev
```

# 🎨 Frontend Setup Instructions

## 1️⃣ Navigate to Frontend
```bash
cd ../frontend
```

## 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Create .env File (Frontend)
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
# OR Production:
REACT_APP_API_BASE_URL=https://candidate-referral-managementsystem.onrender.com/api
```

## 4️⃣ Start Frontend
```bash
npm start
```

# 📚 API Documentation

## 🔐 Auth Routes

### POST /api/auth/register
```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "john123"
}
```

### POST /api/auth/login
```json
{
  "email": "john@gmail.com",
  "password": "john123"
}
```

# 📝 Referral Routes (Require Token)
Authorization: Bearer <token>

📝 Referral Management Routes
🔒 All referral routes require JWT token in Authorization header:

text
Authorization: Bearer <your_jwt_token>
  # POST /api/referral/
Create a new candidate referral with resume.

Form Data:

candidateName: John Doe

email: candidate@example.com

phone: 9876543210

jobTitle: Software Engineer

resume: [PDF File]

# GET /api/referral/my
Get all referrals created by the logged-in user.

# GET /api/referral/
👑 Admin Only - Get all referrals from all users.

# PUT /api/referral/:id
Update referral details (without changing resume).

# PUT /api/referral/:id/with-resume
Update referral details and upload new resume.

Form Data includes:

resume: [New PDF File]

# PUT /api/referral/:id/status
👑 Admin Only - Update candidate application status.

Request Body:

json
{
  "status": "Selected"
}
Available Status Values:

Pending

Reviewed

Selected

Rejected

# DELETE /api/referral/:id
Delete a referral (users can only delete their own).

# GET /api/referral/:id/resume
Open candidate resume PDF in browser.

## 📦 Technology Stack
Frontend
⚛️ React - User Interface Library

🎨 Vite - Build Tool & Development Server

🔄 Redux Toolkit - State Management

🌐 Axios - HTTP Client

🧭 React Router - Navigation

💫 React Toastify - Notifications

Backend
🟢 Node.js - Runtime Environment

🚀 Express.js - Web Application Framework

📁 Multer - File Upload Handling

☁️ Cloudinary - Cloud File Storage

🔐 JWT - JSON Web Tokens

✅ Express-Validator - Input Validation

🌍 CORS - Cross-Origin Resource Sharing

Database
🍃 MongoDB - NoSQL Database

⚡ Mongoose - Object Data Modeling




