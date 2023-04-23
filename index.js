import {
  getTodaysDate,
  updateStats,
  updateTodo,
  getTodo,
  addTodo,
  getTodos,
} from "./util.js";

const date = document.getElementById("date");
date.innerText = getTodaysDate();

const incomplete = document.getElementById("incomplete");
const complete = document.getElementById("complete");

const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const itemForm = document.getElementById("item-form");

const incompleteSection = document.getElementById("incomplete-section");
const completeSection = document.getElementById("complete-section");

const itemInput = document.getElementById("item-input");
const categoryInput = document.getElementById("category-input");

const formAddEdit = document.querySelector(".form-container");

const todos = JSON.parse(localStorage.getItem("todos")) || {};
let items = todos?.items || [];

updateStatsHtml();

function openItemForm() {
  itemForm.style.display = "block";
}

function closeItemForm() {
  itemForm.style.display = "none";
  itemInput.value = "";
  categoryInput.value = "";
}

function updateStatsHtml() {
  updateStats(items);
  const todos = getTodos();
  const stats = todos.stats;
  incomplete.innerText = stats.incompleteCount;
  complete.innerText = stats.completedCount;
}


function todoCheckboxHtml(inputCheckbox) {
  inputCheckbox.addEventListener("change", (event) => {
    const todoId = event.target.parentElement.dataset.id;
    items.forEach((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
        updateStatsHtml();
        const currentTodoElement = event.target.parentElement;
        todo.completed
          ? completeSection.appendChild(currentTodoElement)
          : incompleteSection.appendChild(currentTodoElement);
      }
    });
  });
}

function openEditForm(event) {
  event.preventDefault();
  const todoItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  const id = todoItem.dataset.id;
  openItemForm();
  const editTodo = getTodo(id, items)[0];
  itemInput.value = editTodo.todo;
  categoryInput.value = editTodo.category;
  itemInput.setAttribute("data-id", id);
}

function handleDelete(event) {
  const todoItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  items.forEach((todo, i) => {
    if (todo.id === todoItem.dataset.id) {
      items.splice(i, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(items));
  updateStats(items);
  updateStatsHtml();
  todoItem.remove();
}

function renderAllTodos(items) {
  updateStats(items);
  updateStatsHtml();
  items.forEach((item) => renderTodo(item));
}

function renderTodo(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("class", "todo");
  todoDiv.setAttribute(`data-id`, todo.id);

  const inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  inputCheckbox.checked = todo.completed;
  todoCheckboxHtml(inputCheckbox);

  todoDiv.appendChild(inputCheckbox);

  const description = document.createElement("div");
  description.setAttribute("class", "description");
  const itemName = document.createElement("div");
  itemName.setAttribute("class", "item-name");
  itemName.innerHTML = `<p>${todo.todo}</p>`

  const svgEdit = document.createElement("img");
  svgEdit.setAttribute("src", "./images/edit.svg");
  svgEdit.setAttribute("class", "edit");
  svgEdit.addEventListener("click", openEditForm);

  const svgDelete = document.createElement("img");
  svgDelete.setAttribute("src", "./images/delete.svg");
  svgDelete.setAttribute("class", "delete");
  svgDelete.addEventListener("click", handleDelete);

  const divEditDelete = document.createElement("div");
  divEditDelete.setAttribute("class", "divEditDelete");
  divEditDelete.appendChild(svgEdit);
  divEditDelete.appendChild(svgDelete);
  itemName.appendChild(divEditDelete);

  const itemCategory = document.createElement("p");
  itemCategory.setAttribute("class", "category");
  itemCategory.innerText = todo.category;
  description.appendChild(itemName);
  description.appendChild(itemCategory);
  todoDiv.appendChild(description);

  todo.completed
    ? completeSection.appendChild(todoDiv)
    : incompleteSection.appendChild(todoDiv);
}

function resetTodoHtml() {
  completeSection.innerText = "";
  incompleteSection.innerText = "";
}

function handleAddEditItem(event) {
  resetTodoHtml();
  event.preventDefault();
  const todoItem = event.target;
  const itemInput = document.getElementById("item-input");
  const categoryInput = document.getElementById("category-input");
  const itemValue = itemInput.value;
  const categoryValue = categoryInput.value;
  const id = todoItem.children[2].dataset.id;
  if (id) {
    const editTodo = {
      todo: itemValue,
      category: categoryValue,
    };
    updateTodo(todos, id, editTodo);
    itemInput.removeAttribute("data-id");
  } else {
    addTodo(itemValue, categoryValue, todos);
  }
  renderAllTodos(items);
  itemInput.value = "";
  categoryInput.value = "";
  closeItemForm();
}

btnAdd.addEventListener("click", openItemForm);
btnCancel.addEventListener("click", closeItemForm);
formAddEdit.addEventListener("submit", handleAddEditItem);

document.addEventListener("DOMContentLoaded", () => {
  if (items.length > 0) {
    renderAllTodos(items);
  }
});
