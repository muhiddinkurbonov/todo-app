

const btnAdd = document.getElementById('btn-add');
const btnCancel = document.getElementById('btn-cancel')
const itemForm = document.getElementById("item-form");

function openItemForm() {
  itemForm.style.display = "block";
}

function closeItemForm() {
  itemForm.style.display = "none";
}

btnAdd.addEventListener('click', openItemForm);
btnCancel.addEventListener("click", closeItemForm);
