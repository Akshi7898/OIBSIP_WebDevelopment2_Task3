let tasks = [];

document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title && description) {
    tasks.push({
      id: Date.now(),
      title,
      description,
      time: new Date(),
      isCompleted: false,
      completedAt: null
    });

    this.reset();
    renderTasks();
  }
});

function renderTasks() {
  const pendingBody = document.querySelector("#pendingTable tbody");
  const completedBody = document.querySelector("#completedTable tbody");
  pendingBody.innerHTML = "";
  completedBody.innerHTML = "";

  tasks.forEach(task => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.isCompleted ? formatDate(task.completedAt) : formatDate(task.time)}</td>
      <td>
        <button class="btn btn-delete" onclick="deleteTask(${task.id})">X</button>
        <button class="btn btn-edit" onclick="editTask(${task.id})">✎</button>
        ${!task.isCompleted ? `<button class="btn btn-complete" onclick="completeTask(${task.id})">✓</button>` : ""}
      </td>
    `;

    task.isCompleted ? completedBody.appendChild(tr) : pendingBody.appendChild(tr);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function completeTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.isCompleted = true;
      task.completedAt = new Date();
    }
    return task;
  });
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit title:", task.title);
  const newDesc = prompt("Edit description:", task.description);

  if (newTitle && newDesc) {
    task.title = newTitle;
    task.description = newDesc;
    renderTasks();
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}
