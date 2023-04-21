export function getTodaysDate() {
  const date = new Date(Date.now()).toDateString();
  return date;
}
export function updateStats(todos) {
  let completedCount = 0;
  todos.forEach((todo) => {
    if (todo.completed) {
      completedCount++;
    }
  });
  const total = todos.length;
  const incompleteCount = total - completedCount;
  const stats = { total, completedCount, incompleteCount };
  localStorage.setItem("stats", JSON.stringify(stats));
}

