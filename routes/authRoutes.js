const express = require("express");
const router = express.Router();
const { registerApplicant } = require("../controllers/authController");

const multer = require("multer");
const path = require("path");

// ✅ Proper storage setup to keep original file extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + file.fieldname + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Route for applicant registration
router.post("/", upload.single("resume"), registerApplicant);

module.exports = router;
