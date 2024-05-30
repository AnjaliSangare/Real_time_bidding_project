// const express = require('express');
// const { registerUser, loginUser, getUserProfile } = require('../controllers/users');
// const authenticate = require('../services/auth');
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/profile', authenticate, getUserProfile);

// module.exports = router;
const express = require('express');
const { registerUser ,loginUser , getUserProfile } = require('../controllers/users');
const router = express.Router();
// const authenticateJWT = require('../Middleware/auth');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);

module.exports = router;
