const express = require("express");
const userRouter = require("./routes/userRoutes");
const referralRouter = require("./routes/referralRoutes");
const connectToDataBase = require("./configs/database");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration from environment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "http://localhost:3000",
      process.env.FRONTEND_URL // Your deployed frontend URL
    ].filter(Boolean); // Remove any undefined values
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectToDataBase();

// Health check endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running" });
});

// Application routes
app.use("/api/user", userRouter);
app.use("/api/referral", referralRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Referral System API" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});