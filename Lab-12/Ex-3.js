const express = require('express');
const connectDatabase = require('./ex3/config/db');
const itemRoutes = require('./ex3/routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 4003;

app.use(express.json());
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
  res.send('Lab 12 - Exercise 3 MongoDB CRUD API is running.');
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Exercise 3 server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
