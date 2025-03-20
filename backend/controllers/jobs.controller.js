import db from "../config/db.config";


//create Job function
export const createJob =  async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`Error in creating job: ${error}`);
        return res.status(500).json({message: "Error in creating job"});
    }
}