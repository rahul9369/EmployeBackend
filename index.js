const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employeRouter = require("./routes/employeRoutes");
const userRouter = require("./routes/userRoutes");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB is connected !!!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://employees-rahul.netlify.app"], // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Include headers used in requests
    credentials: true, // Allow cookies or authorization headers if needed
  })
);

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRouter);
app.use(employeRouter);

// Start server
app.listen(8080, () => {
  console.log("Server started at Port 8080");
});
