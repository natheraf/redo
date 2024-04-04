require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Ensure you've set up this connection properly
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


app.use(cors());
app.use(express.json());

// API Endpoints

// Test to see if the DB is connected/working with a simple query that puts "Hello World" in the console
app.get('/test', async (req, res) => {
    try {
        const test = await pool.query('SELECT $1::text as message', ['Hello World']);
        res.json(test.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
            if (validPassword) {
                const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).json({ error: 'Invalid Password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve React App
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Express Server on port ${port}`));

module.exports = app; // Export for testing
