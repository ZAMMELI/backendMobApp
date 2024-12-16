const express = require('express');
const cors = require('cors');
const energyRoutes = require('./routes/energy.routes');
const db = require('./db.config');  // Ensure this is correct path

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Use API Routes
app.use('/api', energyRoutes);

// Send requests to your backend (example connection setup)
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: db.HOST,
  user: db.USER,
  password: db.PASSWORD,
  database: db.DB
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
