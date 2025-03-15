import db from "../config/db.config.js";

const users_table = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Hashed with bcrypt
  role ENUM('employer', 'job_seeker', 'admin') NOT NULL,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


export const createUsersTable = () => {
    db.query(users_table, (err, result) => {
        if (err){
            throw err;
        }
        console.log('Table created');
    });
}

export default createUsersTable;

