import Todo from './todo.js';
import eventAggregator from '../../eventAggregator.js';

const todoModel = (function () {
  const todoList = [];
  let filteredList = [];
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
    eventAggregator.publish('todoCreated', { project, todo: todo.getId() });
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

  function filterList(name, idList) {
    filteredList = getTodosFromIdList(idList);
    eventAggregator.publish('todosSelected', { name, filteredList });
  }

  return {
    createTodo,
    getTodo,
    removeTodo,
    editTodo,
    getTodosFromIdList,
    filterList,
  };
})();

export default todoModel;
