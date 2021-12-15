import Todo from './todo.js';
import eventAggregator from '../../eventAggregator.js';
import {
  getTodoID,
  getTodoList,
  saveTodoID,
  saveTodoList,
} from '../../storage.js';

const todoModel = (function () {
  let todoList = [];
  let filteredList = [];
  let todoId = 0;

  function getStoredTodos() {
    const todos = getTodoList();
    if (todos) {
      for (let {
        id,
        title,
        desc,
        dueDate,
        priority,
        notes,
        complete,
      } of todos) {
        const todo = Todo(
          `${id}`,
          title,
          desc,
          dueDate,
          priority,
          notes,
          complete
        );
        todoList.push(todo);
      }
    }
  }

  function getStoredId() {
    const id = getTodoID();
    if (id) todoId = id;
  }

  function storeTodoList() {
    saveTodoList(todoList.map((todo) => ({ id: todo.getId(), ...todo })));
  }

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
    storeTodoList();
    saveTodoID(todoId);
  }

  function removeTodo(id) {
    const index = todoList.findIndex((todo) => todo.getId() === id);
    if (index >= 0) {
      todoList.splice(index, 1);
      eventAggregator.publish('todoDeleted', id);
      storeTodoList();
    }
    return index;
  }

  function editTodo(id, data) {
    const todo = getTodo(id);
    if (todo) {
      Object.assign(todo, data);
      eventAggregator.publish('todoEdited', { id, ...todo });
      storeTodoList();
    }
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

  function toggleCompletion(id) {
    const todo = getTodo(id);
    todo.complete = !todo.complete;
    storeTodoList();
  }

  function initialize() {
    getStoredTodos();
    getStoredId();
  }

  return {
    createTodo,
    getTodo,
    removeTodo,
    editTodo,
    getTodosFromIdList,
    filterList,
    toggleCompletion,
    initialize,
  };
})();

export default todoModel;
