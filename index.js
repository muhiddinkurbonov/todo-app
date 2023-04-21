import { getTodaysDate, updateStats } from "./util.js";

const date = document.getElementById("date");
date.innerText = getTodaysDate();

const incomplete = document.getElementById("incomplete");
const complete = document.getElementById("complete");

const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const itemForm = document.getElementById("item-form");

let incompleteSection = document.getElementById("incomplete-section");
let completeSection = document.getElementById("complete-section");

const form = document.querySelector(".form-container");
const btnDelete = document.querySelector(".delete");

let todosArray = JSON.parse(localStorage.getItem("todos")) || [];
updateStats(todosArray);
updateStatsHtml();

function openItemForm() {
  itemForm.style.display = "block";
}

function closeItemForm() {
  itemForm.style.display = "none";
}

function createTodoHtml(todo) {
  const todoItem = document.createElement("div");
  todoItem.setAttribute("class", "todo");
  todoItem.setAttribute(`data-id`, todo.id);

  const inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  inputCheckbox.checked = todo.completed;
  todoCheckboxHtml(inputCheckbox);

  todoItem.appendChild(inputCheckbox);

  todoNameAndCategoryHtml(todo, todoItem);
}

function updateStatsHtml() {
  const {
    total = 0,
    incompleteCount = 0,
    completedCount = 0,
  } = JSON.parse(localStorage.getItem("stats") || {});
  console.log(incompleteCount);
  incomplete.innerText = incompleteCount;
  complete.innerText = completedCount;
}

function todoCheckboxHtml(inputCheckbox) {
  // Add event listener to the checkbox
  inputCheckbox.addEventListener("change", (event) => {
    const todoId = event.target.parentElement.dataset.id;
    console.log(todosArray);
    todosArray.forEach((todo, i) => {
      if (todo.id === +todoId) {
        todo.completed = !todo.completed;
        event.target.parentElement.remove();
        todo.completed
          ? completeSection.appendChild(event.target.parentElement)
          : incompleteSection.appendChild(event.target.parentElement);
      }
    });
    localStorage.setItem("todos", JSON.stringify(todosArray));
    updateStats(todosArray);
    updateStatsHtml();
  });
}

function handleEdit(event) {
}

function handleDelete(event) {
  console.log(event.target);
  const todoItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  todosArray.forEach((todo, i) => {
    if (todo.id === +todoItem.dataset.id) {
      todosArray.splice(i, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todosArray));
  updateStats(todosArray);
  updateStatsHtml();
  todoItem.remove();
}
function todoNameAndCategoryHtml(todo, todoItem) {
  const description = document.createElement("div");
  description.setAttribute("class", "description");
  const itemName = document.createElement("p");
  itemName.setAttribute("class", "item-name");
  itemName.innerText = todo.todo;

  const svgEdit = document.createElement("img");
  svgEdit.setAttribute("src", "./images/edit.svg");
  svgEdit.setAttribute("class", "edit");
  svgEdit.addEventListener("click", handleEdit);

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
  todoItem.appendChild(description);

  todo.completed
    ? completeSection.appendChild(todoItem)
    : incompleteSection.appendChild(todoItem);
}

function handleItem(event) {
  event.preventDefault();
  const itemInput = document.getElementById("item-input");
  const categoryInput = document.getElementById("category-input");
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
  localStorage.setItem("todos", JSON.stringify(todosArray));
  updateStats(todosArray);
  updateStatsHtml();
  createTodoHtml(newTodo);
  itemInput.value = "";
  categoryInput.value = "";
  closeItemForm();
}

btnAdd.addEventListener("click", openItemForm);
btnCancel.addEventListener("click", closeItemForm);
form.addEventListener("submit", handleItem);

todosArray.forEach((todo) => {
  createTodoHtml(todo);
});
