const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Dummy data for tasks
let tasks = [
  { id: 1, text: 'RTask 1' },
  { id: 2, text: 'RTask 2' },
  { id: 3, text: 'RTask 3' },
];

let savedTasks = [
];

// Routes

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get all tasks
app.get('/saved-tasks', (req, res) => {
    res.json(savedTasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// Add a new task
app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, text: req.body.text };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Add a new task
app.post('/saved-tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, text: req.body.text };
    savedTasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks[taskIndex].text = req.body.text;
    res.json(tasks[taskIndex]);
  }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
