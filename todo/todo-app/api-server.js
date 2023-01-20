// функция создания дела
export async function saveTodoList(newTodo) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: newTodo.name,
      owner: newTodo.owner,
      done: false
    })
  });
  return await response.json();
}

// функция получения списка дел
export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

// функция изменения статуса выполнения дела
export function onDone(newTodo) {
  newTodo.done = !newTodo.done;
  fetch(`http://localhost:3000/api/todos/${newTodo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: newTodo.done }),
  });
}

// функция удаления дела
export function onDelete(newTodo) {
  fetch(`http://localhost:3000/api/todos/${newTodo.id}`, {
    method: 'DELETE',
  });
}
