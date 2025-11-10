const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const processTaskBtn = document.getElementById('process-task-btn');
const processedTask = document.getElementById('processed-task');

const fetchTasks = async () => {
  const response = await fetch('/get-tasks');
  const tasks = await response.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
  });
};

addTaskBtn.addEventListener('click', async () => {
  const task = taskInput.value;
  if (task) {
    await fetch('/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task })
    });
    taskInput.value = '';
    fetchTasks();
  }
});

processTaskBtn.addEventListener('click', async () => {
  const response = await fetch('/process-task', { method: 'POST' });
  if (response.ok) {
    const { task } = await response.json();
    processedTask.textContent = `Processed: ${task}`;
    fetchTasks();
  } else {
    processedTask.textContent = 'No tasks to process.';
  }
});

fetchTasks();