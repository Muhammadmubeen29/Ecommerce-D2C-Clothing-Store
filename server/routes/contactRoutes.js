import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Public route
router.post('/', submitContactForm);

export default router;











