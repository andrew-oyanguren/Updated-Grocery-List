// Variables:
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterItem);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Create Todo Div, add class and attributes
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create li, add class and attributes
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  // Append newTodo to todoDiv
  todoDiv.appendChild(newTodo);
  // Add TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  // Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  // Append completedButton to todoDiv
  todoDiv.appendChild(completedButton);
  // Trash Delete Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.classList.add('trash-btn');
  // Append Trash Button to todoDiv
  todoDiv.appendChild(trashButton);
  // Append todoDiv to html todoList
  todoList.appendChild(todoDiv);
  // Clear todoInput Value
  todoInput.value = '';
}

function deleteCheck(event) {
  // Get the target
  const item = event.target;

  // Delete item
  if (item.classList[0] === 'trash-btn') {
    const parentItem = item.parentElement;
    parentItem.classList.add('delete-animation');
    removeLocalTodos(parentItem);
    parentItem.addEventListener('transitionend', function () {
      parentItem.remove();
    })
  }

  // Cross out item
  if (item.classList[0] === 'complete-btn') {
    const parentItem = item.parentElement;
    parentItem.classList.toggle('crossed-out');
  }
}

function filterItem(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('crossed-out')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('crossed-out')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    // Create Todo Div, add class and attributes
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li, add class and attributes
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    // Append newTodo to todoDiv
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    // Append completedButton to todoDiv
    todoDiv.appendChild(completedButton);
    // Trash Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add('trash-btn');
    // Append Trash Button to todoDiv
    todoDiv.appendChild(trashButton);
    // Append todoDiv to html todoList
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innertext;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
