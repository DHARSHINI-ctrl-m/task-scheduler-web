const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const taskQueue = [];

app.post('/add-task', (req, res) => {
  const { task } = req.body;
  if (task) {
    taskQueue.push(task);
    res.status(200).send({ message: 'Task added successfully.' });
  } else {
    res.status(400).send({ message: 'Task cannot be empty.' });
  }
});

app.get('/get-tasks', (req, res) => {
  res.status(200).send(taskQueue);
});

app.post('/process-task', (req, res) => {
  if (taskQueue.length > 0) {
    const processedTask = taskQueue.shift();
    res.status(200).send({ task: processedTask });
  } else {
    res.status(404).send({ message: 'No tasks to process.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});