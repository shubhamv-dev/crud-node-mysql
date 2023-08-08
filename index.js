// app.js
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const sequelize = require('./db');
const dbConfig = require('./config/db.config');

const app = express();
app.use(bodyParser.json());

// Sync the model with the database
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

// Create user
app.post('/users', async (req, res) => {
    const { name, password, age, dob } = req.body;
    const formattedDOB = new Date(dob); // Convert the date to a JavaScript Date object
    console.log("req.body", req.body)
    try {
        const existingUser = await User.findOne({ where: { name } });

        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
        } else {
            const newUser = await User.create({ name, password, age, dob: formattedDOB });
            res.status(201).json({ message: 'User created successfully', id: newUser.id });
        }
    } catch (err) {
        console.error('Error creating user:', err.stack);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID using the User model
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // Delete the user using the User model
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting user:', err.stack);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, age, dob } = req.body;
    const fieldsToUpdate = {};

    // Check which field is present in the request body and add it to the fieldsToUpdate object
    name && (fieldsToUpdate.name = name);
    age && (fieldsToUpdate.age = age);
    dob && (fieldsToUpdate.dob = new Date(dob));


    try {
        // Find the user by ID using the User model
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // If the user exists, update the specified field(s) using the User model
            await user.update(fieldsToUpdate);
            res.status(200).json({ message: 'User field updated successfully' });
        }
    } catch (err) {
        console.error('Error updating user:', err.stack);
        res.status(500).json({ error: 'Failed to update user' });
    }
});


// Read all users
app.get('/users', async (req, res) => {
    try {
        // Find all users using the User model
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (err) {
        console.error('Error retrieving users:', err.stack);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// Read a single user by ID
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID using the User model
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ user });
        }
    } catch (err) {
        console.error('Error retrieving user:', err.stack);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});

const port = dbConfig.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});