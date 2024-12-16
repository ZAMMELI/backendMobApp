const db = require('../db/db.config');

exports.getEnergyData = (req, res) => {
  const query = 'SELECT * FROM energy_usage';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
}
