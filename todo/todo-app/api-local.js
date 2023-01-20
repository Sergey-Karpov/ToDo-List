// сохранение списка дел в localStorage
export function saveTodoList(newTodo) {
  if(JSON.parse(localStorage.getItem(newTodo.owner))) {
    let todoListFilled = JSON.parse(localStorage.getItem(newTodo.owner))
    newTodo.id = getNewID(todoListFilled)
    todoListFilled.push(newTodo)
    localStorage.setItem(newTodo.owner, JSON.stringify(todoListFilled))
  } else {
    let todoListFilled = []
    newTodo.id = 0
    todoListFilled.push(newTodo)
    localStorage.setItem(newTodo.owner, JSON.stringify(todoListFilled))
  }
}

export function getTodoList(owner) {
  return JSON.parse(localStorage.getItem(owner))
}

export function onDone(newTodo) {
  let todoListFilled = JSON.parse(localStorage.getItem(newTodo.owner))
  for (const todo of todoListFilled) {
    if (todo.id == newTodo.id) {
      todo.done = !todo.done
    }
  }
  localStorage.setItem(newTodo.owner, JSON.stringify(todoListFilled))
}

export function onDelete(newTodo) {
  let todoListFilled = JSON.parse(localStorage.getItem(newTodo.owner))
  for (const todo of todoListFilled) {
    if (todo.id == newTodo.id) {
      todoListFilled.splice(todoListFilled.indexOf(todo), 1)
    }
  }
  localStorage.setItem(newTodo.owner, JSON.stringify(todoListFilled))
}

// функция создания уникального id
function getNewID(arr) {
  let id = 0
  for (const item of arr) {
    if(item.id > id) {
      id = item.id
    }
  }
  return id  + 1
}
