const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, materialId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        materialId,
        userId: req.user.id,
        company: req.user.company
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;