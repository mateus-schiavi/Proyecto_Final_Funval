let tareas = [];

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

function addTask(event) {
  event.preventDefault();

  const textoTarea = document.querySelector("#textTask").value;

  const task = {
    textoTarea,
    completado: false,
    id: new Date().getTime()
  };

  tareas.push(task);
  document.getElementById('tarea').reset();
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
  } else if (filterType === 1) {
    filteredTasks = tareas.filter(task => task.completado);
  } else {
    filteredTasks = tareas;
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

const deleteTodo = document.querySelector("#borrarTodo");
deleteTodo.addEventListener("click", deleteAll);

function deleteAll() {
  tareas = tareas.filter(task => !task.completado);
  generateLista();
}
