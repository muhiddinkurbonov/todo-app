export function getTodaysDate() {
  const date = new Date(Date.now()).toDateString();
  return date;
}
export function updateStats(items) {
  let completedCount = 0;
  items.forEach((item) => {
    if (item.completed) {
      completedCount++;
    }
  });
  const total = items.length;
  const incompleteCount = total - completedCount;
  const newStats = { total, completedCount, incompleteCount };
  const newTodos = {
    items,
    stats: newStats
  };
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

export function updateTodo(todos, id, newItem) {
  todos.items.forEach((item) => {
    if (item.id === id) {
      item.todo = newItem.todo;
      item.category = newItem.category;
      return;
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

export function addTodo(todo, category, todos) {
      const newItemId = self.crypto.randomUUID();
      const newItem = {
        id: newItemId,
        todo,
        category,
        completed: false,
      };
      todos.items.push(newItem);
      todos.stats.incompleteCount++;
      todos.stats.total++;
      localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodo(id, items) {
  return items.filter((item) => {
    if (item.id === id) return item;
  });
}

export function getTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || {};
    return todos;
}

