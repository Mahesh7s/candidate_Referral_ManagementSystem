🌟 Candidate Referral Management System

A full-stack web application for managing employee referrals with role-based access, Cloudinary PDF uploads, and secure authentication.

🚀 Live Deployed Backend

Base URL:
👉 https://candidate-referral-managementsystem.onrender.com

Admin Credentials for Testing:

Email: admin@gmail.com

Password: admin@123

⚠️ Use these credentials to test Admin-only features such as viewing all referrals, updating status, etc.

📂 Project Structure
/backend
/frontend
README.md

✨ Features Implemented
👤 User Authentication

Register and Login with JWT

Role-based access: Admin, User

Secure protected routes

📝 Referral Management

Create a referral

Upload candidate resume (PDF only)

Cloudinary integration

Update your referral

Admin can update referral status

Open resume in new tab (PDF viewer)

Delete referral

🗂 Admin Features

View all referrals

Update candidate status

Access every resume

☁️ Cloud Features

Cloudinary unsigned PDF uploads

Auto-generated public URL

Resume available without authentication

🔐 Validations

Proper email validation

Realistic 10-digit phone number validation

Form validation using express-validator

Reject invalid names, emails, phone numbers

🖥 Frontend Features

User login UI

Admin dashboard

Referral form

Resume preview

Status update buttons

Responsive UI

⚙️ Backend Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend

2️⃣ Install Packages
npm install

3️⃣ Create .env File (Backend)

Create /backend/.env with these keys:

PORT=5000
MONGO_URI=your_mongo_db_url

# JWT
JWT_PRIVATE_KEY=your_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
UPLOAD_PRESET=unsigned_pdfs   # (must match Cloudinary unsigned preset)


⚠️ Do NOT commit .env to GitHub.

4️⃣ Start Backend

Development:

npm run dev


Production:

npm start


API Base:

http://localhost:5000/api

🎨 Frontend Setup Instructions
1️⃣ Navigate to Frontend
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File (Frontend)

Inside /frontend/.env:

REACT_APP_API_BASE_URL=http://localhost:5000/api
# OR for production:
REACT_APP_API_BASE_URL=https://candidate-referral-managementsystem.onrender.com/api

4️⃣ Run Frontend
npm start


It should automatically open:
👉 http://localhost:3000/

📚 API Documentation
🔐 Auth Routes
POST /api/auth/register

Register a new user.
Body

{
  "name": "John",
  "email": "john@gmail.com",
  "password": "john123"
}

POST /api/auth/login

Login user & receive JWT token.
Body

{
  "email": "john@gmail.com",
  "password": "john123"
}


Response

{
  "success": true,
  "token": "jwt_token_here"
}

📝 Referral Routes

⚠️ All referral routes require Authorization header:

Authorization: Bearer <token>

✅ POST /api/referral/

Create referral (with resume PDF).
Form-Data:

candidateName: John Doe
email: john@gmail.com
phone: 9876543210
jobTitle: Software Engineer
resume: <PDF file>

📄 GET /api/referral/my

Get referrals created by logged-in user.

👑 GET /api/referral/

(Admin Only) Get ALL referrals.

✏️ PUT /api/referral/:id

Update referral (without changing resume).

📎 PUT /api/referral/:id/with-resume

Update referral + upload new resume.

Form-Data includes:

resume: <PDF file>

🏷 PUT /api/referral/:id/status

(Admin only) Update candidate status.
Body:

{
  "status": "Selected"
}

❌ DELETE /api/referral/:id

Delete your own referral.

📜 GET /api/referral/:id/resume

Open candidate resume PDF in browser.
👍 Works directly because the file is served from Cloudinary.

📦 Tech Stack
Frontend

React

Axios

Redux Toolkit

React Router

Backend

Node.js

Express.js

Multer

Cloudinary

JWT Authentication

Express-Validator

Database

MongoDB + Mongoose