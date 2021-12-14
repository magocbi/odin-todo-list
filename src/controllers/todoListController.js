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

  function initialize() {
    eventAggregator.subscribe('selectTodos', onSelectTodos);
    eventAggregator.subscribe('createTodo', onTodoCreation);
    eventAggregator.subscribe('toggleCompletion', onToggleCompletion);
  }

  return { initialize };
})();

export default todoListController;
