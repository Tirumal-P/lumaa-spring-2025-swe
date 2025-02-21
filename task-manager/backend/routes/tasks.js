const express = require('express');
const pool = require('../db');

const router = express.Router();

//fetch all tasks of specific user
router.get('/', async (req, res) => {
  const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user.id]);
  res.json(tasks.rows);
});

//create a new task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  await pool.query('INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, $3, $4)',
    [title, description, false, req.user.id]);
  res.status(201).json({ message: 'Task created' });
});

//fetch a specific task with id
router.put('/:id', async (req, res) => {
  const { title, description, is_complete } = req.body;
  await pool.query('UPDATE tasks SET title=$1, description=$2, is_complete=$3 WHERE id=$4 AND user_id=$5',
    [title, description, is_complete, req.params.id, req.user.id]);
  res.json({ message: 'Task updated' });
});

//deleting a task
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
