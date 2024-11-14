const router = require("express").Router();
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { display, simpleFileUpload, fileUploadToFolder, login, register } = require("./home.controller");

// const storage =  multer.memoryStorage(); // Store file in memory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const uploadPath = 'uploads/';

        // Check if uploads folder exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // recursive ensures all parent folders are created
        }

        cb(null, 'uploads/'); // specify the uploads folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
  });
const upload = multer({storage: storage})


router.get("/display", display )
router.post("/simple-upload", upload.single('myfile'), simpleFileUpload) //single file uploaded to db
router.post("/upload-file-to-folder", upload.single('myfile'), fileUploadToFolder) //single file uploaded to folder

router.post("/register", register)
router.post("/login", login)

module.exports = router;