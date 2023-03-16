display();
let newTaskInput = document.getElementById("new-task");
let addButton = document.getElementById("add-button");
let saveButton = document.getElementById("save-button");

// addtask
addButton.addEventListener("click", function () {
  newTaskVal = newTaskInput.value;
  if (newTaskVal != "") {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push(newTaskVal);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  } else {
    alert("Please enter a task");
  }
  newTaskInput.value = "";
  display();
});

// showtask
function display() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let html = "";
  let todoList = document.getElementById("todo-list");
  taskObj.forEach((item, index) => {
    html += `
      <li>
          <p>${item}</p>
          <button id="edit-button" onclick="edittask(${index})">Edit</button>
          <button id="delete-button" onclick="deletetask(${index})">Delete</button>
        </li> 
      `;
  });
  todoList.innerHTML = html;
}

// edit task
function edittask(index) {
  let saveTaskInput = document.getElementById("save-task");
  saveTaskInput.value = index;
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  newTaskInput.value = taskObj[index];
  addButton.style.display = "none";
  saveButton.style.display = "block";
}

// savetask
saveButton.addEventListener("click", function () {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveTaskInput = document.getElementById("save-task").value;
  taskObj[saveTaskInput] = newTaskInput.value;
  saveButton.style.display = "none";
  addButton.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  newTaskInput.value = "";
  display();
});

// deletetask
function deletetask(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  newTaskInput.value = "";
  addButton.style.display = "block";
  saveButton.style.display = "none";
  display();
}
