// var result;
// const express = require('express');
// const app = express();
// app.get('/api/users', (req, res) => {
//     const sql = 'SELECT * FROM users'; // Replace 'posts' with your table name

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
//         result=results;
//         res.json(results);
//     });
// });

// module.exports=users;


// const express = require('express');
// const User = require('../models/users');

// // Get all users
// const getUsers = async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// module.exports = {
//     getUsers
// };


// src/controllers/userController.js
// src/controllers/userController.js
// const { User } = require('../models/users');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const registerUser = async (req, res) => {
//   try {
//     const { username, password, email } = req.body;

//     if (!username || !password || !email ) {
//       return res.status(400).json({ error: 'Username, password, and email are required.' });
//     }

//     const existingUser = await User.findOne({ where: { username } });
//     const existingEmail = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists.' });
//     }
//     if (existingEmail) {
//       return res.status(400).json({ error: 'Email already exists.' });
//     }

//     const user = await User.create({ username, password, email });

//     const userData = user.toJSON();
//     delete userData.password;

//     res.status(201).json({ message: 'User registered successfully.', user: userData });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };





// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile
// };

const jwt = require('jsonwebtoken');
//const { User } = require('./models');  // Adjust this path based on your project structure
const SECRET_KEY = 'your_jwt_secret_key';  // Change this to a secure key
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { id, username, password, email, role, created_at } = req.body;

        if (!id || !username || !password || !email || !role || !created_at) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
        }

        // const existingUser = await User.findOne({ where: { username } });
        // const existingEmail = await User.findOne({ where: { email } });
        // if (existingUser) {
        //   return res.status(400).json({ error: 'Username already exists.' });
        // }
        // if (existingEmail) {
        //   return res.status(400).json({ error: 'Email already exists.' });
        // }

        // const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await User.create({ id, username, password, email, role, created_at });

        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json({ message: 'User registered successfully.', user: userData });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        if (user.password === password) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ accessToken: token });
        } else {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is attached to the request object after authentication
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] } // Exclude sensitive information like password
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


module.exports = {
   registerUser, loginUser,getUserProfile
};