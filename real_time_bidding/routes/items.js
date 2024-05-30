const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllAuctionItems,
    getAuctionItemById,
    // createNewItem,
    // updateItem,
    // deleteItem,
} = require('../controllers/items');
// const { authenticateToken, checkOwnershipOrAdmin } = require('../services/auth');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// router.post('/items', authenticateToken, upload.single('image'), createNewItem);
// router.put('/items/:id', authenticateToken, checkOwnershipOrAdmin, upload.single('image'), updateItem);
// router.delete('/items/:id', authenticateToken, checkOwnershipOrAdmin, deleteItem);

router.get('/items', getAllAuctionItems);
router.get('/items/:id', getAuctionItemById);

module.exports = {
    router: (req, res) => {
      res.send('Hello, World!');
    }
  };