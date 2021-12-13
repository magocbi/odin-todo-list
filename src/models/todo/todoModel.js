import Todo from './todo.js';

const todoModel = (function () {
  const todoList = [];
  let todoId = 0;

  function createTodo(
    title,
    project,
    desc = null,
    dueDate = null,
    priority = null,
    notes = null,
    complete = false
  ) {
    todoId += 1;
    const todo = Todo(
      `${todoId}`,
      title,
      desc,
      dueDate,
      priority,
      notes,
      complete
    );
    todoList.push(todo);
  }

  function removeTodo(id) {
    const index = todoList.findIndex((todo) => todo.getId() === id);
    if (index >= 0) todoList.splice(index, 1);
    return index;
  }

  function editTodo(id, data) {
    const todo = getTodo(id);
    if (todo) Object.assign(todo, data);
  }

  function getTodo(id) {
    return todoList.find((todo) => todo.getId() === id);
  }

  function getTodosFromIdList(idList) {
    return todoList.filter((todo) => idList.includes(todo.getId()));
  }

  return { createTodo, getTodo, removeTodo, editTodo, getTodosFromIdList };
})();

export default todoModel;
