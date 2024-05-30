const AuctionItem = require('../models/items');

const getAllAuctionItems = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await AuctionItem.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['created_at', 'DESC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            items: rows,
            totalItems: count,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getAuctionItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await AuctionItem.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


 
//   const db = require('../database');

//   const createNewItem = (req, res) => {
//     const { name, description, starting_price, end_time } = req.body;
//     const image = req.file;
//     const imageUrl = image ? `/uploads/${image.filename}` : null;

//     if (!name || !description || !starting_price || !end_time) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const current_price = starting_price;
//     const created_at = new Date();

//     db.run(
//         `INSERT INTO items (name, description, starting_price, current_price, image_url, end_time, created_at) 
//          VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         [name, description, starting_price, current_price, imageUrl, end_time, created_at],
//         function (err) {
//             if (err) {
//                 return res.status(500).json({ message: 'Failed to create item', error: err.message });
//             }

//             const newItem = {
//                 id: this.lastID,
//                 name,
//                 description,
//                 starting_price,
//                 current_price,
//                 image_url: imageUrl,
//                 end_time,
//                 created_at,
//             };

//             res.status(201).json({ message: 'Item created successfully', newItem });
//         }
//     );
// };



// const updateItem = (req, res) => {
//   const { id } = req.params;
//   const { name, description, starting_price, current_price, end_time } = req.body;
//   const image = req.file;
//   const imageUrl = image ? `/uploads/${image.filename}` : null;

//   const queryParams = [];
//   let query = 'UPDATE items SET ';
  
//   if (name) query += 'name = ?, ', queryParams.push(name);
//   if (description) query += 'description = ?, ', queryParams.push(description);
//   if (starting_price) query += 'starting_price = ?, ', queryParams.push(starting_price);
//   if (current_price) query += 'current_price = ?, ', queryParams.push(current_price);
//   if (end_time) query += 'end_time = ?, ', queryParams.push(end_time);
//   if (imageUrl) query += 'image_url = ?, ', queryParams.push(imageUrl);

//   query = query.slice(0, -2); // Remove last comma and space
//   query += ' WHERE id = ?';
//   queryParams.push(id);

//   db.run(query, queryParams, function (err) {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to update item', error: err.message });
//     }

//     res.status(200).json({ message: 'Item updated successfully' });
//   });
// };

// const deleteItem = (req, res) => {
//   const { id } = req.params;

//   db.run(`DELETE FROM items WHERE id = ?`, [id], function (err) {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to delete item', error: err.message });
//     }

//     res.status(200).json({ message: 'Item deleted successfully' });
//   });
// };

module.exports = {
  getAllAuctionItems,
  getAuctionItemById,
//   createNewItem,
//   updateItem,
//   deleteItem,
};
