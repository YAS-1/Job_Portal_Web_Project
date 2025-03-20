import db from "../config/db.config.js";

//Creating jobs table
const jobs_table = `CREATE TABLE IF NOT EXISTS jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    requirements VARCHAR(255),
    location VARCHAR(255),
    job_type ENUM('Full-time', 'Part-time', 'Remote') NOT NULL,
    salary_range VARCHAR(50),
    expiry_date DATE,
    status ENUM('active', 'closed') DEFAULT 'active',
    FOREIGN KEY (employer_id) REFERENCES users(user_id) ON DELETE CASCADE
)`;


export const createJobsTable = async () => {
    try{
        await db.query(jobs_table);
        console.log('Jobs Table created');
    } catch (err) {
        console.log(`Error in creating jobs table: ${err}`);
    }
}

export default createJobsTable;