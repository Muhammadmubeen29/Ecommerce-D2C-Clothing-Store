import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Use memory storage so we can access file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/uploads/image - upload image (admin)
router.post('/image', protect, admin, upload.single('image'), uploadImage);

export default router;
