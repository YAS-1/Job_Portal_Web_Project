import db from "../config/db.config.js";

//Creating applications table
const applications_table = `CREATE TABLE IF NOT EXISTS applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    applicant_id INT NOT NULL,
    resume VARCHAR(255),
    cover_letter TEXT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES users(user_id) ON DELETE CASCADE
)`;


export const createApplicationsTable = async () => {
    try{
        await db.query(applications_table);
        console.log('Applications Table created');
    } catch (err) {
        console.log(`Error creating the applications table: ${err}`);
    }
}

export default createApplicationsTable;