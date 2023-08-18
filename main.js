let tareas = [];

if (localStorage.getItem("tasks")) {
  tareas = JSON.parse(localStorage.getItem("tasks"));

}

const element = document.querySelector("#tarea");
element.addEventListener("submit", addTask);

const listaTareas = document.querySelector("#listaTareas");
const borrarTodo = document.querySelector("#borrarTodo");

const Todo = document.querySelector("#All");
const Activo = document.querySelector("#Active");
const Completo = document.querySelector("#Completed");

Todo.addEventListener("click", () => filterTasks(2));
Activo.addEventListener("click", () => filterTasks(0));
Completo.addEventListener("click", () => filterTasks(1));

// Variáveis para o botão "Add" e a caixa de diálogo
const addButton = document.querySelector(".boton");
const taskInput = document.querySelector(".texto-form");

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tareas));
}

function addTask(event) {
  event.preventDefault();

  const textoTarea = taskInput.value;

  if (textoTarea.trim() === "") {
    alert("¡La tarea no puede estar vacía. Por favor, añade un texto para la tarea!");
    return;
  }
  const task = {
    textoTarea,
    completado: false,
    id: new Date().getTime()
  };

  tareas.push(task);
  saveTasksToLocalStorage();
  taskInput.value = "";
  generateLista();
}

function generateLista(filteredTasks = tareas) {
  listaTareas.innerHTML = "";
  filteredTasks.forEach(task => listaTareas.innerHTML += createItem(task));
}

function createItem(task, filterType) {
  const showDeleteIcon = filterType === 1 && task.completado; // Show delete icon only in Completed filter

  return `
    <li class="list-group-item eList ${task.completado ? 'marked' : ''}">
      <input class="form-check-input checkMark" type="checkbox" 
        onChange="completeTask(${task.id})" ${task.completado ? 'checked' : ''}>
      ${task.textoTarea}
      ${showDeleteIcon ? `<button class="caneca" onClick="deleteTask(${task.id})">
        <i class="fa-regular fa-trash-can"></i></button>` : ''}
    </li>
  `;
}




function completeTask(id) {
  const taskIndex = tareas.findIndex(tarea => id === tarea.id);
  tareas[taskIndex].completado = !tareas[taskIndex].completado;
  saveTasksToLocalStorage();
  generateLista();
}

function filterTasks(filterType) {
  let filteredTasks = [];

  if (filterType === 0) {
    filteredTasks = tareas.filter(task => !task.completado);
    addButton.style.display = 'block';
    taskInput.style.display = 'block';
  } else if (filterType === 1) {
    filteredTasks = tareas.filter(task => task.completado);
    addButton.style.display = 'none';
    taskInput.style.display = 'none';
  } else {
    filteredTasks = tareas;
    addButton.style.display = 'block';
    taskInput.style.display = 'block';
  }

  generateLista(filteredTasks);
  borrarTodo.classList.toggle("desaparece", filterType !== 1);
  Todo.classList.toggle("active", filterType === 2);
  Activo.classList.toggle("active", filterType === 0);
  Completo.classList.toggle("active", filterType === 1);
}

function deleteTask(id) {
  tareas = tareas.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  generateLista();
}

const deleteTodo = document.querySelector("#borrarTodo");
deleteTodo.addEventListener("click", deleteAll);

function deleteAll() {
  tareas = tareas.filter(task => !task.completado);
  saveTasksToLocalStorage();
  generateLista();
}
