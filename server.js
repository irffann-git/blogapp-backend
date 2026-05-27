const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

connectDB();

const app = express();

/* =========================
   CREATE UPLOADS FOLDER
========================= */

const uploadPath = "/opt/render/project/src/uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: [
      "https://blogappirf.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   STATIC UPLOADS
========================= */

// app.use(
//   "/uploads",
//   express.static(uploadPath)
// );

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/comments", commentRoutes);

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("API is Running...");
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});