// const mysql = require('mysql2/promise'); // Using mysql2 promise version
// const bodyParser = require('body-parser');
// const express = require("express")
// const dbConfig = require("./config/db.config")

// const app = express();
// app.use(bodyParser.json());

// const connection = mysql.createPool({
//     host: dbConfig.HOST,      // Usually 'localhost' if the database is on the same server as your Node.js application
//     user: dbConfig.USER,      // MySQL username
//     password: dbConfig.PASSWORD,  // MySQL password
//     database: dbConfig.DB   // Name of your MySQL database
// });

// // No need to call connection.connect() when using connection pool

// // Create a new user
// app.post('/users', async (req, res) => {
//     const { name, age, dob } = req.body;
//     const newUser = { name, age, dob };

//     console.log("req.body", req.body);

//     try {
//         const [existingUsers] = await connection.query('SELECT * FROM user WHERE name = ?', name);

//         if (existingUsers.length > 0) {
//             res.status(409).json({ message: 'User already exists' }); // 409 Conflict
//         } else {
//             const result = await connection.query('INSERT INTO user SET ?', newUser);
//             res.status(201).json({ message: 'User created successfully', id: result[0].insertId });
//         }
//     } catch (err) {
//         console.error('Error creating user:', err.stack);
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// });

// // Read all users
// app.get('/users', async (req, res) => {
//     try {
//         const [results] = await connection.query('SELECT * FROM user');
//         res.status(200).json({users: results});
//     } catch (err) {
//         console.error('Error retrieving users:', err.stack);
//         res.status(500).json({ error: 'Failed to retrieve users' });
//     }
// });

// // Read a single user by ID
// app.get('/users/:id', async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const [results] = await connection.query('SELECT * FROM user WHERE id = ?', userId);
//         if (results.length === 0) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.status(200).json({user : results[0]});
//         }
//     } catch (err) {
//         console.error('Error retrieving user:', err.stack);
//         res.status(500).json({ error: 'Failed to retrieve user' });
//     }
// });

// // Update a user by ID
// app.put('/users/:id', async (req, res) => {
//     const userId = req.params.id;
//     const { name, age, dob } = req.body;
//     const updatedUser = { name, age, dob };

//     try {
//         const [result] = await connection.query('UPDATE user SET ? WHERE id = ?', [updatedUser, userId]);
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.status(200).json({ message: 'User updated successfully' });
//         }
//     } catch (err) {
//         console.error('Error updating user:', err.stack);
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// });

// // Delete a user by ID
// app.delete('/users/:id', async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const [result] = await connection.query('DELETE FROM user WHERE id = ?', userId);
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: 'User not found' });
//         } else {
//             res.status(200).json({ message: 'User deleted successfully' });
//         }
//     } catch (err) {
//         console.error('Error deleting user:', err.stack);
//         res.status(500).json({ error: 'Failed to delete user' });
//     }
// });

// const port = dbConfig.PORT || 8080;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
