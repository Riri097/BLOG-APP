// multer is library to grab files from request
const multer = require('multer');
// path is nodejs module to read file extensions like .jpg .png
const path = require('path');

// storage is like a rule to tell multer to store file in disk
//cb is callback function to write file name and its destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  
  // unique filename by adding date
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//upload is like a pack of all rules which is export to use in routes
//storage: storage means use the storage rules defined above
const upload = multer({ storage: storage });

module.exports = upload;