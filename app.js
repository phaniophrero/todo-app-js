// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector("#todo-btn");
const clearBtn = document.querySelector("#clear");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
clearBtn.addEventListener("click", clearTodoList);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  //* Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Add TODO to Local Storage
  saveLocalTodos(todoInput.value);
  //Check Mark Button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="far fa-check-circle"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);
  //Remove Button
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  removeBtn.classList.add("remove-btn");
  todoDiv.appendChild(removeBtn);
  // Append to the list
  todoList.appendChild(todoDiv);
  //Clear todo Input value
  todoInput.value = "";
}

function deleteCheck(e) {
  // console.log(e.target);
  const item = e.target;
  //Delete Todo item
  if (item.classList[0] === "remove-btn") {
    // Trebuie sa selectam elementul parinte al butonului pentru a putea sterge item-ul
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    //Dupa ce se termina tranzitia (transitionend) atunci item-ul este sters
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Todo item
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function saveLocalTodos(todo) {
  // Check if item already exist
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // Check if item already exist
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //* Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="far fa-check-circle"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    //Remove Button
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    removeBtn.classList.add("remove-btn");
    todoDiv.appendChild(removeBtn);
    // Append to the list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodoList() {
  localStorage.clear();
}

function checkTodos() {
  // Check if item already exist
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
