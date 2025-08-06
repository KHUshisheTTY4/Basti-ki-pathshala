const db = require('../config/db');

// Create a new applicant
exports.createApplicant = (data) => {
  const sql = `
    INSERT INTO applicants (
      name, email, phoneno, gender,  dob, address, education, skills, motivation, availability, resume
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.name,
    data.email,
    data.phoneno,
    data.gender,
    data.dob,
    data.address,
    data.education,
    data.skills,
    data.motivation,
    data.availability,
    data.resume,
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get all applicants
exports.getAllApplicants = () => {
  const sql = 'SELECT * FROM applicants';

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
