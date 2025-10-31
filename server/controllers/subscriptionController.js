import Subscription from '../models/Subscription.js';
import nodemailer from 'nodemailer';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const { email, source } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Check if already subscribed
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({ message: 'This email is already subscribed' });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.source = source || 'newsletter';
        await existingSubscription.save();

        return res.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }

    // Create new subscription
    const subscription = await Subscription.create({
      email,
      source: source || 'newsletter',
    });

    // Send welcome email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to Our Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #4F46E5;">Welcome to Our Fashion Community!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll be the first to know about:</p>
            <ul>
              <li>New collection launches</li>
              <li>Exclusive offers and discounts</li>
              <li>Fashion tips and styling guides</li>
              <li>Special events and sales</li>
            </ul>
            <p>Stay tuned for amazing updates!</p>
            <br>
            <p>Best regards,</p>
            <p><strong>The Fashion Team</strong></p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Welcome Email Error:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.',
      data: subscription,
    });
  } catch (error) {
    console.error('Subscribe Error:', error);
    res.status(500).json({ message: 'Server error during subscription' });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/subscribe/unsubscribe
// @access  Public
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    const subscription = await Subscription.findOne({ email });

    if (!subscription) {
      return res.status(404).json({ message: 'Email not found in our subscription list' });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({
      success: true,
      message: 'You have been unsubscribed successfully. We\'re sorry to see you go!',
    });
  } catch (error) {
    console.error('Unsubscribe Error:', error);
    res.status(500).json({ message: 'Server error during unsubscription' });
  }
};

// @desc    Get all subscribers (Admin)
// @route   GET /api/subscribe
// @access  Private/Admin
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error('Get Subscribers Error:', error);
    res.status(500).json({ message: 'Server error fetching subscribers' });
  }
};




