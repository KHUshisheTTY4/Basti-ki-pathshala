const applicantModel = require("../models/applicantModel");

const registerApplicant = async (req, res) => {
  const {
    name,
    email,
    phoneno,
    gender,
    dob,
    address,
    education,
    skills,
    motivation,
    availability,
  } = req.body;

  const resume = req.file?.filename;

  // Validate all required fields
  if (
    !name || !email || !phoneno || !gender || !resume ||
    !dob || !address || !education || !skills || !motivation || !availability
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await applicantModel.createApplicant({
      name,
      email,
      phoneno,
      gender,
      resume,
      dob,
      address,
      education,
      skills,
      motivation,
      availability,
    });

    res.status(201).json({
      message: "Applicant registered successfully",
      applicantId: result.insertId,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerApplicant,
  
};
