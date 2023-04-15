// import todos from "./todos.js";
// const original = todos;
const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const itemForm = document.getElementById("item-form");

const itemInput = document.getElementById("item-input");
const categoryInput = document.getElementById("category-input");

const incompleteSection = document.getElementById("incomplete-section");
const completeSection = document.getElementById("complete-section");

const form = document.querySelector(".form-container");

let todosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

function openItemForm() {
  itemForm.style.display = "block";
}

function closeItemForm() {
  itemForm.style.display = "none";
}

function createTodoHtml(item, category, completed) {
  const todo = document.createElement("div");
  todo.setAttribute("class", "todo");

  const inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  completed ? inputCheckbox.setAttribute("checked", true) : "";

  todo.appendChild(inputCheckbox);

  const description = document.createElement("div");
  description.setAttribute("class", "description");
  const itemName = document.createElement("p");
  itemName.setAttribute("class", "item-name");
  itemName.innerText = item;
  const itemCategory = document.createElement("p");
  itemCategory.setAttribute("class", "category");
  itemCategory.innerText = category;

  description.appendChild(itemName);
  description.appendChild(itemCategory);
  todo.appendChild(description);

  completed
    ? completeSection.appendChild(todo)
    : incompleteSection.appendChild(todo);
}

function handleItem(event) {
  event.preventDefault();
  const itemValue = itemInput.value;
  const categoryValue = categoryInput.value;
  const newTodoId = todosArray.length + 1;
  const newTodo = {
    id: newTodoId,
    todo: itemValue,
    category: categoryValue,
    completed: false,
  };
  todosArray.push(newTodo);
  console.log(todosArray)
  localStorage.setItem('todos', JSON.stringify(todosArray))
  createTodoHtml(itemValue, categoryValue, false);
  itemInput.value = "";
  categoryInput.value = "";
  closeItemForm();
}

function showTodos() {
    todosArray.forEach((item) => {
      createTodoHtml(item.todo, item.category, item.completed);
    });
}
showTodos();
btnAdd.addEventListener("click", openItemForm);
btnCancel.addEventListener("click", closeItemForm);
form.addEventListener("submit", handleItem);
