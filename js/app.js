import saveToStorage from "./saveToStorage.js";

const form = document.querySelector('[data-form="form"]');
const input = document.querySelector('[data-input="input"]');
const ul = document.querySelector('[data-list="list"]');
const addTodo = document.querySelector('[data-add="add"]');
const removeTodo = document.querySelector('[data-remove="remove"]');

const todosInStorage = JSON.parse(localStorage.getItem("todos"));

let listToDelete = [];
let allTodoList = todosInStorage ? todosInStorage : [];

const renderTodo = (todoId, todoValue) =>
  (ul.innerHTML += `<li class='todo' data-id=${todoId}><p>${todoValue}</p><input type='checkbox' data-id=${todoId} class='input-checkbox delete' /></li>`);

const getTodosFromStorage = () =>
  todosInStorage
    ? todosInStorage.forEach(({ todoId, inputValue }) =>
        renderTodo(todoId, inputValue)
      )
    : null;

getTodosFromStorage();

const handleSubmit = (event) => {
  event.preventDefault();

  const inputValue = input.value.trim();
  const todoId = new Date().getTime();

  if (inputValue) {
    renderTodo(todoId, inputValue);
    allTodoList.push({ todoId, inputValue });
    saveToStorage(allTodoList);
  }

  form.reset();
};

const removeIcon = () => {
  addTodo.classList.add("translateY");
  removeTodo.classList.add("translateY");
  input.setAttribute("disabled", "true");
};

const addIcon = () => {
  addTodo.classList.remove("translateY");
  removeTodo.classList.remove("translateY");
  input.removeAttribute("disabled");
};

const addOrRemoveStyleinTodo = (booleanIsTodoIsChecked, element) => {
  if (booleanIsTodoIsChecked) {
    Object.assign(element, {
      className: "todo delete-todo",
    });
  } else {
    Object.assign(element, {
      className: "todo not-delete-todo",
    });
  }
};

const addOrRemoveTodo = (todo) => {
  const todoId = todo.dataset.id;
  const li = ul.querySelector(`li[data-id="${todoId}"]`);

  if (todo.checked) {
    addOrRemoveStyleinTodo(true, li);
    listToDelete.push(li);
  } else {
    addOrRemoveStyleinTodo(false, li);
    const pos = listToDelete.indexOf(li);
    listToDelete.splice(pos, 1);
  }

  listToDelete.length > 0 ? removeIcon() : addIcon();
};

const ulList = ({ target }) => {
  const deleteInput = target.classList.contains("delete");
  deleteInput ? addOrRemoveTodo(target) : null;
};

const addOrRemovePseudoElementInButton = () => {
  input.classList.toggle("d-none");

  const ifButtonNotContainsPseudoClass = !addTodo
    .querySelector("span")
    .classList.contains("pseudo");

  ifButtonNotContainsPseudoClass
    ? addTodo.querySelector("span").classList.add("pseudo")
    : addTodo.querySelector("span").classList.remove("pseudo");

  input.focus();
};

const deleteTodos = (item) => {
  const todoId = Number(item.dataset.id);

  allTodoList.forEach((todo, index) => {
    const ifTodoLocalIsExistsInStorage = todo["todoId"] === todoId;
    ifTodoLocalIsExistsInStorage ? allTodoList.splice(index, 1) : null;
  });

  saveToStorage(allTodoList);
  ul.innerHTML = "";
  getTodosFromStorage();
  addIcon();
};

const handleDeleteTodos = () => listToDelete.forEach(deleteTodos);

form.addEventListener("submit", handleSubmit);
ul.addEventListener("click", ulList);
addTodo.addEventListener("click", addOrRemovePseudoElementInButton);
removeTodo.addEventListener("click", handleDeleteTodos);
