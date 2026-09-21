const express = require('express');
const app = express();
const PORT = 5001;

app.use(require('cors')());
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test server working!' });
});

// Simple auth route
app.post('/api/auth/register', (req, res) => {
  console.log('Register:', req.body);
  res.json({ message: 'Register works!', data: req.body });
});

app.listen(PORT, () => {
  console.log('Test server on port', PORT);
});