// energyRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db.config'); // Correct path, one level up

// POST endpoint to insert energy data into the database
router.post('/energy', (req, res) => {
  const { location, usage } = req.body;

  if (!location || !usage) {
    return res.status(400).json({ message: "Location and usage are required" });
  }

  const query = 'INSERT INTO energy (location, usage) VALUES (?, ?)';
  
  // Use dbConfig for the database connection
  const connection = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB,
  });

  connection.query(query, [location, usage], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error inserting data' });
    }

    res.status(200).json({ message: 'Energy data inserted successfully', data: result });
    connection.end();  // Always close the connection
  });
});

