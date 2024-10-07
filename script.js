document.addEventListener('DOMContentLoaded', () => {
   const taskInput = document.getElementById('task-input');
   const addTaskButton = document.getElementById('add-task-button');
   const taskList = document.getElementById('task-list');

   const loadTasks = () => {
       const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
       tasks.forEach(task => addTaskToDOM(task));
   };

   const saveTasks = () => {
       const tasks = [];
       document.querySelectorAll('.task-item').forEach(item => {
           tasks.push({
               text: item.querySelector('.task-text').textContent,
           });
       });
       localStorage.setItem('tasks', JSON.stringify(tasks));
   };

   const addTaskToDOM = (task) => {
       const taskItem = document.createElement('li');
       taskItem.classList.add('task-item');

       const taskText = document.createElement('span');
       taskText.textContent = task.text;
       taskText.classList.add('task-text');
       taskItem.appendChild(taskText);

       const taskButtons = document.createElement('div');
       taskButtons.classList.add('task-buttons');
       taskList.appendChild(taskItem);
   };

   addTaskButton.addEventListener('click', () => {
       const taskText = taskInput.value.trim();
       if (taskText) {
           addTaskToDOM({ text: taskText, completed: false });
           saveTasks();
           taskInput.value = '';
       }
   });

   loadTasks();
});
