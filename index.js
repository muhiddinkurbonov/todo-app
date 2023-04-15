import todos from "./todos.js";
const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const itemForm = document.getElementById("item-form");

const itemInput = document.getElementById("item-input");
const categoryInput = document.getElementById("category-input");

const incompleteSection = document.getElementById("incomplete-section");
const completeSection = document.getElementById("complete-section");

const form = document.querySelector(".form-container");

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
  createTodoHtml(itemValue, categoryValue, false);
  itemInput.value = "";
  categoryInput.value = "";
  closeItemForm();
}

function showTodos() {
  todos.forEach((item) => {
    createTodoHtml(item.todo, item.category, item.completed);
  });
  console.log(todos);
}
showTodos();
btnAdd.addEventListener("click", openItemForm);
btnCancel.addEventListener("click", closeItemForm);
form.addEventListener("submit", handleItem);
