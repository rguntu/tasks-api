const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple model
const Todo = mongoose.model('Todo', {
  text: String,
  completed: Boolean,
});

const SavedTodo = mongoose.model('SavedTodo', {
  text: String,
  completed: Boolean,
});



// Define routes
app.get('/tasks', async (req, res) => {
  try {
    const todos = await Todo.find();
    //console.log("get response",todos)
    res.json( todos );
    //res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const itemId = req.params.id;
  console.log("get by id",itemId)
  try {
    const item = await Todo.findById(itemId);
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = await Todo.findById(itemId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    await task.save();
    res.status(204).json({ task });
  }
});

// Route to delete an item by ID
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedItem = await Todo.findByIdAndDelete(taskId);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tasks', async (req, res) => {
  const { text, completed } = req.body;
  console.log("saved-tasks req",req.body)
  console.log("saved-tasks req",text)
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const todo = new Todo({ text, completed });
    await todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//saved-tasks

app.get('/saved-tasks/:id', async (req, res) => {
  const itemId = req.params.id;
  console.log("get by id",itemId)
  try {
    const item = await SavedTodo.findById(itemId);
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
app.get('/saved-tasks', async (req, res) => {
  try {
    const todos = await SavedTodo.find();
    //console.log("get response",todos)
    res.json( todos );
    //res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/saved-tasks', async (req, res) => {
  const { text, completed } = req.body.item;
  console.log("saved-tasks req",req.body)
  console.log("saved-tasks req",text)
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const todo = new SavedTodo({ text, completed });
    await todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
