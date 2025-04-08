import db from "../config/db.config.js";



// Apply for a job (resume & cover letter uploads)
export const applyForJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const applicant_id = req.user.userId;

    if (!job_id) {
      return res.status(400).json({ message: "Job ID is required." });
    }

    // Get file paths from multer
    const resumeFile = req.files["resume"] ? req.files["resume"][0].path : null;
    const coverLetterFile = req.files["cover_letter"] ? req.files["cover_letter"][0].path : null;

    await db.query(
      "INSERT INTO applications (job_id, applicant_id, resume, cover_letter) VALUES (?, ?, ?, ?)",
      [job_id, applicant_id, resumeFile, coverLetterFile]
    );

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Apply For Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get all applications for a job (For Employers)
export const getJobApplications = async (req, res) => {
  try {
    const { job_id } = req.params;
    const employer_id = req.user.userId;

    // Fetch job details created by the employer
    const [job] = await db.query(
      "SELECT * FROM jobs WHERE job_id = ? AND employer_id = ?",
      [job_id, employer_id]
    );

    if (job.length === 0) {
      return res.status(403).json({ message: "You do not have permission to view these applications." });
    }

    // Fetch applications for the job
    const [applications] = await db.query(
      `SELECT applications.*, jobs.title AS job_title, users.full_name AS applicant_name 
       FROM applications
       JOIN jobs ON applications.job_id = jobs.job_id
       JOIN users ON applications.applicant_id = users.user_id
       WHERE applications.job_id = ?`,
      [job_id]
    );

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this job." });
    }

    // Return the job along with its applications
    res.status(200).json({
      job: job[0], // Return the job details
      applications, // Return the applications
    });
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





// View the applications submitted by the logged-in user
export const getUserApplications = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const [applications] = await db.query("SELECT * FROM applications WHERE applicant_id = ?", [user_id]);

    res.status(200).json(applications);
  } catch (error) {
    console.error("Get User Applications Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Download resume or cover letter
export const downloadFile = async (req, res) => {
  try {
    const { application_id, fileType } = req.params;

    // Retrieve the file path from the database
    const [result] = await db.query("SELECT resume, cover_letter FROM applications WHERE application_id = ?", [application_id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    const filePath = fileType === "resume" ? result[0].resume : result[0].cover_letter;
    if (!filePath) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(filePath);
  } catch (error) {
    console.error("Download File Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
