let tareas = [];

const element = document.querySelector("#task");
element.addEventListener("submit", addTask);

const listaTareas = document.querySelector("#taskList");
const borrarTodo = document.querySelector("#deleteAll");

const All = document.querySelector("#All");
const Active = document.querySelector("#Active");
const Completed = document.querySelector("#Completed");

All.addEventListener("click", () => filterTasks(2));
Active.addEventListener("click", () => filterTasks(0));
Completed.addEventListener("click", () => filterTasks(1));

// Variáveis para o botão "Add" e a caixa de diálogo
const addButton = document.querySelector(".boton");
const taskInput = document.querySelector(".form-control-text-form");

function addTask(event) {
  event.preventDefault();

  const textoTarea = taskInput.value;

  if (textoTarea.trim() === "") {
    alert("¡Por favor, añade un texto para la tarea!");
    return;
  }
  const task = {
    textoTarea,
    completado: false,
    id: new Date().getTime()
  };

  tareas.push(task);
  taskInput.value = ""; // Alteração aqui para limpar o valor do input
  generateLista();
}

function generateLista(filteredTasks = tareas) {
  listaTareas.innerHTML = "";
  filteredTasks.forEach(task => listaTareas.innerHTML += createItem(task));
}

function createItem(task) {
  return `
    <li class="list-group-item eList ${task.completado ? 'marked' : ''}">
      <input class="form-check-input checkMark" type="checkbox" 
        onChange="completeTask(${task.id})" ${task.completado ? 'checked' : ''}>
      ${task.textoTarea}
      ${task.completado ? `<button class="caneca" onClick="deleteTask(${task.id})">
        <i class="fa-regular fa-trash-can"></i></button>` : ''}
    </li>
  `;
}

function completeTask(id) {
  const taskIndex = tareas.findIndex(tarea => id === tarea.id);
  tareas[taskIndex].completado = !tareas[taskIndex].completado;
  generateLista();
}

function filterTasks(filterType) {
  let filteredTasks = [];

  if (filterType === 0) {
    filteredTasks = tareas.filter(task => !task.completado);
    addButton.style.display = 'block'; // Mostrar o botão "Add"
    taskInput.style.display = 'block'; // Mostrar a caixa de diálogo
  } else if (filterType === 1) {
    filteredTasks = tareas.filter(task => task.completado);
    addButton.style.display = 'none'; // Ocultar o botão "Add"
    taskInput.style.display = 'none'; // Ocultar a caixa de diálogo
  } else {
    filteredTasks = tareas;
    addButton.style.display = 'block'; // Mostrar o botão "Add"
    taskInput.style.display = 'block'; // Mostrar a caixa de diálogo
  }

  generateLista(filteredTasks);
  borrarTodo.classList.toggle("desaparece", filterType !== 1);
  Todo.classList.toggle("active", filterType === 2);
  Activo.classList.toggle("active", filterType === 0);
  Completo.classList.toggle("active", filterType === 1);
}

function deleteTask(id) {
  tareas = tareas.filter(task => task.id !== id);
  generateLista();
}

const deleteTodo = document.querySelector("#deleteAll");
deleteTodo.addEventListener("click", deleteAll);

function deleteAll() {
  tareas = tareas.filter(task => !task.completado);
  generateLista();
}
