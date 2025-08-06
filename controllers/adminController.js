const db = require("../config/db");

const getAllApplicants = async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM applicants");

    // Add resume URL to each applicant
    const applicants = rows.map(app => ({
      ...app,
      resumeUrl: `http://localhost:5000/uploads/${app.resume}`,
    }));

    res.status(200).json({ applicants });
  } catch (error) {
    console.error("DB Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getAllApplicants,
};
