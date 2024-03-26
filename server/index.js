//connecting express to react app in the client folder
const express = require('express');
const cors = require('cors');
const app = express();
//import the pool from the db.js file located in the same directory
const pool = require('./db');
const path = require('path');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

app.use(express.static("../client/build"));

app.get("*", (_, res) => {
  res.sendFile(path.join("../client/build/index.html"));
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

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Express Server on port ${port}`));