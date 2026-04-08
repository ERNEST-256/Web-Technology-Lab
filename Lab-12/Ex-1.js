const express = require('express');
const productRoutes = require('./ex1/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Lab 12 - Exercise 1 REST API is running.');
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Exercise 1 server running on http://localhost:${PORT}`);
});
