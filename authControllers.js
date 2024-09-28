const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this points to your user model
const { request, response } = require('express');

exports.login = async (request, response) => {
    const { username, password } = request.body;

    try {
        // Fetch user by username
        const results = await User.findByUsername(username); // Adjusted to be a promise-based call

        if (results.length === 0) {
            return response.status(401).send('No User Found');
        }

        const user = results[0];
        console.log('Stored hashed password:', user.password);
        console.log('Provided password:', password); // Log stored hashed password

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log the result of the comparison

        if (!isMatch) {
            return response.status(401).send('Invalid Password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'xyrelko1',
            { expiresIn: '1h' }
        );

        return response.json({ token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        return response.status(500).send('Internal Server Error');
    }
};
