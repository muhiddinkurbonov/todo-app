const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const itemForm = document.getElementById("item-form");

const itemInput = document.getElementById("item-input");
const categoryInput = document.getElementById("category-input");

const btnSubmit = document.getElementById("btn-submit");

const incompleteSection = document.getElementById("incomplete-section");

const form = document.querySelector(".form-container");

function openItemForm() {
  itemForm.style.display = "block";
}

function closeItemForm() {
  itemForm.style.display = "none";
}

function createTodoHtml(item, cat) {
  const todo = document.createElement("div");
  todo.setAttribute("class", "todo");

  const inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  todo.appendChild(inputCheckbox);

  const description = document.createElement("div");
  description.setAttribute("class", "description");
  const itemName = document.createElement("p");
  itemName.setAttribute("class", "item-name");
  itemName.innerText = item;
  const itemCategory = document.createElement("p");
  itemCategory.setAttribute("class", "category");
  itemCategory.innerText = cat;
  description.appendChild(itemName);
  description.appendChild(itemCategory);
  todo.appendChild(description);
  incompleteSection.appendChild(todo);
}

function handleItem(event) {
  event.preventDefault();
  const itemValue = itemInput.value;
  const categoryValue = categoryInput.value;
  createTodoHtml(itemValue, categoryValue);
  itemInput.value = "";
  categoryInput.value = "";
  closeItemForm();
}

btnAdd.addEventListener("click", openItemForm);
btnCancel.addEventListener("click", closeItemForm);
form.addEventListener("submit", handleItem);
