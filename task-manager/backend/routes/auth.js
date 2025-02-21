const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {

    // Check if email already exists (for extra safety)
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(existingUser.rows.length>0){
      return res.status(400).json({ message: 'Email is already in use' });
    }
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in /register:', error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Fetch user from database
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user.rows.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error in /login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
