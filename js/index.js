// local storage
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem('task'));

  if (storedTasks) {
    storedTasks.forEach((task)=> task.push(task));
    updateTaskList();
    updateStats();
  }
});

let task = [];

const saveTasks = () => {
  localStorage.setItem("task", JSON.stringify(task));

};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    task.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  task[index].completed = !task[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
};
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = task[index].text;
  task.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  task.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

// create new LI and update task list
const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  task.forEach((tasks, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div class="taskItem">
        <div class="tasks ${tasks.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox ${
              tasks.completed ? "checked" : ""
            }">
            <p>${tasks.text}</p>
        </div>
        <div class="icons">
            <img src="img/edit.png" onclick = "editTask(${index})">
            <img src="img/delete.png" onclick = "deleteTask(${index})">
        </div>
    </div>
`;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

// update progress bar when task is completed or deleted
const updateStats = () => {
  const completeTasks = task.filter((task) => task.completed).length;
  const totalTask = task.length;
  const progress = (completeTasks / totalTask) * 100;
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTask}`;

  if(task.length && completeTasks === totalTask) {
    blastConfetti();
  }
};


document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();

  addTask();
});

// Blast confetti immediately task is completed
const blastConfetti =  ()=> {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
