const jwt = require('jsonwebtoken');
// const db = require('../database');
const secretKey = 'your_secret_key'; 


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

// const checkOwnershipOrAdmin = (req, res, next) => {
//   const userId = req.user.id;
//   const itemId = req.params.id;

//   db.get(`SELECT user_id FROM items WHERE id = ?`, [itemId], (err, row) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     if (!row) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     if (row.user_id === userId || req.user.role === 'admin') {
//       next();
//     } else {
//       res.status(403).json({ message: 'Permission denied' });
//     }
//   });
// };

module.exports = { authenticateToken};
