const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const path = require("path");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://blogappirf.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/uploads", express.static( path.join(__dirname, "/uploads")));
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("API is Running...");
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});