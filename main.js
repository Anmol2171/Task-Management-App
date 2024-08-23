
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        let taskItem = document.createElement("li");
        taskItem.className = "task-item" + (task.completed ? " completed" : "");
        taskItem.innerHTML = `
        ${task.title} - ${task.description} (Due: ${task.date})
        <div class="task-actions">
            <button 
              style="background:darkorange; 
              border:none;
              padding: 8px 12px;
              cursor:pointer
              " 
              onclick="completeTask(${index})">Complete</button>


            <button 
               style="background:green; 
              border:none;
              padding: 8px 12px;
              cursor:pointer
              " 
            onclick="editTask(${index})">Edit</button>



            <button
              style="background:red; 
              border:none;
              padding: 8px 12px;
              cursor:pointer
              " 
            onclick="deleteTask(${index})">Delete</button>
        </div>
    `;
    
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-desc").value;
    let date = document.getElementById("task-date").value;

    if (title && date) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ title, description, date, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    } else {
        alert("Please enter both a title and a date for the task.");
    }
}


function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks[index];
    
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("task-date").value = task.date;

    tasks.splice(index, 1); // Remove the old task
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update the storage
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}