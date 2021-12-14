import eventAggregator from '../eventAggregator';
import Todo from '../models/todo/todo';
import todoModel from '../models/todo/todoModel';

const todoListController = (function () {
  const todoList = [];
  function onSelectTodos({ todoIdList, name }) {
    todoModel.filterList(name, todoIdList);
  }

  function onTodoCreation({ title, desc, date, project }) {
    todoModel.createTodo(title, project, desc, date);
  }

  function onToggleCompletion(id) {
    todoModel.toggleCompletion(id);
  }

  function onDeleteTodo(id) {
    todoModel.removeTodo(id);
  }

  function onRequestTodoData(id) {
    const todo = todoModel.getTodo(id);
    if (todo) eventAggregator.publish('todoDataSent', todo);
  }

  function onTodoEdit({ id, title, desc, date: dueDate }) {
    todoModel.editTodo(id, { title, desc, dueDate });
  }

  function initialize() {
    eventAggregator.subscribe('selectTodos', onSelectTodos);
    eventAggregator.subscribe('createTodo', onTodoCreation);
    eventAggregator.subscribe('toggleCompletion', onToggleCompletion);
    eventAggregator.subscribe('deleteTodo', onDeleteTodo);
    eventAggregator.subscribe('requestTodoData', onRequestTodoData);
    eventAggregator.subscribe('editTodo', onTodoEdit);
  }

  return { initialize };
})();

export default todoListController;
