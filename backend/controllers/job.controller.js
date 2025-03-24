import db from '../config/db.config.js'; // Adjust according to your project structure

// Create a new job listing
export const createJob = async (req, res) => {
  const { title, description, location, salary_range, jobType, requirements } = req.body;

  // Validate required fields
  if (!title || !description || !location) {
    return res.status(400).json({ message: "Title, description, and location are required." });
  }

  try {
    const employer_id = req.user.userId; // Assuming `req.user` contains the authenticated employer's ID

    // Insert the new job into the database
    const query = `
      INSERT INTO jobs (title, description, location, salary_range, job_type, requirements, employer_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      title,
      description,
      location,
      salary_range || null,
      jobType || "Full-time",
      requirements || null,
      employer_id,
    ];

    await db.query(query, values);

    res.status(201).json({ message: "Job created successfully." });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Error creating job." });
  }
};

// Update an existing job listing
export const updateJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { title, description, requirements, location, job_type, salary_range, expiry_date, status } = req.body;
    const employer_id = req.user.userId;

    // Verify job exists and check ownership
    const [jobs] = await db.query("SELECT * FROM jobs WHERE job_id = ?", [job_id]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (jobs[0].employer_id !== employer_id) {
      return res.status(403).json({ message: "You are not authorized to update this job" });
    }

    // Get current job details
    const currentJob = jobs[0];

    // Create an array for the SET clause of the SQL update query
    const updateFields = [];
    const updateValues = [];

    // Add each attribute to the SET clause only if it is provided in the request
    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    } else {
      updateFields.push('title = ?');
      updateValues.push(currentJob.title);  // Keep the existing value
    }

    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    } else {
      updateFields.push('description = ?');
      updateValues.push(currentJob.description);  // Keep the existing value
    }

    if (requirements !== undefined) {
      updateFields.push('requirements = ?');
      updateValues.push(requirements);
    } else {
      updateFields.push('requirements = ?');
      updateValues.push(currentJob.requirements);  // Keep the existing value
    }

    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    } else {
      updateFields.push('location = ?');
      updateValues.push(currentJob.location);  // Keep the existing value
    }

    if (job_type !== undefined) {
      updateFields.push('job_type = ?');
      updateValues.push(job_type);
    } else {
      updateFields.push('job_type = ?');
      updateValues.push(currentJob.job_type);  // Keep the existing value
    }

    if (salary_range !== undefined) {
      updateFields.push('salary_range = ?');
      updateValues.push(salary_range);
    } else {
      updateFields.push('salary_range = ?');
      updateValues.push(currentJob.salary_range);  // Keep the existing value
    }

    if (expiry_date !== undefined) {
      updateFields.push('expiry_date = ?');
      updateValues.push(expiry_date);
    } else {
      updateFields.push('expiry_date = ?');
      updateValues.push(currentJob.expiry_date);  // Keep the existing value
    }

    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    } else {
      updateFields.push('status = ?');
      updateValues.push(currentJob.status);  // Keep the existing value
    }

    // Combine all the fields into the final query
    const updateQuery = `UPDATE jobs SET ${updateFields.join(', ')} WHERE job_id = ?`;
    updateValues.push(job_id); // Add the job_id to the end of the values array

    // Execute the update query
    await db.query(updateQuery, updateValues);

    res.status(200).json({ message: "Job updated successfully!" });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all job listings
export const getAllJobs = async (req, res) => {
  try {
    const [jobs] = await db.query("SELECT * FROM jobs");
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Get All Jobs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get job listing by ID
export const getJobById = async (req, res) => {
  try {
    const { job_id } = req.params;

    const [job] = await db.query("SELECT * FROM jobs WHERE job_id = ?", [job_id]);
    if (job.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job: job[0] });
  } catch (error) {
    console.error("Get Job by ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a job listing
export const deleteJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const employer_id = req.user.userId;

    // Verify job exists and check ownership
    const [jobs] = await db.query("SELECT employer_id FROM jobs WHERE job_id = ?", [job_id]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (jobs[0].employer_id !== employer_id) {
      return res.status(403).json({ message: "You are not authorized to delete this job" });
    }

    // Delete the job
    await db.query("DELETE FROM jobs WHERE job_id = ?", [job_id]);

    res.status(200).json({ message: "Job deleted successfully!" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search jobs
export const searchJobs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchQuery = `%${q}%`;
    const [jobs] = await db.query(
      `SELECT * FROM jobs 
       WHERE title LIKE ? 
       OR description LIKE ? 
       OR requirements LIKE ? 
       OR location LIKE ? 
       OR job_type LIKE ?`,
      [searchQuery, searchQuery, searchQuery, searchQuery, searchQuery]
    );

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Search Jobs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
