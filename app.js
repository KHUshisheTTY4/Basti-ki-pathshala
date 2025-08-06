const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
const cors = require("cors");
const fs = require("fs"); // ✅ Required for file handling
const mime = require("mime-types"); // ✅ Used to detect file types

// Load environment variables
require("dotenv").config();

// Middlewares
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/applicants", authRoutes);
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Route to serve resumes inline (PDF) or downloadable (other files)
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  // Check file existence
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const mimeType = mime.lookup(filePath) || "application/octet-stream";
  res.setHeader("Content-Type", mimeType);

  // Set correct disposition
  if (mimeType === "application/pdf") {
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
  } else {
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  }

  // Send file as stream (this preserves binary content)
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
