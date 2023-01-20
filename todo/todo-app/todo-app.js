// import { saveTodoList, getTodoList, onDone, onDelete } from "./api-local.js"
// import { saveTodoList, getTodoList, onDone, onDelete } from "./api-server.js"

// функция создания элемента заголовка списка дел
function createTodoTitle(title) {
  const todoTitle = document.createElement('h3')
  todoTitle.innerHTML = title
  return todoTitle
}

// функция создания элемента формы создания списка дел
function createTodoForm() {
  const form = document.createElement('form')
  const input = document.createElement('input')
  const btnWrapper = document.createElement('div')
  const btn = document.createElement('button')

  form.classList.add('input-group', 'mb-3')
  input.classList.add('form-control')
  input.placeholder = 'Введите название нового дела'
  btnWrapper.classList.add('input-group-append')
  btn.classList.add('btn', 'btn-outline-secondary')
  btn.disabled = true
  btn.textContent = 'Добавить дело'

  btnWrapper.append(btn)
  form.append(input)
  form.append(btnWrapper)

  input.addEventListener('input', () => {
    input.value ? btn.disabled = false : btn.disabled = true
  })

  return {
    form,
    input,
    btn,
  }
}

// функция создания элемента списка дел
function createTodoList() {
  let list = document.createElement('ul')
  list.classList.add('list-group')
  return list
}

// функция создания элемента дела
function createTodoItem(newTodo, { onDone, onDelete }) {
  let item = document.createElement('li')
  let btnGroup = document.createElement('div')
  let doneBtn = document.createElement('button')
  let deleteBtn = document.createElement('button')

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center')
  // console.log(newTodo)
  item.textContent = newTodo.name

  btnGroup.classList.add('btn-group', 'btn-group-sm')
  doneBtn.classList.add('btn', 'btn-outline-success')
  deleteBtn.classList.add('btn', 'btn-outline-danger')
  doneBtn.textContent = 'Готово'
  deleteBtn.textContent = 'Удалить'

  if(newTodo.done) {
    item.classList.add('list-group-item-success')
  }

  // измененние статуса дела
  doneBtn.addEventListener('click', () => {
    item.classList.toggle('list-group-item-success')
    onDone(newTodo)
  })

  // удаление дела
  deleteBtn.addEventListener('click', () => {
    if(confirm('Are you sure?')) {
      item.remove()
      onDelete(newTodo)
    }
  })

  btnGroup.append(doneBtn)
  btnGroup.append(deleteBtn)
  item.append(btnGroup)

  return {
    item,
    doneBtn,
    deleteBtn
  }
}

// функция управления приложением
export async function createTodoApp(todoContainer, {
  owner,
  getTodoList,
  saveTodoList,
  onDone,
  onDelete
  }) {
  let todoAppTitle = createTodoTitle(owner)
  let todoAppForm = createTodoForm()
  let todoList = createTodoList()
  const handlers = { onDone, onDelete }

  todoContainer.append(todoAppTitle)
  todoContainer.append(todoAppForm.form)
  todoContainer.append(todoList)

  // получение сохраненного списка дел и их отрисовка
  if(getTodoList(owner)) {
    let todoListFilled = await getTodoList(owner)
    for (const todoItem of todoListFilled) {
      todoList.append((createTodoItem(todoItem, handlers)).item)
    }
  }

  todoAppForm.form.addEventListener('submit', async function(e) {
    e.preventDefault()

    if(!todoAppForm.input.value) {
      return
    }

    // обьект нового дела
    let newTodo = {
      owner: owner,
      name: todoAppForm.input.value.trim(),
      done: false,
    }

    let todoItem = createTodoItem(newTodo, handlers)

    await saveTodoList(newTodo)

    todoList.append(todoItem.item)

    todoAppForm.btn.disabled = true
    todoAppForm.input.value = ''
  })
}

// createTodoApp(todoContainer)

// localStorage.clear()
