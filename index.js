const btnAdd = document.getElementById("btn-add");
const btnCancel = document.getElementById("btn-cancel");
const itemForm = document.getElementById("item-form");

let incompleteSection = document.getElementById("incomplete-section");
let completeSection = document.getElementById("complete-section");

const form = document.querySelector(".form-container");
const btnDelete = document.querySelector(".delete");

let todosArray = JSON.parse(localStorage.getItem("todos")) || [];

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
  });
}
function handleDelete(event) {
  const todoItem = event.target.parentElement.parentElement.parentElement;
  todosArray.forEach((todo, i) => {
    if (todo.id === +todoItem.dataset.id) {
      todosArray.splice(i, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todosArray));
  todoItem.remove();
}
function todoNameAndCategoryHtml(todo, todoItem) {
  const description = document.createElement("div");
  description.setAttribute("class", "description");
  const itemName = document.createElement("p");
  itemName.setAttribute("class", "item-name");
  itemName.innerText = todo.todo;

  const svg = document.createElement("img");
  svg.setAttribute("src", "./images/trash.svg");
  svg.setAttribute("class", "delete");
  itemName.appendChild(svg);
  svg.addEventListener("click", handleDelete);

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
  console.log(todosArray);
  createTodoHtml(newTodo);
  itemInput.value = "";
  categoryInput.value = "";
  closeItemForm();
}

function clearTodos() {
  incompleteSection.children[1]?.remove();
  completeSection.children[1]?.remove();
}

btnAdd.addEventListener("click", openItemForm);
btnCancel.addEventListener("click", closeItemForm);
form.addEventListener("submit", handleItem);

todosArray.forEach((todo) => {
  createTodoHtml(todo);
});
