const express = require('express');
const multer = require('multer');
const { createEmployee, getEmployees, editEmployee, deleteEmployee } = require('../controllers/employeeController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const path = require('path');

// Image upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/create', protect, upload.single('f_Image'), createEmployee);
router.get('/', protect, getEmployees);
router.put('/:f_Id', protect, editEmployee);
router.delete('/:f_Id', protect, deleteEmployee);

module.exports = router;
