const express = require("express");
const userRouter = require("./routes/userRoutes");
const referralRouter = require("./routes/referralRoutes");
const connectToDataBase = require("./configs/database");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Simple and direct CORS - works for most deployments
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000",
    "https://candidate-referral-management.netlify.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('', cors());

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