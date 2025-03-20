import db from "../config/db.config";


export const createJob = async (req, res) => {

    try {
        const { title, description, requirements, location, job_type, salary_range, expiry_date } = req.body;
        const employer_id = req.user.userId;


        const [result] = await db.query (
            `INSERT INTO jobs 
            (employer_id, title, description, requirements, location, job_type, salary_range, expiry_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [employer_id, title, description, requirements, location, job_type, salary_range, expiry_date]
        );

        res.status(201).json({ message: "Job created!", job_id: result.insertId});
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getJobs = async (req, res) => {

    try {
        const [jobs] = await db.query("SELECT * FROM jobs WHERE status = 'active'");
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error in getting jobs:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateJob = async (req, res) => {

    try {
        const { job_id } = req.params;
        const { title, description, requirements, location, job_type, salary_range, expiry_date, status } = req.body;

        const [jobs] = await db.query("SELECT employer_id FROM jobs WHERE job_id = ?", [job_id]);
        if (jobs.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (jobs[0].employer_id !== req.user.userId) {
            return res.status(403).json({ message: "You're not authorized to update this job"});
        }

        await db.query (
          `UPDATE jobs SET title = ?, description = ?, requirements = ?, location = ?, job_type = ?, salary_range = ?, expiry_date = ?, status = ? WHERE job_id = ?`,
          [title, description, requirements, location, job_type, salary_range, expiry_date, status, job_id]
        );

        res.status(200).json({ message: "Job updated!" });
    } catch (error) {
        console.error("Update error: ", error);
        res.status(500).json({ message: "Server error"});
    }
};


export const deleteJob = async (req, res) => {

    try {
        const { job_id } = req.params;

        const[jobs] = await db.query ("SELECT employer_id FROM jobs WHERE job_id = ?", [job_id]);
        if (jobs.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (jobs[0].employer_id !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }

        await db.query ("DELETE FROM jobs WHERE job_id = ?", [job_id]);
        res.status(200).json({ message: "Job deleted"});
    } catch (error) {
        console.error("Error in deleting", error);
        res.status(500).json({ message: "Server error" });
    }
};