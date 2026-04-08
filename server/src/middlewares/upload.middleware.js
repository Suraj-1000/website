const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadMiddleware = (destination, allowedTypes = /jpeg|jpg|png|webp/, limit = 2) => {
   // Ensure destination exists
   if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
   }

   const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, destination),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
   });

   return multer({
      storage,
      fileFilter: (req, file, cb) => {
         const valid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
         valid ? cb(null, true) : cb(new Error('Invalid file type!'));
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
   });
};

module.exports = createUploadMiddleware;
