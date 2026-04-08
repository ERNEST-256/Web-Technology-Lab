const express = require('express');
const requestLogger = require('./ex2/middleware/requestLogger');
const requestTrace = require('./ex2/middleware/requestTrace');
const routeGuard = require('./ex2/middleware/routeGuard');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

// Global middleware layer 1
app.use(requestLogger);

// Global middleware layer 2
app.use(requestTrace);

app.get('/', (req, res) => {
  res.send('Lab 12 - Exercise 2 middleware demo is running.');
});

app.get('/public', (req, res) => {
  console.log('Route handler for /public executed');
  res.json({ message: 'Public route reached successfully' });
});

// Route-level middleware applied only to this endpoint
app.get('/secure', routeGuard, (req, res) => {
  console.log('Route handler for /secure executed');
  res.json({ message: 'Secure route reached after middleware checks' });
});

app.listen(PORT, () => {
  console.log(`Exercise 2 server running on http://localhost:${PORT}`);
});
