import { ToDo } from './todo.js';

let todos = [
  new ToDo('Zugticket kaufen', false),
  new ToDo('Wäsche waschen', true),
  new ToDo('Hausaufgaben machen', true),
];

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById('todolist');

  todoListElement.innerHTML = '';

  for (const todo of todos) {
    const toDoListEntry = todo.element();
    todoListElement.appendChild(toDoListEntry);
  }

  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById('anzahl');
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;
}

document.addEventListener('DOMContentLoaded', (event) => {
  updateToDoListOnScreen();
  
  const aufraeumenButton = document.getElementById("aufraeumen"); 
  aufraeumenButton.addEventListener("click", (event) => {
    todos = todos.filter(t => !t.erledigt)
    updateToDoListOnScreen();
    
  });

  const neuesToDoElement = document.getElementById('neuesToDo');
  neuesToDoElement.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      const todo = new ToDo(neuesToDoElement.value, false);
      todos.push(todo);

      neuesToDoElement.value = '';

      todo.addEventListener('loeschen', (e) => {
        const index = todos.indexOf(e.target);
        todos.splice(index, 1);
        updateToDoListOnScreen();
      });

      updateToDoListOnScreen();
    }
  });
});
