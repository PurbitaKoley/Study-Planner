// ===== Signup =====
function signup() {
  let username = document.getElementById("signupUsername").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  if (username && email && password) {
    localStorage.setItem("user", JSON.stringify({ username, email, password }));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  } else {
    alert("Please fill all fields");
  }
}

// ===== Login =====
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (user && email === user.email && password === user.password) {
    alert("Login successful!");
    window.location.href = "planner.html";
  } else {
    alert("Invalid email or password");
  }
}

// ===== Add Task =====
function addTask() {
  let subject = document.getElementById("subject").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let dailyHours = document.getElementById("dailyHours").value;
  let goal = document.getElementById("goal").value;

  if (subject && startDate && endDate && dailyHours && goal) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ subject, startDate, endDate, dailyHours, goal, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Subject added successfully!");
  } else {
    alert("Please fill all fields");
  }
}

// ===== Display Tasks =====
function displayTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  let progressBar = document.getElementById("progressBar");
  let progressText = document.getElementById("progressText");

  if (!taskList) return; // prevents errors if not on dashboard page

  taskList.innerHTML = "";
  let completedCount = 0;

  tasks.forEach((task, index) => {
    if (task.completed) completedCount++;

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");

    taskDiv.innerHTML = `
      <p><strong>${task.subject}</strong> (${task.startDate} to ${task.endDate}) - ${task.dailyHours} hrs/day</p>
      <p>Goal: ${task.goal}</p>
      <p>Status: <span class="status">${task.completed ? "✅ Completed" : "⏳ In Progress"}</span></p>
      <button onclick="markCompleted(${index})" ${task.completed ? "disabled" : ""}>
        ${task.completed ? "Done" : "Mark as Completed"}
      </button>
    `;

    taskList.appendChild(taskDiv);
  });

  // Progress Bar
  let progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  if (progressBar && progressText) {
    progressBar.value = progress;
    progressText.innerText = `${Math.round(progress)}% Completed`;
  }
}

// ===== Mark Completed =====
function markCompleted(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("🎉 Good job! You completed this subject!");
  displayTasks();
}

// Run displayTasks when dashboard loads
window.onload = displayTasks;
