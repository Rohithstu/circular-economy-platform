const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, materialId } = req.body;
    
    // Simulate payment processing
    const mockPaymentIntent = {
      client_secret: `pi_mock_${Date.now()}_${materialId}`,
      amount: amount * 100,
      currency: 'usd',
      status: 'requires_payment_method'
    };

    res.json({ 
      clientSecret: mockPaymentIntent.client_secret,
      message: 'Mock payment intent created. Add STRIPE_SECRET_KEY for real payments.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/config', (req, res) => {
  res.json({
    paymentSystem: 'Stripe (Mock Mode)',
    configured: false,
    message: 'Running in mock mode. Set STRIPE_SECRET_KEY for real payments.'
  });
});

module.exports = router;