const saveToStorage = (todos) =>
  todos ? localStorage.setItem("todos", JSON.stringify(todos)) : null;

export default saveToStorage;
