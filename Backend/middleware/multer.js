
import multer from "multer"

const storage = multer.memoryStorage(); 
// Why? Tells Multer to store uploaded files in memory (RAM) rather than on disk.

// Useful because we want to directly upload the file to Cloudinary (not store locally).

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

export default upload