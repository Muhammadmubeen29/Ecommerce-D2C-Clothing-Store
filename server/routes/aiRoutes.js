import express from 'express';
import { generateProductContent } from '../controllers/aiController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route - only admin should generate content for products
router.post('/generate-product-content', protect, admin, generateProductContent);

export default router;
