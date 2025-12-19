import express from 'express';
import {
  subscribe,
  unsubscribe,
  getAllSubscribers,
} from '../controllers/subscriptionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin route
router.get('/', protect, admin, getAllSubscribers);

export default router;











