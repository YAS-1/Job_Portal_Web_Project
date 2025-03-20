import multer from "multer";
import path from "path";

//Setting up the storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/'); //destination folder for the uploaded files
    },

    //Generating a unique name for the uploaded file
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname); //extracting the extension of the file
        cb(null, `${file.fieldname}-${Date.now()}${extension}`); //fieldname is the name of the input field
    },
});

//Creating a filter to allow only specified file types
const fileFilter = (req, file, cb) => {
    if(file.fieldname === "resume" || file.fieldname === "coverletter"){
        //Checking the file type
        if(
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/doc" ||
            file.mimetype === "application/docx" ||
            file.mimetype === "application/msword" ||
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ){
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only PDF, DOC, DOCX files are allowed"));
        }
    }
    else{
        cb(null, true)
    }
};

// Initializing the multer object
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB file size limit
    }
});


export default upload;