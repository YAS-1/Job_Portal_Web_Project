import db from "../config/db.config.js";

//Creating users table
const users_table = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles SET('jobseeker', 'employer', 'admin') NOT NULL DEFAULT 'jobseeker',
    otp_code VARCHAR(6) NULL,
    otp_expires TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


export const createUsersTable = async () => {
    try{
        await db.query(users_table);
        console.log('Users Table created');
    } catch (err) {
        console.log(`Error in creating users table: ${err}`);
    }
}

export default createUsersTable;
