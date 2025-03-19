import db from "../config/db.config.js";

const jobPostings_table = `CREATE TABLE IF NOT EXISTS job_postings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// Function to create the job postings table
export const createJobPostingsTable = async () => {
    try {
        await db.query(jobPostings_table);
        console.log('Job postings table created');
    } catch (err) {
        console.log(err);
    }
}

// Example CRUD operations for job postings.
// This needs to be revised to match the actual requirements of the application.

export const createJobPosting = async (data) => {
    const { title, description, company, location, salary } = data;
    const result = await db.query("INSERT INTO job_postings (title, description, company, location, salary) VALUES (?, ?, ?, ?, ?)", [title, description, company, location, salary]);
    return result;
};

export const getJobPostings = async () => {
    const [rows] = await db.query("SELECT * FROM job_postings");
    return rows;
};

export const updateJobPosting = async (id, data) => {
    const { title, description, company, location, salary } = data;
    const result = await db.query("UPDATE job_postings SET title = ?, description = ?, company = ?, location = ?, salary = ? WHERE id = ?", [title, description, company, location, salary, id]);
    return result;
};

export const deleteJobPosting = async (id) => {
    const result = await db.query("DELETE FROM job_postings WHERE id = ?", [id]);
    return result;
};

export default createJobPostingsTable;
